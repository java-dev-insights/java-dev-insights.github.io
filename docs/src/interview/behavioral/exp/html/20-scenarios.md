# STAR 20

## Story 5 — AWS Migration: Scheduler & Customer Dashboard to Atmos Production
**Amazon Leadership Principles:** Think Big · Deliver Results · Bias for Action

### Situation
Vonage's Scheduler service and Customer Dashboard were running on legacy Softlayer (SL) infrastructure. The company had committed to a full AWS migration (Atmos platform). The Scheduler ran critical financial jobs (auto-fraud score upgrades, balance checks, pricing notifications) — any migration failure would directly impact revenue and customer billing.

### Task
Lead the end-to-end migration of the Scheduler (EPIC-268 Epic) and Customer Dashboard (EPIC-200 Epic) to AWS Atmos production, including deployment, smoke testing, monitoring setup, and legacy deprecation.

### Action
* **Scheduler Migration (EPIC-268):** Deployed Scheduler to Atmos-dev (TICKET-8239), ran smoke tests with disabled crons (TICKET-8460), deployed to Atmos production with tasks disabled (TICKET-8459), enabled tasks in production (TICKET-8810), set up monitoring and alerts (TICKET-8770), updated smoke tests for Atmos prod (TICKET-8467), deprecated Scheduler in Softlayer QA (TICKET-8464), and completed post-migration cleanup (TICKET-8847).
* **Customer Dashboard Migration (EPIC-200):** Deployed CD to atmos-dev (TICKET-9017), updated PHub URL for atmos-dev (TICKET-9433), ran CD regression tests (TICKET-9193), moved 100% QA traffic to atmos-dev (TICKET-9493), switched off Kafka for SL (TICKET-9547), deprecated CD in Softlayer QA (TICKET-9194).
* Set up Grafana monitoring and OpsGenie alerts for both services in Atmos prod.
* Documented migration steps in Confluence: "[DONE] AWS Migration - Scheduler".

### Result
* Both Scheduler and Customer Dashboard successfully migrated to AWS Atmos production.
* Legacy Softlayer infrastructure decommissioned, reducing infrastructure costs.
* Monitoring and alerting established from day one in the new environment.

### Learning
Learned the value of a phased migration approach: dev → QA → prod with disabled tasks → prod with enabled tasks. Each phase is a checkpoint that reduces risk. Also learned that migration is never "done" until the legacy environment is fully decommissioned and cleaned up.

### Deeper Dive (Technical Evidence)
* **JIRA Epics:** EPIC-268 (Scheduler to AWS), EPIC-200 (CD to AWS)
* **JIRA sub-tasks:** TICKET-8239, 8459, 8460, 8464, 8467, 8770, 8810, 8847 (Scheduler); TICKET-9017, 9193, 9194, 9433, 9493, 9547 (CD)
* **Confluence:** "[DONE] AWS Migration - Scheduler"
* **GitHub:** `deployScheduler.Jenkinsfile`, `deployCustomerDashboard.Jenkinsfile`

---

## Story 6 — Lifecycle Events Platform: Building the Event-Driven Architecture Foundation
**Amazon Leadership Principles:** Think Big · Invent and Simplify · Customer Obsession

### Situation
Downstream teams (marketing, billing, fraud, provisioning) needed real-time notifications when users, accounts, sub-accounts, and companies changed state. The existing approach was ad-hoc: each team polled databases or relied on brittle point-to-point integrations. There was no standardised event schema, no documentation, and no reliable delivery guarantee.

### Task
Design and implement a comprehensive Lifecycle Events platform on Kafka Hermes, covering User, Account, Sub-Account, Company, and UserFinance entities, and publish documentation to the VCP Core Developer Hub.

### Action
* Designed the event schema for each entity type: `UserLifeCycleEvent.java`, `AccountBillingLifeCycleEvent.java`, `UserFinanceLifeCycleEvent.java`, `SubAccountLifeCycleEvent.java`, with corresponding `*EventType` enums.
* Implemented Kafka producers in User Service and Dashboard, with `UserLifeCycleEventsListenerTest.java` and `VaccountLifeCycleListenerTest.java` for test coverage.
* Centralised account lifecycle event publishing in User Service's `SubAccountListener` (TICKET-11315), replacing scattered ad-hoc publishers across the codebase.
* Added new lifecycle events: Account Billing (TICKET-12324), User Finance (TICKET-12178), Company (TICKET-10625), and enriched existing events with more fields (TICKET-10804).
* Refactored the `AccountLifeCycle` event structure (TICKET-11929) for consistency.
* Published developer documentation to the VCP Core Developer Hub (TICKET-13191, TICKET-12697) — the external-facing API documentation for teams outside Dashboard.
* Added lifecycle events section to Confluence: "LifeCycle Events" page covering all topics, event bodies, producers, and consumers.

