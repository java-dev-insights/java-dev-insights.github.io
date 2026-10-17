# STAR 15

## Story 2 — Automating Negative Balance Notifications (Scheduler Service Ownership)
**Primary ALP:** Ownership | **Secondary:** Bias for Action, Deliver Results

### Situation
Vonage's Finance team was manually identifying ~190,000 prepaid accounts with negative balances and sending reminder emails by hand. This was error-prone, time-consuming, and not scalable. There was no automated system, no audit trail, and no escalation path — accounts could remain negative indefinitely without action.

### Task
I took end-to-end ownership of designing and delivering an automated scheduler job to replace this manual process entirely (TICKET-15822). This was part of my 2025 objective to become the team's subject-matter expert on the Scheduler service.

### Action
* Wrote the discovery document and Confluence page ("Negative Balance Jobs — Details") defining the job logic, DB queries, and notification schedule.
* Implemented `prepaidAccountsIdentificationJob` in the Scheduler service (Java/Spring), querying `d_account_billing` and `d_topup_transaction` to identify accounts with balance < 0.
* Configured the job to run on the 10th, 18th, and 25th of each month, with three escalating reminder emails sent to the primary user, manager, and finance contact.
* Added logic to skip accounts where `negative_balance_notification = false` and to suspend accounts after three unanswered reminders.
* Raised GitHub PR #4139 with full unit test coverage; fixed a production page-size issue in the quota call post-deployment (TICKET-16211).
* Created documentation and Grafana alerts for the new job.

### Result
* Fully automated a process that previously required manual Finance intervention for ~190K accounts.
* The job ran successfully in production on its first scheduled execution with no incidents.
* Finance team reported significant time savings; the process now has a full audit trail.
* I became the team's go-to person for Scheduler service questions, fulfilling my 2025 ownership objective.

### Learning
Owning a service end-to-end — from DB query design to deployment monitoring — gave me a much deeper appreciation for operational readiness. I learned to think beyond "does the code work?" to "what happens at 3 AM when this runs on 190K rows?"

---

## Story 3 — KYC on Payment Failure: Replacing a Manual Support Process
**Primary ALP:** Customer Obsession | **Secondary:** Invent & Simplify, Deliver Results

### Situation
When a customer's payment was blocked by Sift's fraud engine, the only recourse was to open a Zendesk support ticket manually and submit KYC (Know Your Customer) documents by email. This was a frustrating, opaque experience for customers and created a backlog for the support team. There was no self-service path.

### Task
Design and implement a KYC form directly within the Customer Dashboard's payment summary screen, allowing customers to submit KYC details inline — automatically creating a Zendesk ticket in the background (TICKET-15778).

### Action
* Analysed the existing Zendesk integration and the payment failure flow to identify the correct injection point for the KYC form.
* Implemented backend changes to accept KYC form submissions and programmatically create Zendesk tickets with the correct metadata (TICKET-15778).
* Built the frontend KYC form on the payment summary screen, including field validation and a clear post-submission confirmation state (TICKET-15757).
* Added a feature flag to control rollout; later removed the flag once the feature was stable in production (TICKET-15944).
* Coordinated with the Support team to validate the Zendesk ticket format and ensure agents could action them efficiently.

### Result
* Customers can now self-serve their KYC submission without contacting support directly.
* Support ticket creation time reduced from days (manual) to seconds (automated).
* The feature was delivered across three incremental tickets, demonstrating disciplined iterative delivery.
* Positive feedback from the Support team on ticket quality and completeness.

### Learning
I learned that the best customer experience improvements often come from removing friction in failure paths, not just optimising happy paths. Instrumenting the feature with a feature flag also taught me the value of controlled rollouts for payment-adjacent features.

---

## Story 4 — Resolving the CD Signup Race Condition
**Primary ALP:** Dive Deep | **Secondary:** Are Right A Lot, Problem Solving

### Situation
Vonage's Customer Dashboard signup flow involved multiple asynchronous services: the dashboard frontend, user-service, PHub (pricing hub), BSS vAccounts, and a provisioning service. Intermittently, newly signed-up users would land in a broken state — unable to buy numbers or access features — because downstream services hadn't finished processing when the dashboard assumed they had. This was a race condition that was hard to reproduce and had been open for some time (TICKET-14496).

### Task
Investigate the root cause of the race condition across multiple services, propose a fix, and implement it without disrupting the live signup flow.