### Result
* Downstream teams (marketing/Pardot, billing/Zoho, fraud/SIFT, provisioning) could now consume standardised, reliable lifecycle events from a single Kafka cluster.
* The VCP Core documentation became the authoritative reference for external teams integrating with Vonage's user lifecycle.
* Reduced point-to-point integrations and database polling across the platform.

### Learning
Learned that event-driven architecture requires as much investment in documentation and schema design as in code. A poorly documented event schema becomes a maintenance burden for every consumer team.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-10625 (Company lifecycle events), TICKET-12324 (Account Billing), TICKET-12178 (User Finance), TICKET-10804 (Send more info in events), TICKET-11315 (Centralise account lifecycle events), TICKET-11929 (Refactor AccountLifeCycle), TICKET-13191 (VCP Core Documentation update), TICKET-12697 (Add Lifecycle Events to VCP Core Documentation)
* **GitHub:** `UserLifeCycleEvent.java`, `AccountBillingLifeCycleEvent.java`, `UserFinanceLifeCycleEvent.java`, `SubAccountLifeCycleEvent.java`, `UserLifeCycleEventType.java`, `UserFinanceLifeCycleEventType.java`, `VAccountCompanySyncEventListener.java`, `UserFinanceLifeCycleEventsListener.java`, `TICKET-11315 centralise volga event listener (#235)`, `TICKET-12697 add section lifecycle events (#54)`
* **Confluence:** "LifeCycle Events" — full topic catalogue with event bodies, producers, consumers

---

## Story 7 — Security Hardening: Removing Hardcoded Credentials & Fixing XSS Vulnerabilities
**Amazon Leadership Principles:** Earn Trust · Ownership · Are Right, A Lot

### Situation
A secret security scan identified 15 places in the dashboard repository where credentials were being leaked into Git history. Separately, security researchers reported XSS vulnerabilities (TICKET-11309 Reflected XSS, TICKET-13621 XSS to ATO via Password Manager, TICKET-13666 JSONP endpoint callback validation). These were not theoretical risks — an XSS-to-ATO (Account Takeover) vulnerability on `rest.nexmo.com` could allow attackers to hijack customer accounts.

### Task
Remediate all credential leaks and XSS vulnerabilities, ensuring both current code and Git history were clean, and establish ongoing security hygiene through Mend and Prisma scanning.

### Action
* Led the credential removal project (TICKET-13735): identified all 15 GitHub secret scan violations, removed secrets from current code (TICKET-13852), rewrote Git history to remove secrets from past commits (TICKET-13944), and resolved the reopened GitHub security issues (TICKET-14078).
* Fixed the XSS-to-ATO vulnerability (TICKET-13621) on `rest.nexmo.com` and the JSONP callback validation issue (TICKET-13666) in DevAPI.
* Addressed Reflected XSS (TICKET-11309) in the Dashboard frontend.
* Ran systematic Mend vulnerability remediation across both `user-service` and `dashboard` repos: fixed critical `spring-beans` (TICKET-15615), `kafka-clients` (TICKET-15630), `embedded-redis` (TICKET-15004), `zookeeper` (TICKET-13994), `tomcat-embed-core`, `c3p0` (TICKET-13910), `h2` (TICKET-15733), `wiremock` (TICKET-13990), `nexmo-auth-springboot` (TICKET-13993), `hibernate-core`, `spring-web`, and `spring-kafka-test`.
* Ran Prisma scan remediation for both services (TICKET-15002, TICKET-15291).
* Removed G-Cloud credentials from the CD repo (TICKET-15458).

### Result
* All 15 credential leaks resolved — GitHub secret scan violations closed.
* XSS and ATO vulnerabilities patched, reducing the attack surface on customer-facing endpoints.
* Mend vulnerability count reduced to KTLO (Keep The Lights On) baseline for the team — noted in 2025 personal objectives as "Further Reduction of mend vulnerabilities (KTLO for team achieved)".
* Established a culture of proactive security scanning within the team.

### Learning
Learned that security debt compounds — each unresolved vulnerability increases the blast radius of a potential breach. I also learned the technical complexity of rewriting Git history safely (using `git filter-branch` / BFG Repo Cleaner) without disrupting active development branches.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-13735 (parent), TICKET-13852, TICKET-13944, TICKET-14078 (credential removal); TICKET-13621 (XSS to ATO), TICKET-13666 (JSONP), TICKET-11309 (Reflected XSS)
* **JIRA Mend tickets:** TICKET-15615, 15630, 15004, 13994, 13910, 15733, 13990, 13993, 15002, 15291, 15458
* **GitHub:** `build(gradle): TICKET-15630 mend critical issue kafka clients (#456)`
* **2025 Personal Objectives:** "Security and Vulnerability — Better Mend scan and Prisma reports — Further Reduction of mend vulnerabilities (KTLO for team achieved)"

---

## Story 8 — Signup Race Condition: Fixing a Multi-Service Async Bug Causing Customer Onboarding Failures
**Amazon Leadership Principles:** Dive Deep · Customer Obsession · Are Right, A Lot