### Action
* Traced the full signup event sequence across Kafka topics and service logs, mapping the exact timing dependencies between user-service, PHub, and BSS vAccounts.
* Identified that the dashboard was reading account state before PHub had finished writing the pricing group, causing the "upgrade required" state to persist incorrectly.
* Implemented a fix in the BSS vAccounts service (TICKET-14281) and the provisioning service (TICKET-14498) to introduce proper event ordering and retry logic.
* Added detailed logging at each step of the signup flow to make future race conditions diagnosable from Kibana without needing to reproduce locally.

### Result
* The race condition was eliminated; no recurrence reported after the fix was deployed to production.
* The added logging reduced mean-time-to-diagnose for signup issues from hours to minutes.
* The fix was delivered as a coordinated multi-service change, requiring careful sequencing of deployments.

### Learning
Distributed systems race conditions are rarely obvious from a single service's logs. I learned to treat the event timeline as the primary debugging artefact and to always add observability as part of the fix, not as a follow-up.

---

## Story 5 — Migrating the Scheduler Service to AWS (Atmos)
**Primary ALP:** Bias for Action | **Secondary:** Deliver Results, Ownership

### Situation
The Scheduler service — responsible for critical background jobs (fraud score upgrades, balance checks, email notifications) — was running on Softlayer (legacy on-premise infrastructure). Vonage had a strategic initiative to migrate all services to AWS (Atmos). The Scheduler was a high-risk migration target because it ran time-sensitive cron jobs and any downtime would directly impact customers and Finance operations (EPIC EPIC-268).

### Task
Lead the end-to-end migration of the Scheduler service from Softlayer to AWS Atmos, including deployment, testing, monitoring, and deprecation of the old environment.

### Action
* Deployed Scheduler to `atmos-dev` (TICKET-8239) and ran full regression tests with all cron jobs disabled to validate the environment.
* Updated smoke tests to target atmos-dev (TICKET-8467) and validated all job configurations.
* Deployed to Atmos production with tasks disabled first (TICKET-8459), monitored for 48 hours, then enabled all tasks (TICKET-8810).
* Set up Grafana monitoring and OpsGenie alerts for the Atmos production instance (TICKET-8770).
* Coordinated with the Admin Dashboard team (a dependent consumer) to align on the migration date.
* Deprecated the Softlayer QA instance (TICKET-8464) and performed post-migration cleanup (TICKET-8847).
* Documented the full migration in Confluence: "[DONE] AWS Migration — Scheduler".

### Result
* Scheduler successfully migrated to AWS with zero job failures during or after migration.
* All cron jobs ran on schedule from day one in production.
* The Softlayer instance was cleanly decommissioned, reducing infrastructure costs.
* The migration playbook I created was reused by other teams for similar migrations.

### Learning
I learned that the key to a safe infrastructure migration is the "deploy disabled, then enable" pattern — it gives you a production-validated environment before any real workload runs. I also learned the importance of communicating migration timelines to dependent teams early.

---

## Story 6 — Kafka Topic Migration to Hermes Cluster (AWS)
**Primary ALP:** Think Big | **Secondary:** Deliver Results, Ownership

### Situation
The Customer Dashboard was consuming Kafka topics from the legacy Kiwi cluster (Softlayer). As part of Vonage's cloud-first strategy, all Kafka topics needed to migrate to the Hermes cluster on AWS (EPIC EPIC-983). This affected six critical topics: `service_dashboard-email`, `service_dashboard-fraud`, `service_dashboard-marketing_user`, `service_dashboard-zoho-invoices`, `service_dashboard-ncco_user`, and `service_dashboard-ws_notifications`.

### Task
Migrate all six Kafka consumer groups from Kiwi to Hermes without message loss or consumer lag, and clean up the legacy cluster configuration.