### Situation
New customer signups were intermittently failing — users would complete the signup flow but find their account in an inconsistent state (missing capabilities, wrong status). The root cause was a race condition in the async communication between Customer Dashboard, User Service, PHub (account provisioning), and the BSS vaccounts service. The issue was non-deterministic and hard to reproduce, making it a persistent source of customer complaints and nightly test failures.

### Task
Investigate the signup race condition (TICKET-14496 wrapper), identify the exact failure points across all involved services, and implement fixes.

### Action
* Mapped the full signup flow across all services: CD → User Service → PHub → provisioning → vaccounts, identifying the async handoff points where race conditions could occur.
* Fixed the BSS vaccounts race condition (TICKET-14281) by introducing a new Kafka topic (`TICKET-14281 signup vaccount sync new kafka topic`) to synchronise account creation events, replacing a polling-based approach.
* Fixed the provisioning service race condition (TICKET-14498) with appropriate retry/backoff logic.
* Refactored the signup package in User Service (TICKET-11223) to make the flow more deterministic and easier to reason about.
* Added a SQL migration (`20231018_1725__TICKET-12115_make_status_new_for_last_two_months_signups.sql`) to correct the status of accounts affected by the bug in production.
* Validated fixes by ensuring nightly tests passed consistently.

### Result
* Signup race condition resolved — nightly tests passed consistently post-fix.
* Customer onboarding failures due to this issue eliminated.
* The refactored signup package became easier to maintain and extend for future features (e.g., Prepaid USD signup flow).

### Learning
Learned that race conditions in distributed systems are often invisible until they cause customer-facing failures. The key insight was that async communication requires explicit synchronisation points — Kafka topics with proper consumer group semantics are more reliable than polling or fire-and-forget events.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-14496 (wrapper, 5 story points), TICKET-14281 (BSS vaccounts), TICKET-14498 (provisioning service), TICKET-11223 (refactor signup package)
* **GitHub:** `Apidb 14281 signup vaccount sync new kafka topic (#3827)`, `TICKET-14281 signup race condition and 404`, `TICKET-11223 refactor package signup account (#227)`
* **SQL:** `20231018_1725__TICKET-12115_make_status_new_for_last_two_months_signups.sql`
* **Slack:** Thread between Arpit, Mohit, and Tasos — coordination on the fix

---

## Story 9 — Braintree 3D Secure: Configurable Non-3DS Payment Flow for USD Prepaid
**Amazon Leadership Principles:** Customer Obsession · Invent and Simplify · Deliver Results

### Situation
Vonage was launching a Prepaid USD product using Braintree for card payments. The USD Merchant ID (MID) from Braintree did not have 3D Secure (3DS) enabled — but the existing codebase always attempted to create a 3DS nonce, causing payment failures for USD customers. Additionally, 3DS enablement was expected to change (potentially with a new MID), so the solution needed to be configurable rather than hardcoded.

### Task
Implement a configurable 3D Secure flag (TICKET-15324) that allows the USD payment flow to bypass 3DS when the org subscription `ENABLE_NON_3DS_PAYMENTS` is set, while keeping 3DS mandatory for EUR accounts.

### Action
* Investigated the Braintree client SDK's 3DS flow: the frontend uses the drop-in UI to create a 3DS instance and verify the card nonce before submission.
* Implemented a feature flag (`ENABLE_NON_3DS_PAYMENTS`) at the org subscription level, checked in both frontend and backend.
* Modified the frontend to skip the 3DS nonce verification step when the flag is set and the account currency is USD.
* Added console logging (`[is3dsPaymentFlow] is (true/false) for accountCurrency=(EUR/USD) and hasNon3dsPaymentsEnabled=(true/false)`) for debugging.
* Validated all four combinations: EUR/USD × 3DS enabled/disabled.
* Monitored 3DS nonce statuses in production (TICKET-15324 follow-up: "3D Secure Payment - Monitor statuses received from BrainTree for past 30/60 days") — documented in `3D Secure Nonce Status` and `BrainTree - 3D Secure Status` OneDrive docs.

### Result
* USD Prepaid customers could make card payments without 3DS friction, unblocking the USD product launch.
* The configurable flag meant the team could enable 3DS for USD in future without a code change.
* Zero payment errors related to 3DS for USD accounts post-deployment.

### Learning
Learned that payment flows require deep understanding of both the merchant's configuration and the client SDK behaviour. A feature flag is the right pattern when a behaviour needs to change based on external factors (MID configuration) that are outside the team's control.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-15324 — "Prepaid USD - Braintree 3D secure flag"
* **GitHub:** `TICKET-15324 braintree 3D secure flag` (two PRs — initial and follow-up)
* **OneDrive docs:** `3D Secure Nonce Status`, `BrainTree - 3D Secure Status` — production monitoring analysis
* **Related:** TICKET-14808 — "[Prod] Find & populate Braintree USD merchant ID"

---

## Story 10 — Negative Balance Automation: Replacing a Manual Finance Process with a Scheduler Job
**Amazon Leadership Principles:** Invent and Simplify · Ownership · Deliver Results

### Situation
Vonage's Finance team was manually identifying and notifying ~190,000 prepaid customers with negative account balances — a time-consuming, error-prone process done on an ad-hoc basis. There was no automated system to send structured reminders, escalate after multiple missed payments, or disable notifications for accounts that had been through the full cycle.

### Task
Design and implement an automated negative balance notification scheduler job (TICKET-15822 Epic) to replace the manual Finance process.

### Action
* Designed the job logic: check balance in quota service for all ~190K prepaid users, trigger notifications on the 10th, 18th, and 25th of each month, send reminders on the 1st, 2nd, and 3rd, run in batches of 10,000 every 30 minutes.
* Implemented the scheduler job in the Scheduler service, respecting the `Negative_balance_notification` flag to skip accounts that had completed the full cycle.
* Configured notification emails to go to Primary user, manager, and finance email.
* After 3 reminders, set `Negative_balance_notification = false` unless the account was re-enabled.
* Disabled email notifications in QA environment (TICKET-16211) to prevent test emails reaching real customers.
* Created documentation for the job (TICKET-16005).
* Fixed a related issue where `managerBalanceAndCreditLimitJob` was taking too long (TICKET-16386) — optimised the query and batch size.

### Result
* Finance team's manual negative balance notification process fully automated.
* ~190,000 prepaid accounts now receive structured, timely notifications.
* Reduced Finance team operational overhead and improved consistency of customer communications.

### Learning
Learned that automating a manual process requires understanding the *human* workflow first — the Finance team's ad-hoc approach had implicit rules (timing, escalation, opt-out) that needed to be made explicit in code. Documentation is essential when a job runs autonomously.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-15822 (13 story points, Epic) — "Add a scheduler job for negative balance check"; TICKET-16005 (documentation); TICKET-16211 (disable email in QA); TICKET-16386 (managerBalanceAndCreditLimitJob too slow)
* **GitHub:** `ScheduledTaskServiceImplTest.java`
* **Confluence:** "Negative Balance Jobs (Details)"

---

## Story 11 — Prepaid USD Multi-Currency: Zoho CRM & Email Template Integration
**Amazon Leadership Principles:** Customer Obsession · Deliver Results · Earn Trust

### Situation
Vonage was expanding its Customer Dashboard to support USD as a payment currency (Prepaid USD product). However, the Zoho CRM integration and all payment email templates were hardcoded for EUR. USD customers were receiving incorrect bank transfer details, wrong currency symbols in emails, and Zoho accounts were being created without currency information — causing confusion and support tickets.

### Task
Extend the Zoho integration and email template system to support multi-currency (EPIC-1516 Epic), specifically adding USD support for bank transfer details, Zoho customer account creation, and all payment-related email templates.

### Action
* Added currency field to Zoho customer account creation (TICKET-14686) — ensuring USD accounts were correctly tagged in CRM.
* Updated all payment email templates to include account currency (TICKET-14744) — bank transfer details, receipts, and notifications.
* Fixed bank transfer details for USD accounts in QA (TICKET-14950) and PROD (TICKET-14760).
* Resolved a template mismatch between QA and PROD environments (TICKET-15215) that was causing inconsistent email content.
* Refactored `AccountCurrencyCache` before the USD deploy (TICKET-15310) to support multi-currency lookups efficiently.

### Result
* USD Prepaid customers received correct bank transfer details and currency-specific email communications.
* Zoho CRM accurately reflected customer currency, enabling Finance and Sales teams to segment USD customers correctly.
* Template mismatch between QA and PROD resolved, improving deployment confidence.

### Learning
Learned that multi-currency support is a cross-cutting concern that touches every layer of the stack — from database schema to CRM integration to email templates. A seemingly simple "add USD" requirement requires a systematic audit of all currency-dependent code paths.

### Deeper Dive (Technical Evidence)
* **JIRA Epic:** EPIC-1516 — "CD - Prepaid USD - Zoho Support (Multi-currency Support)"
* **JIRA:** TICKET-14686 (Zoho currency), TICKET-14744 (email templates), TICKET-14950 (QA bank transfer), TICKET-14760 (PROD bank transfer), TICKET-15215 (template mismatch), TICKET-15310 (AccountCurrencyCache refactor)

---

## Story 12 — Deutsche Telekom CSP Domain Migration: Zero-Downtime URL Cutover
**Amazon Leadership Principles:** Customer Obsession · Deliver Results · Earn Trust

### Situation
Vonage's Deutsche Telekom (DT) co-branded Customer Dashboard was running on legacy `api.telekom.net` domains. DT required a full domain migration to new URLs across all services — Dashboard frontend, Developer Portal, static pages, VIAM routing, APIGW, and SSL certificates. This was a high-visibility migration affecting a major enterprise customer (DT) with strict SLA requirements.