### Action
* Updated Kafka broker configurations for all six topics to point to the Hermes cluster (TICKET-13682).
* Coordinated the stop of vBilling listeners on the Kiwi cluster (TICKET-13773) and their removal (TICKET-13772) in a sequenced, zero-downtime manner.
* Fixed false-positive Kafka lag alerts in the SRE alerting system that were firing for the `dashboard-vaccounts-sync` group ID during the transition (TICKET-12037, GitHub PR #3144 in `sre-alerting`).
* Created a `DeleteStaleKafkaGroupIds` Jenkins pipeline (TICKET-11968) and a `groupId purger` script for production (TICKET-12027) to clean up stale consumer group IDs left over from the migration.
* Updated Grafana dashboards to reflect the new cluster topology.

### Result
* All six Kafka topics migrated to Hermes with no message loss and no consumer lag incidents.
* False-positive alerts eliminated, reducing on-call noise.
* The stale group ID cleanup pipeline became a reusable operational tool for the team.
* Kiwi cluster dependencies fully removed, enabling its eventual decommission.

### Learning
Kafka migrations require treating consumer group IDs as first-class infrastructure artefacts. I learned that stale group IDs are a silent operational hazard — they trigger lag alerts and confuse monitoring — and that building cleanup tooling as part of the migration (not after) is essential.

---

## Story 7 — Removing Hardcoded Credentials & Security Remediation
**Primary ALP:** Earn Trust | **Secondary:** Are Right A Lot, Dive Deep

### Situation
A secret security scan identified **15 places** in the Customer Dashboard GitHub repository where credentials (API keys, passwords, tokens) were hardcoded in source code (TICKET-13735). This was a critical security vulnerability — any developer with repository access, or any attacker who gained access, could extract live credentials. The issue was flagged as a VRR (Vulnerability Risk Rating) finding.

### Task
Remediate all 15 credential leaks: remove secrets from the codebase, migrate them to AWS Secrets Manager, and clean the Git history to ensure the credentials were not recoverable from past commits.

### Action
* Audited all 15 GitHub issues raised by the security scan, categorising them by severity and service.
* Replaced hardcoded credentials with references to AWS Secrets Manager across the dashboard and related services (TICKET-13852 — Part 1).
* Rewrote Git history to remove the credentials from all historical commits (TICKET-13944 — Fix History Part 1), using `git filter-branch` / BFG Repo Cleaner.
* Resolved a reopened GitHub security issue that persisted after the initial fix (TICKET-14078).
* Verified all VRR findings were closed and confirmed with the security team.
* Also fixed a separate XSS vulnerability in the `devapi` JSONP endpoint callback parameter (TICKET-13666), implementing proper input validation to prevent reflected XSS and Account Takeover (ATO) attacks (TICKET-13621, TICKET-11309).

### Result
* All 15 credential leaks remediated and VRR findings closed.
* Git history cleaned — credentials no longer recoverable from repository history.
* XSS vulnerability in the pricing JSONP endpoint patched, closing a bug-bounty-reported Account Takeover vector.
* Security posture of the dashboard codebase significantly improved.

### Learning
Security debt compounds silently. I learned that hardcoded credentials are often a symptom of missing secrets-management infrastructure, not just developer carelessness. Fixing the symptom (removing the secret) without fixing the root cause (no secrets manager integration) just delays the next incident.

---

## Story 8 — Deutsche Telekom SSO Integration
**Primary ALP:** Customer Obsession | **Secondary:** Earn Trust, Deliver Results

### Situation
Deutsche Telekom (DT), a major Vonage CSP (Communications Service Provider) partner, was migrating their users to their own Identity Provider (IDP) using SSO. Once migrated, DT would manage the full user lifecycle — meaning Vonage's Customer Dashboard needed to stop allowing DT users to edit their profile and addresses directly, and instead redirect them to DT's IDP portal (EPIC EPIC-1347).

### Task
Implement SSO integration changes for DT across multiple tickets: hide/redirect My Profile and My Addresses for DT users, handle user invite email redirects, fix 2FA phone numbers on CSP DT accounts, and ensure the domain name change was handled cleanly.

### Action
* Implemented UI changes to hide the My Addresses and My Profile edit links for DT SSO users, replacing them with redirects to `https://auth.api.telekom.com/realms/dtmaceretail/account` (TICKET-16458, TICKET-16487).
* Updated the user invite email flow to redirect DT users to the DT IDP instead of the Vonage password reset flow (TICKET-16483).
* Fixed 2FA phone numbers on specific CSP DT accounts that had incorrect data (TICKET-16493).
* Handled the account rename/delete flow for SSO re-use cases where a user needed to log in with a specific email already associated with a different API key (TICKET-13960).
* Enabled the My Profile password change page specifically for DT users (TICKET-12909).
* Coordinated directly with the DT technical team to validate redirect URLs and confirm the migration timeline.

### Result
* DT SSO integration delivered on schedule, enabling DT to manage their user lifecycle independently.
* Zero reported login failures post-migration for DT users.
* The clean separation of DT-specific UI behaviour from the standard dashboard reduced future maintenance complexity.

### Learning
Enterprise partner integrations require treating the partner's technical constraints as requirements, not obstacles. I learned to build in explicit coordination checkpoints with external teams and to always validate redirect URLs in a staging environment before production.