### Task
Lead the technical implementation of the DT domain migration (EPIC-1435 Epic) across all affected services, ensuring zero downtime and backward compatibility during the transition.

### Action
* Updated Dashboard frontend URLs for DT co-branded dashboard (TICKET-14069, TICKET-13152).
* Updated VIAM routing for Dashboard, Developer Portal, static pages, and 5G-slice (multiple APIDB tickets under EPIC-1347 and EPIC-1435).
* Implemented support for both old and new domains simultaneously during the transition period (APIDB CSP DT - dashboard - support old and new domains).
* Updated Developer Portal CMS (APIDB CSP DT - Dashboard URL update in developer-portal-cms).
* Coordinated new wildcard SSL certificate provisioning and TLS cert approval (APIDB CSP DT - Prod - New wildcard SSL certificate for telekom, TLS cert approval and DNS point to APIGW).
* Configured new IAP (Identity-Aware Proxy) for new domains (APIDB CSP DT - Prod - Dashboard (vng telekom) - New IAP configuration for new domains).
* Removed all references to `api.telekom.net` and subdomains after cutover (APIDB CSP DT - remove api.telekom.net and subdomains).
* Fixed DT SSO integration issues: enabled My Profile page for password changes (TICKET-12909), implemented read-only My Addresses for SSO users (TICKET-16487), redirected user invite emails to DT IDP (TICKET-16483).

### Result
* DT domain migration completed with zero downtime — DT customers experienced no service interruption.
* All legacy `api.telekom.net` references removed from the codebase.
* DT SSO integration improved with correct profile page behaviour for SSO users.

### Learning
Learned that enterprise customer migrations require meticulous coordination across infrastructure, security (SSL/TLS), routing (APIGW/VIAM), and application layers. The "support old and new domains simultaneously" pattern is essential for zero-downtime cutovers.

### Deeper Dive (Technical Evidence)
* **JIRA Epics:** EPIC-1435 (CSP DT domain migration), EPIC-1347 (CPAAS update URLs for dashboard)
* **JIRA:** TICKET-12909 (DT My Profile), TICKET-16483 (DT IDP redirect), TICKET-16487 (DT SSO read-only addresses), TICKET-13960 (rename/delete account for SSO reuse)
* **GitHub PRs:** `EPIC-1347 cpaas update urls for dashboard new domains (#1475) (#1483)`, `TICKET-13152 CSP DT - Developer Portal url update`, `TICKET-14069 please update urls in dt co branded dashboard`

---

## Story 13 — User Service Ownership: Artifactory Migration & Gradle Modernisation
**Amazon Leadership Principles:** Ownership · Deliver Results · Frugality

### Situation
The User Service was using an old Artifactory instance that was being decommissioned. All dashboard projects needed to migrate to the new `vonagecc` Artifactory. The User Service had additional complexity: it published a client library (`userservice-client`) consumed by Dashboard and Admin Dashboard — so the migration required coordinating changes across three repositories simultaneously.

### Task
Migrate User Service to the new Artifactory (TICKET-14181 Epic), upgrade the Gradle wrapper (required for the new publish mechanism), and ensure all downstream consumers (Dashboard, Admin Dashboard) were updated to read from the new Artifactory.

### Action
* Upgraded the Gradle wrapper version in User Service (TICKET-14227) — a prerequisite for publishing to the new Artifactory.
* Migrated User Service to fetch all dependencies from the new `vonagecc` Artifactory (TICKET-14230), updating `build.gradle` and `settings.gradle`.
* Updated Dashboard to consume the updated `userservice-client` from the old Artifactory during the transition (TICKET-14938).
* Updated Dashboard and Admin Dashboard to read `userservice-client` from the new Artifactory (TICKET-14269).
* Validated the full build pipeline: User Service build → publish to vonagecc → Dashboard consumes → nightly tests pass.
* GitHub PR: `build(deployment): publish to vonagecc new artifactory (TICKET-14227) (#406)`, `TICKET-14230 fetch from new artifactory vonagecc (#373)`.

### Result
* User Service fully migrated to new Artifactory — old Artifactory dependency eliminated.
* All downstream consumers (Dashboard, Admin Dashboard) updated without service disruption.
* Nightly tests passed post-migration, confirming end-to-end build pipeline integrity.

### Learning
Learned that library migrations require a "strangler fig" approach — keep the old and new working simultaneously until all consumers are updated. Rushing the cutover risks breaking downstream builds.

### Deeper Dive (Technical Evidence)
* **JIRA Epic:** TICKET-14181 — "User service migration to new Artifactory"
* **JIRA:** TICKET-14227 (Gradle wrapper), TICKET-14230 (fetch from new artifactory), TICKET-14938 (Dashboard consume from old), TICKET-14269 (Dashboard/AD from new)
* **GitHub:** `build(deployment): publish to vonagecc new artifactory (TICKET-14227) (#406)`, `TICKET-14230 fetch from new artifactory vonagecc (#373)`

---

## Story 14 — Kafka Consumer Group UUID Bug: Eliminating False Production Alerts
**Amazon Leadership Principles:** Dive Deep · Operational Excellence · Are Right, A Lot

### Situation
The Customer Dashboard's Clear Cache Event Listener was generating a new UUID as its Kafka consumer group ID on every restart. This meant that every time an allocation restarted (routine in a containerised environment), a new stale consumer group was left behind, triggering Kafka lag alerts in production. The on-call team was receiving false-positive alerts, eroding trust in the alerting system and causing alert fatigue.

### Task
Diagnose the root cause of the false Kafka lag alerts (TICKET-14429) and implement a fix that produced stable, deterministic consumer group IDs across restarts.

### Action
* Traced the issue to `ClearCacheEntryKafkaListenerConfiguration` where `UUID.randomUUID()` was used as the group ID.
* Investigated alternatives: allocation ID and host IP as stable identifiers that survive restarts.
* Implemented a fix to use the allocation/host identifier as the group ID suffix, ensuring that restarting an allocation reuses the same group ID.
* Validated in canary: restarted the allocation, confirmed the same group ID was generated, and verified Kafka lag returned to zero.
* Added log statement `"[clearCacheEntryKafkaEventListener] Initializing clear cache kafka consumer factory with group ID:"` for future debugging.

### Result
* False Kafka lag alerts in production eliminated.
* On-call alert fatigue reduced — the team could trust that a Kafka lag alert meant a real problem.
* The fix was generalised as a pattern for other Kafka listeners in the codebase.

### Learning
Learned that alert quality is as important as alert coverage. A false-positive alert is not just noise — it trains engineers to ignore alerts, which is dangerous. Fixing the root cause of false alerts is a high-value operational improvement.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-14429 (3 story points) — "CD - Kafka Consumer Group UUID causing lag on restart allocation"
* **Code:** `ClearCacheEntryKafkaListenerConfiguration` — consumer group ID fix
* **Related:** TICKET-12037 (exclude false alerts for kafka lag in hermes cluster), TICKET-12039 (rename groupID)

---

## Story 15 — Sigma Prime Integration: Exposing Internal Payment Transaction Search APIs
**Amazon Leadership Principles:** Customer Obsession · Invent and Simplify · Deliver Results

### Situation
Vonage's internal Sigma Prime analytics platform needed access to payment transaction data (payment methods, topup transactions) from the Customer Dashboard. There was no internal API for this — Sigma Prime was either scraping data or relying on manual exports. This was inefficient and created data freshness issues for the analytics team.

### Task
Expose internal API endpoints for payment transaction search (TICKET-16561) and payment method retrieval (TICKET-15536) to enable Sigma Prime to query data programmatically.

### Action
* Implemented `PostpaidService.getPaymentMethods()` and exposed it via a new internal API endpoint (TICKET-15536 — "Get Payment Methods - Sigma Integration - DB").
* Implemented a topup transaction search endpoint (TICKET-16561 — "Expose internal endpoints for payment transaction search") with filtering by account, date range, and transaction type.
* GitHub PR: `TICKET-16561 sigma search topup transactions (#4320)`, `TICKET-15536 sigma get payment methods (#4174)`.
* Ensured endpoints were internal-only (not exposed via APIGW to external customers).
* Added appropriate logging and metrics.

### Result
* Sigma Prime analytics team gained programmatic access to payment data, eliminating manual exports.
* Data freshness improved — Sigma Prime could query real-time transaction data.
* Internal API pattern established for future analytics integrations.

### Learning
Learned that internal APIs deserve the same design rigour as external APIs — proper authentication, rate limiting, and documentation. An undocumented internal API quickly becomes a maintenance burden.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-16561 — "Expose internal endpoints for payment transaction search (Sigma Prime)"; TICKET-15536 — "Get Payment Methods - Sigma Integration - DB"
* **GitHub:** `TICKET-16561 sigma search topup transactions (#4320)`, `TICKET-15536 sigma get payment methods (#4174)`

---

## Story 16 — APICM Ticket Automation: Eliminating Manual Deployment Ticket Creation
**Amazon Leadership Principles:** Invent and Simplify · Frugality · Deliver Results

### Situation
Every deployment of every service (Customer Dashboard BE/FE, User Service, Scheduler, Autoreload, DevAPI) required a manually created JIRA APICM deployment ticket. The team was creating dozens of these tickets per sprint — a repetitive, error-prone process that consumed developer time and introduced inconsistencies in ticket format.

### Task
Automate APICM deployment ticket creation via GitHub Actions workflows (TICKET-14964).

### Action
* Designed and implemented a GitHub Actions workflow (`pr-comment.yml`, `pr-instructions-common.yml`) that automatically creates an APICM deployment ticket when a PR is raised or merged.
* Added the workflow to the Dashboard Frontend repo (APIDB — "Add APICM GitHub Workflow for Dashboard Frontend Repo").
* Wrote the developer guide: "APICM Ticket Automation — Developer Guide" in Confluence — documenting how the automation works and how to extend it to new repos.
* Documented the "Automated APICM ticket creation" process in Confluence.

### Result
* Manual APICM ticket creation eliminated for all covered repos.
* Deployment tickets became consistent in format and content.
* Developer time saved: estimated 15–30 minutes per deployment cycle across the team.

### Learning
Learned that automation of repetitive processes has a compounding return — the time saved accumulates across every sprint, every team member, and every future deployment. The key is making the automation self-documenting so it can be extended by others.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-14964 — "Add git message on PR creation"; "Add APICM GitHub Workflow for Dashboard Frontend Repo"
* **GitHub:** `pr-comment.yml`, `pr-instructions-common.yml`, `update slack msg (#987)`
* **Confluence:** "APICM Ticket Automation — Developer Guide", "Automated APICM ticket creation"

---

## Story 17 — Dashboard Cache Resilience: Fixing Expiration Issues & Jenkins Pipeline
**Amazon Leadership Principles:** Dive Deep · Operational Excellence · Customer Obsession

### Situation
The Customer Dashboard's caching layer was experiencing expiration issues (TICKET-14121) — cached data was not being invalidated correctly after account updates, causing customers to see stale data (wrong balance, wrong account status). Additionally, there was no operational tool to manually clear the cache in production when needed, forcing engineers to restart services as a blunt instrument.

### Task
Fix the cache expiration logic (TICKET-14121) and build a Jenkins pipeline to allow controlled cache clearing in production (TICKET-14122).

### Action
* Diagnosed the cache expiration bug: the `AccountCurrencyCache` and related caches were not respecting TTL correctly under certain update patterns.
* Fixed the expiration logic (TICKET-14121) and added the `clearCacheEvent` Kafka topic consumer to handle cache invalidation triggered by account updates (TICKET-13879 — "Account not upgraded after topup (clearCacheEvent)").
* Built a Jenkins pipeline (TICKET-14122) that allowed the team to clear specific cache keys or the entire cache without a service restart.
* Fixed the `AccountsClient` to use `FeignClient` instead of `HttpRequester` (TICKET-15740) — improving connection pooling and timeout handling.
* Fixed a cache dependency issue (TICKET-16322) that was causing cascading cache failures.

### Result
* Cache expiration issues resolved — customers saw up-to-date account data after top-ups and account changes.
* Jenkins cache-clearing pipeline gave the team a surgical tool for production incidents, reducing MTTR.
* `FeignClient` migration improved resilience of downstream service calls.

### Learning
Learned that caching bugs are particularly insidious because they cause intermittent, hard-to-reproduce issues. The key is to have both correct expiration logic *and* an operational escape hatch (the Jenkins pipeline) for when things go wrong in production.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-14121 (cache expiration fix), TICKET-14122 (Jenkins pipeline), TICKET-13879 (clearCacheEvent), TICKET-15740 (FeignClient migration), TICKET-16322 (cache dependency fix)
* **GitHub:** `config_customer_dashboard.py`, `TICKET-16322` related PRs

---

## Story 18 — Optus Co-Branded Dashboard: Feature Removal & Coupon Bug Fix
**Amazon Leadership Principles:** Customer Obsession · Earn Trust · Deliver Results

### Situation
Vonage's Optus co-branded Customer Dashboard (a white-label product for the Australian telco) had accumulated features that were not appropriate for the Optus brand — pages and menu items that should not be visible to Optus users. Additionally, Optus customers were experiencing an `INTERNAL_SERVER_ERROR` when trying to load a 100-credit coupon (TICKET-14070), blocking a key onboarding flow.

### Task
Remove inappropriate features from the Optus co-branded dashboard (TICKET-17021, TICKET-13782) and fix the coupon loading bug (TICKET-14070).

### Action
* Implemented conditional menu rendering: `show menu link if NOT Optus` logic in the Dashboard frontend (TICKET-17021 — "Removal of the new dashboard changes for Optus co-branded dashboard").
* GitHub PR: `TICKET-17021 Optus Users (remove unwanted pages) (#2820)` — added `show menu link if NOT` conditional rendering.
* Disabled Pricing Download for all Optus Dashboard users (TICKET-13782).
* Investigated and fixed the 100-credit coupon `INTERNAL_SERVER_ERROR` (TICKET-14070) — traced to a missing configuration for the Optus org subscription.
* Coordinated with the Optus account team (PART-141 linked ticket) to validate the changes.

### Result
* Optus co-branded dashboard correctly showed only Optus-appropriate features.
* Coupon loading bug fixed — Optus customers could successfully apply the 100-credit coupon.
* Optus account team confirmed the changes met their requirements.

### Learning
Learned that white-label/co-branded products require careful feature flagging at the org subscription level. A single codebase serving multiple brands needs robust conditional rendering — not separate codebases.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-17021 (feature removal, linked to PART-141), TICKET-13782 (disable pricing download), TICKET-14070 (coupon bug)
* **GitHub:** `TICKET-17021 Optus Users (remove unwanted pages) (#2820)`

---

## Story 19 — Production Log File Size: Diagnosing & Fixing a Disk Space Crisis
**Amazon Leadership Principles:** Dive Deep · Operational Excellence · Bias for Action

### Situation
A production alert fired: the log file for Dashboard Services was growing unboundedly and approaching disk capacity (TICKET-16445 — "Dashboard Services - Prod logs file is too big"). If left unaddressed, the disk would fill up, causing service crashes across all Dashboard services (DevAPI, Scheduler, Autoreload, Customer Dashboard).

### Task
Diagnose the root cause of the log file growth and implement a fix across all affected services without a production outage.

### Action
* Investigated the logging configuration across DevAPI, Scheduler, Autoreload, and Customer Dashboard.
* Identified that log rotation was not configured correctly — logs were accumulating without rolling over.
* Implemented log rotation configuration fixes across all four services (TICKET-16445 GitHub PR: `TICKET-16445 prod log file becoming too big (#4267)` — covering devapi, scheduler, autoreload).
* Updated README files for all services to document the logging configuration (GitHub PR: `Readme files update (#3942)` — root, cd, devapi, autoreload, scheduler).
* Validated in QA before deploying to production.

### Result
* Log file growth stopped — disk usage stabilised within safe bounds.
* No production outage occurred.
* README documentation updated so future engineers understood the logging configuration.

### Learning
Learned that operational issues like disk space are often caused by missing configuration rather than code bugs. The fix was simple — but finding it required understanding the full logging stack across four services. Documentation prevents recurrence.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-16445 — "Dashboard Services - Prod logs file is too big"
* **GitHub:** `TICKET-16445 prod log file becoming too big (#4267)` (devapi, scheduler, autoreload), `Readme files update (#3942)` (root, cd, devapi, autoreload, scheduler)

---

## Story 20 — Grafana Observability: Building Metrics & Alerting for DashboardHttpClient
**Amazon Leadership Principles:** Operational Excellence · Dive Deep · Deliver Results

### Situation
The Customer Dashboard's `DashboardHttpClient` — the internal HTTP client used for all downstream service calls — had no metrics or Grafana visibility. When downstream services (PHub, User Service, etc.) were slow or failing, the team had no way to quantify the impact, identify which endpoints were affected, or set up proactive alerts. Issues were only discovered reactively via customer complaints or error log spikes.

### Task
Implement metrics for `DashboardHttpClient` and create Grafana boards for real-time observability (TICKET-15451).

### Action
* Instrumented `DashboardHttpClient` with Micrometer metrics: request count, error rate, and latency percentiles per endpoint.
* Created Grafana dashboards (TICKET-15451 — "Dashboard Services - metrics for DashboardHttpClient - GRAFANA boards") showing request rates, error rates, and p95/p99 latencies for all downstream calls.
* Added a P3 alert for DevAPI PHUB calls (TICKET-15170) — the first proactive alert for this critical integration.
* Added OpsGenie alert for CD RDS CPU high usage (TICKET-17174) — enabling the team to respond to database performance issues before they caused customer-facing failures.
* Fixed the `autoFraudScoreUpgradeJob` `HttpClientTimeOutException` (TICKET-15382) — identified via the new metrics that the job was timing out on audit event calls; added `threadName` to logs for easier debugging (noted in 2025 personal objectives).

### Result
* `DashboardHttpClient` metrics gave the team real-time visibility into all downstream service health.
* P3 alert for PHUB calls enabled proactive detection of integration issues.
* `autoFraudScoreUpgradeJob` timeout issue identified and fixed using the new metrics.
* OpsGenie RDS CPU alert prevented a potential database performance incident.

### Learning
Learned that observability is not a luxury — it's a prerequisite for reliable operations. Instrumenting a shared HTTP client gives you visibility into the health of every downstream dependency simultaneously. The investment in metrics pays dividends every time an incident occurs.

### Deeper Dive (Technical Evidence)
* **JIRA:** TICKET-15451 (DashboardHttpClient metrics + Grafana), TICKET-15170 (P3 alert for PHUB), TICKET-17174 (CD RDS OpsGenie alert), TICKET-15382 (autoFraudScoreUpgrade HttpClientTimeOutException)
* **2025 Personal Objectives:** "Grafana - Added for DashboardHttpClient" and "autofraudScoreUpgrade failures (HttpClientTimeOutException) - threadName to ease debugging"
* **Slack:** Thread between Arpit and OpsGenie — multiple production alert responses
