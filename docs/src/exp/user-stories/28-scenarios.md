# STAR 28

Also add 3 user stories for VIES, VAT ID and MySQL 5.7 to 8.0 (I remember working on ticket to add index for DB column after migration) - add these 3 new user stories in STAR-L format


Let me research these three topics before writing the stories.

Good — I found the VAT ID ticket reference (APIDB-15546) and some Slack threads. Let me dig deeper.

Excellent — this is gold. I now have the exact technical details for all three stories. Let me get a bit more depth on the MySQL migration and the VIES work.

I now have all the technical detail I need. The three stories are clearly defined:

1. **VIES/VAT ID** — Two-phase work: APIDB-15546 (Phase 1: VIES FeignClient integration, validation statuses) + APIDB-16117 (Phase 2: BSS/vAccount integration, show validation status on postpaid My Address page) + APIDB-17132 (bug fix: validation status lost after page redesign)
2. **MySQL 5.7 → 8.0 migration** — APIDB-16623 (maintenance banner), APIDB-16232 (QA schema/Flyway fix), APIDB-16386 (scheduler job 10hrs→2hrs due to MySQL8 query cache removal), APIDB-17174 (missing index on `d_topup_transaction.paymentId` causing full table scans + RDS CPU alerts)

I have everything I need. Now let me append the three new stories to the existing document.

Now update the summary table to include the three new rows and fix the title:

Wait — you asked for 3 new stories (VIES, VAT ID, MySQL). Let me check: VIES and VAT ID are closely related (same ticket chain) — I combined them into one story (Story 26). Let me re-read your request and split them properly, then add Story 28 for the standalone MySQL missing-index story.

All 28 stories are confirmed. Let me also update the artifact title to reflect the new count.

The document is updated and will render with the new content. Here's a summary of the 3 new stories added:

---

## 3 New Stories Added (26, 27, 28)

### Story 26 — VIES FeignClient: EU VAT ID Validation (Phase 1)
**LP: Insist on the Highest Standards | Customer Obsession**
Built from [APIDB-15546](https://jira.vonage.com/browse/APIDB-15546) — the full backend integration with the EU Commission's VIES API. Key technical details captured:
* New `ViesClient` FeignClient with retry logic, metrics, and graceful degradation (never breaks existing flow)
* Four-state `vatIdValidationStatus` enum: `NOT_APPLICABLE`, `SAME_AS_EXISTING`, `VALID_VAT_ID`, `INVALID_VAT_ID`
* Static list of 26 applicable EU countries; QA bypass to avoid hitting live VIES in nightlies
* Confirmed by GitHub release commit [b422ef3](https://github.com/vonage-technology/dashboard/commit/b422ef39f73cc5cf8ed6f9d16e)

### Story 27 — VAT ID Validation Status Display: BSS Integration & Regression Fix (Phase 2)
**LP: Customer Obsession | Dive Deep**
Built from [APIDB-16117](https://jira.vonage.com/browse/APIDB-16117) + [APIDB-17132](https://jira.vonage.com/browse/APIDB-17132) — surfacing the validation status on the postpaid My Address page, plus diagnosing a regression where a page redesign silently dropped the status display. The root-cause analysis is verbatim from the ticket: *"vatStatusLabel lived in the wrong branch of the template — edit form instead of summary view. That's all it was."*

### Story 28 — MySQL 5.7 → 8.0 Migration: Schema, Missing Index & Performance Recovery
**LP: Dive Deep | Deliver Results**
Built from [APIDB-16623](https://jira.vonage.com/browse/APIDB-16623) + [APIDB-16232](https://jira.vonage.com/browse/APIDB-16232) + [APIDB-16386](https://jira.vonage.com/browse/APIDB-16386) + [APIDB-17174](https://jira.vonage.com/browse/APIDB-17174) — four interconnected problems from the same migration:
* **Maintenance banner** — customer communication for the migration window
* **QA schema fix** — Flyway migrations to resolve `GenericJDBCException` in nightly tests
* **Scheduler 10hrs→2hrs** — MySQL 8.0 removed query cache; fixed N+1 pattern with `accountOwnerCache`
* **Missing index / 97% RDS CPU** — `d_topup_transaction.paymentId` and `requestId` had no indexes, causing full table scans on every Braintree webhook and payment summary page load

---

---

# OUTPUT - 28 Amazon Leadership Principle STAR-L Stories

# 28 Amazon Leadership Principle STAR-L Stories
## Arpit Tripathi — Full Stack Developer, Vonage (API Engineering)
### Prepared for Senior Software Engineer Interviews (Java/Spring, 12 Years Experience)

---

> **How to use this document:** Each story follows the **STAR-L** format:
> * **S**ituation — Context and background
> * **T**ask — Your specific responsibility
> **A**ction — What YOU did (use "I", not "we")
> * **R**esult — Measurable outcome
> * **L**earning — What you took away / how you grew
>
> An additional **"Deeper Dive"** section follows each story with the actual technical detail found in Jira, GitHub, Confluence, and Slack — use these to enrich your verbal answers in real interviews.

---

## Story 1 — Fraud Prevention: PayPal Authorization-Only Flow with SIFT Integration
**Amazon LP: Dive Deep | Customer Obsession**
**Ticket:** [APIDB-16377](https://jira.vonage.com/browse/APIDB-16377), [APIDB-16847](https://jira.vonage.com/browse/APIDB-16847), [APIDB-16893](https://jira.vonage.com/browse/APIDB-16893)

**Situation:** Vonage's payment platform was suffering from a critical fraud gap: PayPal transactions via Braintree were always settled immediately, even when SIFT's fraud-detection engine flagged them as high-risk. This meant fraudulent payments were captured before any intervention was possible, leading to PayPal disputes, financial losses, and reputational damage with PayPal as a payment partner.

**Task:** I was assigned to design and implement an Authorization-Only PayPal flow — a fundamental change to the payment lifecycle — so that SIFT's fraud decision could conditionally void or settle a transaction before funds were captured.

**Action:** I led the full-stack implementation across the backend (Java/Spring) and frontend (Angular). On the backend, I changed the Braintree integration to use `AUTHORIZE` instead of `SALE` for PayPal transactions, then built a conditional settlement service that called SIFT's payment workflow API and, based on the decision (`ALLOW` / `BLOCK`), either submitted the transaction for settlement or voided it. I also built the failure-scenario frontend (APIDB-16893) to surface a meaningful KYC-linked error page when a payment was blocked. I wrote SQL test queries for QA validation and coordinated with the SIFT team on the PayPal V2 migration email thread.

**Result:** Fraudulent PayPal payments could now be blocked before funds were captured, eliminating the root cause of PayPal disputes. The feature was deployed to production and covered ~190K prepaid users. The SIFT integration became the standard fraud gate for all new PayPal payment flows.

**Learning:** I learned that payment fraud prevention requires thinking end-to-end — from the payment gateway API contract, through the fraud-scoring engine, to the customer-facing UX. Changing a single API call (`SALE` → `AUTHORIZE`) had cascading implications across settlement, notification templates, and error handling that required careful cross-team coordination.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The SIFT check was inserted between Braintree's `authorize` response and the `submitForSettlement` call. If SIFT returned `BLOCK`, the code called `braintreeGateway.transaction().voidTransaction(transactionId)`.
* SQL queries were added to `d_payment_method_config` to configure the new PayPal BT method per country.
* The frontend failure scenario (APIDB-16893) added a new tab on the payment summary screen with a KYC form allowing customers to raise a Zendesk support ticket directly from the dashboard.
* A Grafana board (APIDB-17064) was updated to track BT PayPal payment metrics in production.
* The feature was gated behind a beta feature flag and rolled out progressively.

---

## Story 2 — Automated Negative Balance Notification Scheduler
**Amazon LP: Invent and Simplify | Bias for Action**
**Ticket:** [APIDB-15822](https://jira.vonage.com/browse/APIDB-15822), [APIDB-16005](https://jira.vonage.com/browse/APIDB-16005), [APIDB-16211](https://jira.vonage.com/browse/APIDB-16211)

**Situation:** Vonage's Finance team was manually identifying ~190,000 prepaid accounts with negative balances and sending reminder emails by hand. This was error-prone, time-consuming, and did not scale. There was no automated system to notify customers, escalate reminders, or stop notifications after a threshold.

**Task:** I was tasked with designing and implementing a new scheduler job from scratch to automate the entire negative balance notification lifecycle, replacing the manual Finance process.

**Action:** I designed the job to run on the 10th, 18th, and 25th of each month, processing accounts in batches of 10,000 every 30 minutes to avoid database overload. I implemented three escalating reminder levels — after the 3rd reminder, the `negative_balance_notification` flag was set to `false` unless the balance was cleared. Notifications were sent to the primary user, manager, and finance email. I added a feature flag to disable emails in QA (APIDB-16211) to prevent test noise. I also wrote the full documentation for the job (APIDB-16005) and added Grafana metrics (`NegativeBalanceNotificationMetrics.java`) for production monitoring.

**Result:** The Finance team's manual process was fully automated. The scheduler handled ~190K accounts per run, with zero manual intervention required. The documentation I wrote became the reference for the team's ownership of the scheduler service.

**Learning:** Building a batch job at scale taught me the importance of idempotency, batching strategy, and observability. I learned to think about failure modes — what happens if the job runs twice, or if the quota service is slow — and to build in safeguards like the `negative_balance_notification` flag.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The job queried `d_account_billing` for accounts with `type_id=2` and negative balance in the quota service.
* Batch size of 10,000 with 30-minute intervals was chosen after load analysis to avoid RDS CPU spikes (related to APIDB-16721 RDS CPU high alert).
* `NegativeBalanceNotificationMetrics.java` was added to the `common-dashboard` module for Grafana tracking.
* The job was added to the existing Scheduler service (which Arpit owned as a 2025 personal objective), leveraging the XML-to-Java migration already completed.
* A production page-size bug in the quota call was identified and fixed post-deployment.

---

## Story 3 — KYC on Payment Failure: Self-Service Support Ticket Flow
**Amazon LP: Customer Obsession | Invent and Simplify**
**Ticket:** [APIDB-15778](https://jira.vonage.com/browse/APIDB-15778), [APIDB-15757](https://jira.vonage.com/browse/APIDB-15757), [APIDB-15944](https://jira.vonage.com/browse/APIDB-15944)

**Situation:** When a customer's payment was blocked by SIFT's fraud engine, the only recourse was to manually contact Vonage support and submit KYC (Know Your Customer) documents via email. This was a poor customer experience and created a high volume of manual support tickets for the operations team.

**Task:** I was responsible for implementing a self-service KYC form directly within the Customer Dashboard's payment failure flow, allowing customers to submit their KYC details and automatically create a Zendesk support ticket without leaving the dashboard.

**Action:** I modified the payment summary screen to add a new KYC tab, visible only when a payment was blocked due to a SIFT fraud decision. The tab contained a structured form collecting the required KYC fields. On submission, the backend called the Zendesk API to create a support ticket pre-populated with the customer's account details and KYC data. I implemented the feature behind a feature flag for controlled rollout, and later removed the flag (APIDB-15944) once validated in production.

**Result:** Customers could now self-serve their KYC submission without contacting support manually. The support team saw a reduction in unstructured KYC emails, and customers received a faster, more transparent resolution path.

**Learning:** This project reinforced the value of closing the loop for customers at the point of failure rather than redirecting them elsewhere. I also learned the importance of feature flags for gradual rollout of customer-facing changes.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The KYC form was added to the payment summary screen as a new Angular tab component.
* The backend created a new endpoint that accepted KYC form data and called the Zendesk ticket creation API.
* The feature was initially hidden behind a feature flag (`kyc-payment-failure`) and validated in QA before production rollout.
* APIDB-15944 removed the feature flag after successful production validation.
* The Zendesk NPA (APIDB-16331) was also updated as part of the broader KYC initiative.

---

## Story 4 — AWS Migration: Scheduler Service (Softlayer → Atmos/AWS)
**Amazon LP: Bias for Action | Deliver Results**
**Ticket:** [APIX-268](https://jira.vonage.com/browse/APIX-268), APIDB-8239, APIDB-8459, APIDB-8810, APIDB-8847
**Confluence:** [AWS Migration - Scheduler](https://confluence.vonage.com/display/DAS/%5BDONE%5D+AWS+Migration+-+Scheduler)

**Situation:** Vonage's Scheduler service — responsible for critical background jobs including fraud score upgrades, balance checks, and billing notifications — was running on legacy Softlayer infrastructure. The company had mandated a full migration to AWS (Atmos), but the Scheduler was a singleton service with no redundancy, making the migration high-risk.

**Task:** I was responsible for the end-to-end migration of the Scheduler service to AWS, including deploying to atmos-dev, running regression tests, migrating to atmos-prod with tasks disabled, enabling tasks, and deprecating the Softlayer instance.

**Action:** I followed a phased migration plan: first deployed to atmos-dev (APIDB-8239), ran smoke tests, then deployed to atmos-prod with all cron jobs disabled (APIDB-8459) to validate the deployment without risk. After monitoring, I enabled tasks in production (APIDB-8810), set up monitoring and Grafana alerts (APIDB-8770), updated smoke tests to point to atmos-prod (APIDB-8467), and finally deprecated the Softlayer QA instance (APIDB-8464). I coordinated with the Admin Dashboard team who also depended on the Scheduler.

**Result:** The Scheduler was successfully migrated to AWS with zero downtime and no job failures. The Softlayer instance was decommissioned, reducing infrastructure costs and aligning with the company's cloud-first strategy.

**Learning:** I learned the importance of phased migrations with clear rollback points. Deploying with tasks disabled first was a key risk-mitigation strategy that I now apply to any stateful service migration.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The Scheduler ran as a single instance — there was no active-active setup — so the migration window had to be carefully planned around scheduled job times.
* Smoke tests (`scheduler_atmos_smokes.Jenkinsfile`) were updated to target the new atmos-prod endpoint.
* Post-migration cleanup (APIDB-8847) included removing Softlayer-specific configuration from Puppet and Jenkins pipelines.
* The Admin Dashboard team was notified in advance of the migration date to coordinate any dependent job schedules.

---

## Story 5 — Kafka Topic Migration to AWS Hermes Cluster
**Amazon LP: Dive Deep | Deliver Results**
**Ticket:** [APIX-983](https://jira.vonage.com/browse/APIX-983), APIDB-13772, APIDB-13773, APIDB-13682
**Confluence:** [Migrate to Kafka Hermes Cluster in AWS](https://confluence.vonage.com/display/DAS/%5BDONE%5D+Migrate+to+Kafka+Hermes+Cluster+in+AWS)

**Situation:** Vonage's Customer Dashboard was publishing and consuming Kafka events on a legacy Softlayer-based Kiwi cluster. As part of the AWS migration strategy, all Kafka topics needed to be migrated to the new Hermes cluster in AWS. This affected multiple critical topics including email, fraud, marketing, Zoho invoices, NCCO user, and WebSocket notifications.

**Task:** I was responsible for migrating the dashboard's Kafka producers and consumers from the Kiwi cluster to the Hermes AWS cluster, ensuring zero message loss and no service disruption.

**Action:** I implemented a dual-cluster configuration — keeping the old Kiwi listeners active while adding new Hermes producers — to allow gradual traffic migration. I updated the `KafkaProducerFactory` and `KafkaSSConfiguration` to support two clusters simultaneously. I then progressively moved topics: `service_dashboard-email`, `service_dashboard-fraud`, `service_dashboard-marketing_user`, `service_dashboard-zoho-invoices`, `service_dashboard-ncco_user`, and `service_dashboard-ws_notifications`. Once all consumers were confirmed on Hermes, I removed the vBilling listeners from the Kiwi cluster (APIDB-13772/13773) and updated the Kafka broker configuration (APIDB-13682).

**Result:** All dashboard Kafka topics were successfully migrated to AWS Hermes with no message loss. The legacy Kiwi cluster listeners were decommissioned, reducing operational complexity and aligning with the AWS-first infrastructure strategy.

**Learning:** I learned that Kafka migrations require a careful dual-cluster transition period. The key insight was to never cut over producers and consumers simultaneously — always migrate consumers first, validate, then switch producers.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `KafkaProducerFactory` was refactored to support two `ProducerFactory` beans — one for Kiwi, one for Hermes — with a configuration flag to switch between them.
* The `hq cluster in prod Jenkins` pipeline (APIDB-9408) was updated to support the new Hermes cluster configuration.
* Kafka lag alerts in Grafana were updated to exclude old group IDs during the transition (APIDB-12037).
* A `DeleteStaleKafkaGroupIds` Jenkins pipeline (APIDB-11968) was created to clean up stale consumer group IDs post-migration.
* A `groupId purger` script (APIDB-12027) was created for production cleanup.

---

## Story 6 — CD Signup Race Condition Fix (Multi-Service Async Flow)
**Amazon LP: Dive Deep | Are Right, A Lot**
**Ticket:** [APIDB-14496](https://jira.vonage.com/browse/APIDB-14496), APIDB-14281, APIDB-14498

**Situation:** Vonage's customer signup flow involved multiple asynchronous services — Customer Dashboard, User Service, PHub (account creation), provisioning service, and vAccounts (BSS). A race condition was causing intermittent signup failures in production, where some services completed before others had finished initialising the account, leading to failed nightly regression tests and occasional customer-facing errors.

**Task:** I was tasked with investigating the root cause of the race condition, mapping the full async signup flow, and implementing a fix across the affected services.

**Action:** I traced the signup flow end-to-end across all five services, documenting the sequence of async events and identifying the exact timing window where the race condition occurred. I found that the BSS vAccounts service (APIDB-14281) and the provisioning service (APIDB-14498) were both responding to the same account creation event without coordination. I implemented ordering guarantees and retry logic to ensure downstream services waited for upstream completion signals before proceeding. I also updated the Confluence signup flow documentation.

**Result:** The race condition was resolved. Nightly regression tests passed consistently post-fix. The fix also improved the reliability of the prepaid USD signup flow, which was being built concurrently.

**Learning:** Debugging distributed async systems requires mapping the full event chain before touching any code. I learned to use Kafka consumer group lag metrics and Kibana logs together to pinpoint exactly where the timing gap occurred.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The race condition manifested as a `UserFinance not found` error (related to APIDB-12661) when the dashboard tried to read user finance data before the user-service had finished creating it.
* The fix in the provisioning service (APIDB-14498) added a retry mechanism with exponential backoff before returning a success response.
* The vAccounts fix (APIDB-14281) ensured the BSS account creation event was only published after all required fields were populated.
* Arpit noted in the ticket: "we changed the flow in ppusd, Not needed anymore" — indicating the fix was also absorbed into the new prepaid USD flow design.

---

## Story 7 — Security: Removing Hardcoded Credentials from Dashboard Repository
**Amazon LP: Earn Trust | Dive Deep**
**Ticket:** [APIDB-13735](https://jira.vonage.com/browse/APIDB-13735), APIDB-13852, APIDB-13944, APIDB-14078
**GitHub PR:** [APIDB-13852 fix part 1 - secret scan violations (#3710)](https://github.com/vonage-technology/dashboard/pull/3710)

**Situation:** A secret security scan identified 15 places in the dashboard repository where credentials were being leaked — hardcoded in source code and, critically, in git history. This was a serious security vulnerability that could expose production credentials if the repository was ever compromised.

**Task:** I was responsible for remediating all 15 secret scan violations, which required not only removing credentials from the current codebase but also rewriting git history to eliminate them from all historical commits.

**Action:** I worked through each violation systematically. For credentials that were still valid, I invalidated them first, then moved them to AWS Secrets Manager. For credentials only in git history, I used `git filter-branch` / BFG Repo Cleaner to rewrite history and force-pushed the cleaned branches. I raised GitHub issues for each violation (tagged "Secret Scan: violation") and tracked them to closure. I also coordinated with the VRR (Vulnerability Risk Register) team to formally close the security findings.

**Result:** All 15 secret scan violations were remediated. The VRR findings were closed. The dashboard repository was clean of hardcoded credentials, and the team adopted AWS Secrets Manager as the standard for credential storage going forward.

**Learning:** I learned that security remediation in git repositories is significantly harder than in live code — rewriting history requires careful coordination to avoid breaking other developers' branches. I now advocate for secret scanning as a pre-commit hook rather than a post-hoc scan.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The GitHub PR [#3710](https://github.com/vonage-technology/dashboard/pull/3710) addressed Part 1 of the secret scan violations.
* APIDB-13944 specifically addressed fixing the git history — the most technically complex part of the remediation.
* APIDB-14078 was a reopened issue for GitHub-specific violations that required a second pass.
* The work was done in two phases: first fixing the current codebase (Part 1), then cleaning git history (Part 2), to minimise disruption to the team.

---

## Story 8 — SIFT Fraud Integration: Missing Fields & Secondary User Events
**Amazon LP: Dive Deep | Insist on the Highest Standards**
**Ticket:** [APIDB-16622](https://jira.vonage.com/browse/APIDB-16622), [APIDB-17044](https://jira.vonage.com/browse/APIDB-17044), [APIDB-17287](https://jira.vonage.com/browse/APIDB-17287)

**Situation:** Vonage's SIFT fraud integration was missing critical fields (`account_ref`, `fraud_score`, `user_type`, `primary_id`) in the `create_account` events sent to SIFT. This meant SIFT's fraud models were operating with incomplete data, reducing their accuracy. Additionally, secondary users were sending `create_account` events on invite (before they had even accepted), creating phantom users in SIFT and polluting the fraud model.

**Task:** I was responsible for fixing the missing fields in SIFT events for new signups, redesigning the secondary user event flow, and backfilling the missing data for ~190K existing users.

**Action:** I fixed the missing fields in the SIFT `create_account` event payload (APIDB-16622), ensuring `account_ref`, `fraud_score`, `user_type`, and `primary_id` were always populated. For secondary users (APIDB-17044), I redesigned the event trigger to fire only after the user had completed VIAM onboarding and received their CD ID — not on invite. For the backfill (APIDB-17287), I wrote a data extraction script that generated a CSV of all existing users missing these fields, which was then passed to the SIFT team for their backfill process.

**Result:** SIFT's fraud models now received complete, accurate data for all new signups. The secondary user phantom-user problem was eliminated. The backfill CSV was validated by the SIFT team and the ticket was closed with confirmation that the data looked correct.

**Learning:** I learned that fraud system integrations require treating data completeness as a first-class requirement — incomplete data doesn't just cause errors, it silently degrades model accuracy in ways that are hard to detect.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* GitHub commit [82a036b](https://github.com/vonage-technology/dashboard/commit/82a036b055eef482f4d9c6efff) — "APIDB-16622 sift integration missing api events" — added the missing fields to the SIFT event payload.
* The backfill CSV (APIDB-17287) was generated by querying `d_user` and `d_account_billing` tables for users where the SIFT fields were null.
* Jordan Andrews (SIFT team) confirmed: "I checked some of the users on Admin Dashboard, it looks good. I believe we can close this ticket as your part is done."
* Arpit noted: "This ticket has no code changes, only data populated in a csv" — demonstrating pragmatic problem-solving (data fix vs. code fix).

---

## Story 9 — Deutsche Telekom SSO Integration (DT IDP Migration)
**Amazon LP: Customer Obsession | Earn Trust**
**Ticket:** [APIDB-16458](https://jira.vonage.com/browse/APIDB-16458), [APIDB-16483](https://jira.vonage.com/browse/APIDB-16483), [APIDB-16487](https://jira.vonage.com/browse/APIDB-16487), [APIDB-16493](https://jira.vonage.com/browse/APIDB-16493)

**Situation:** Deutsche Telekom (DT), a major Vonage CSP (Communications Service Provider) partner, was migrating to their own Identity Provider (IDP) for SSO. Once migrated, DT would manage the full user lifecycle, meaning Vonage's dashboard should no longer allow users to modify their profile or addresses directly — those actions should redirect to DT's IDP at `https://auth.api.telekom.com/realms/dtmaceretail/account`.

**Task:** I was responsible for implementing the SSO integration changes in the Customer Dashboard: hiding/redirecting My Profile and My Addresses pages for DT users, redirecting user invite emails to the DT IDP, and fixing 2FA phone numbers on affected CSP DT accounts.

**Action:** I modified the hamburger menu navigation to conditionally hide My Profile and My Addresses links for DT-branded users, replacing them with redirects to the DT IDP URL. I updated the user invite email flow (APIDB-16483) to redirect DT users to the DT IDP instead of the standard Vonage onboarding flow. I also fixed 2FA phone numbers on specific CSP DT accounts (APIDB-16493) that had been incorrectly configured. I coordinated directly with the DT team (Nicolas Altrien-Buffaral) to confirm the correct redirect URLs.

**Result:** DT users were seamlessly redirected to their own IDP for profile management, meeting DT's contractual requirement. The invite email flow was updated without disrupting existing DT users. The integration was delivered on schedule for the DT IDP migration go-live.

**Learning:** Working with a major enterprise partner's SSO integration taught me the importance of clear API contracts and redirect URL validation. I also learned to manage stakeholder expectations when requirements evolve mid-sprint (the initial spec changed from "hide pages" to "redirect to DT IDP").

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The DT IDP redirect URL was `https://auth.api.telekom.com/realms/dtmaceretail/account` — confirmed by the DT team after a coordination call.
* The conditional logic used the existing CSP/organisation configuration to identify DT-branded users.
* APIDB-16493 required direct database-level fixes for 2FA phone numbers on specific accounts — a production data fix coordinated with the DT team.
* The EPIC [APIX-1347](https://jira.vonage.com/browse/APIX-1347) (CSP DT domain name change) was the broader context, with Arpit's tickets being the dashboard-side implementation.

---

## Story 10 — Prepaid USD Multi-Currency Launch: Zoho & Email Templates
**Amazon LP: Deliver Results | Think Big**
**Ticket:** [APIX-1516](https://jira.vonage.com/browse/APIX-1516), APIDB-14686, APIDB-14744, APIDB-14950, APIDB-14760, APIDB-15215

**Situation:** Vonage was launching Prepaid USD — a strategic initiative to expand into the US market with local currency support. This required updating the Zoho CRM integration to handle multi-currency accounts, updating all payment email templates to display the correct currency, and ensuring bank transfer details for USD accounts were correctly shown in both QA and production.

**Task:** I was responsible for the Zoho and email template components of the Prepaid USD launch — adding currency to Zoho customer account creation, updating payment email templates, and fixing bank transfer details for USD accounts.

**Action:** I added the `currency` field to the Zoho customer account creation API call (APIDB-14686), ensuring USD accounts were correctly tagged in Zoho from the moment of creation. I updated all payment email templates (APIDB-14744) to include the account currency, so customers received emails showing USD amounts rather than EUR. I deployed the bank transfer details for USD accounts to QA (APIDB-14950) and production (APIDB-14760), and fixed a template mismatch between QA and PROD environments (APIDB-15215) that was causing inconsistent customer communications.

**Result:** The Prepaid USD launch had correct Zoho CRM data and accurate email communications from day one. The template mismatch fix prevented customer confusion about bank transfer details. The Zoho integration supported the multi-currency strategy without requiring manual data correction.

**Learning:** I learned that multi-currency launches have a long tail of integration points — CRM, email templates, bank transfer details — each of which can independently cause customer confusion if not updated. I now advocate for a "currency audit" checklist for any new currency rollout.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The Zoho API call was updated to pass `currency: "USD"` in the account creation payload, using the existing `AccountCurrencyCache` (which was also refactored in APIDB-15310).
* Email templates were updated in the `notification-templates` repository to conditionally display the currency symbol based on the account's currency field.
* The QA/PROD template mismatch (APIDB-15215) was caused by a deployment ordering issue — the QA templates had been updated but the PROD deployment had used an older template version.
* The `AccountCurrencyCache` refactor (APIDB-15310) was done in parallel to ensure the cache correctly reflected USD accounts before the USD deploy.

---

## Story 11 — Compliance: Blocking Sanctioned Countries for Payments & Addresses
**Amazon LP: Insist on the Highest Standards | Earn Trust**
**Ticket:** [APIDB-15482](https://jira.vonage.com/browse/APIDB-15482), [APIDB-15483](https://jira.vonage.com/browse/APIDB-15483)

**Situation:** Vonage's payment method and service address forms were allowing users to select sanctioned countries (Russia, Syria, Iran, Cuba, North Korea, China, Hong Kong, Macau) — a direct violation of US CFIUS regulations and Vonage's internal compliance policies. This was a legal and regulatory risk that needed immediate remediation.

**Task:** I was responsible for implementing country-level blocking on both the payment method form and the service address form to prevent users from selecting sanctioned countries.

**Action:** I implemented a server-side validation layer in the dashboard backend that checked the selected country against a configurable sanctioned-countries list before allowing the form submission. I also added frontend validation to provide immediate feedback to users. The sanctioned countries list included Russia, Syria, Iran, Cuba, North Korea, China (CFIUS), Hong Kong (CFIUS), and Macau. I added Ireland (IE) as a test-only banned country in QA (with a note to revert before PROD deployment) to validate the blocking logic without using real sanctioned countries.

**Result:** Both the payment method and service address forms were compliant with CFIUS regulations and Vonage's internal policies. The fix was deployed to production, eliminating the regulatory risk. The configurable country list allowed future updates without code changes.

**Learning:** Compliance requirements often have tight deadlines and zero tolerance for errors. I learned to use test-only configurations (like the IE test country) to validate blocking logic safely in QA without risking false positives in production.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The sanctioned countries list was stored in the dashboard configuration service, making it updatable without a code deployment.
* The backend validation was added to both the `PaymentMethodController` and the `ServiceAddressController`.
* The frontend validation used the same country list via an API call, ensuring consistency between client and server validation.
* APIDB-15482 (payment method) was 8 story points; APIDB-15483 (service address) was 5 story points — reflecting the additional complexity of the payment method form.

---

## Story 12 — Lifecycle Events Architecture: Account Billing, User Finance, Company Events
**Amazon LP: Think Big | Dive Deep**
**Ticket:** [APIDB-12324](https://jira.vonage.com/browse/APIDB-12324), [APIDB-12178](https://jira.vonage.com/browse/APIDB-12178), [APIDB-10625](https://jira.vonage.com/browse/APIDB-10625), [APIDB-10804](https://jira.vonage.com/browse/APIDB-10804)
**Confluence:** [LifeCycle Events](https://confluence.vonage.com/display/DAS/LifeCycle+Events)

**Situation:** Vonage's downstream systems (VServices, billing, analytics) were tightly coupled to the dashboard's internal Volga events for account state changes. This created fragile dependencies and made it impossible for downstream teams to evolve independently. The architecture needed a clean, versioned event contract.

**Task:** I was part of the team responsible for designing and implementing the Lifecycle Events architecture — a new set of Kafka events published to the Hermes cluster that downstream systems could consume independently. I specifically owned the Account Billing, User Finance, and Company lifecycle events.

**Action:** For Account Billing (APIDB-12324), I created a new Kafka topic (`service_dashboard-account_billing_lifecycle_events`), defined the event schema with `billing_type` and `payment_type` fields, and replaced the existing Volga listener with a new lifecycle event publisher. For User Finance (APIDB-12178), I created the corresponding event for user finance state changes. For Company events (APIDB-10625), I created lifecycle events for company create and update, updating `d_user_search` via `userSearchService.saveOrUpdate`. I also enriched existing events with more fields (APIDB-10804) based on downstream team feedback.

**Result:** Downstream systems could now consume clean, versioned lifecycle events from the Hermes cluster without depending on Vonage's internal Volga events. The VServices team was able to decouple their billing integration. The lifecycle events became the standard integration pattern for all new downstream consumers.

**Learning:** Designing event schemas is harder than it looks — you need to think about backward compatibility, versioning, and what downstream consumers will need in 2 years, not just today. I learned to involve downstream teams in schema design from the start.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* `AccountBillingLifeCycleEvent.java` was added to the `customer-dashboard` module with fields: `type`, `account_ref`, `oldValue`, `newValue`, `billing_type`, `payment_type`.
* The Confluence [LifeCycle Events](https://confluence.vonage.com/display/DAS/LifeCycle+Events) page documents the full event catalogue — Arpit contributed the Account Billing, User Finance, and Company sections.
* The `SubAccountListener` was refactored (APIDB-11315) to centralise account lifecycle event publishing, replacing scattered event publishing across multiple services.
* JSON schema generation for lifecycle events was explored (APIDB-12721) to provide a formal contract for downstream consumers.

---

## Story 13 — User Service: PATCH Endpoint & Client Library
**Amazon LP: Invent and Simplify | Dive Deep**
**Ticket:** [APIDB-12934](https://jira.vonage.com/browse/APIDB-12934), [APIDB-13080](https://jira.vonage.com/browse/APIDB-13080)

**Situation:** The User Service only supported full PUT updates for user records. This caused a critical bug: when the dashboard read a user from cache (which might be stale) and then updated a single field (e.g., setting status to `SUSPENDED`), it would overwrite other fields like `accountRef` with stale values, causing data corruption.

**Task:** I was responsible for creating a new PATCH endpoint in the User Service that allowed partial updates — updating only the specified fields without affecting others — and then integrating it into the dashboard.

**Action:** I implemented a PATCH endpoint in the `UserController` using JSON Patch (RFC 6902), which allowed callers to specify exactly which fields to update. I created a client library for the new endpoint and published it to Artifactory (APIDB-12934). I then integrated the PATCH endpoint into the dashboard (APIDB-13080), replacing the problematic full-update calls in the user suspension flow with targeted PATCH calls.

**Result:** The data corruption bug caused by stale cache reads was eliminated. The PATCH endpoint became the standard for all partial user updates, reducing the risk of unintended field overwrites across the codebase.

**Learning:** I learned that API design decisions (PUT vs. PATCH) have real downstream consequences for data integrity. The lesson was to always use the most specific operation available — PATCH for partial updates, PUT only for full replacements.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The PATCH endpoint used `JsonPatch` library for RFC 6902 compliance, allowing operations like `replace`, `add`, `remove` on individual user fields.
* Arpit commented in the ticket: "client library created here, link to artifactory here" — confirming the library was published and available for dashboard consumption.
* The integration in APIDB-13080 replaced the `updateUser` call in the suspension flow with `patchUser`, passing only the `status` field.
* The fix also addressed the `UserFinance not found` log errors (APIDB-12586) that were a symptom of the same stale-cache issue.

---

## Story 14 — Security: XSS Vulnerability Remediation (Reflected XSS & JSONP)
**Amazon LP: Insist on the Highest Standards | Earn Trust**
**Ticket:** [APIDB-11309](https://jira.vonage.com/browse/APIDB-11309), [APIDB-13621](https://jira.vonage.com/browse/APIDB-13621), [APIDB-13666](https://jira.vonage.com/browse/APIDB-13666)

**Situation:** A security researcher reported a Reflected XSS vulnerability on `https://rest.nexmo.com/` via an unsanitised `callback` parameter in the JSONP endpoint. The PoC demonstrated that visiting a crafted URL could execute arbitrary JavaScript in the victim's browser. A separate XSS-to-ATO (Account Takeover) vulnerability was also identified via a password manager on the same domain.

**Task:** I was responsible for remediating the JSONP callback validation vulnerability and the XSS-to-ATO issue, ensuring the endpoints were hardened against injection attacks.

**Action:** For the JSONP endpoint (APIDB-13666), I implemented strict alphanumeric validation on the `callback` parameter, rejecting any value containing HTML/JavaScript characters. For the XSS-to-ATO issue (APIDB-13621), I implemented Content Security Policy (CSP) headers and input sanitisation on the affected password manager integration point. I tested the fixes against the original PoC payloads to confirm remediation.

**Result:** Both vulnerabilities were remediated and verified. The security findings were closed in the VRR. The JSONP endpoint now rejects malformed callback parameters with a 400 error, preventing the XSS attack vector.

**Learning:** Security vulnerabilities in public-facing APIs require both input validation and output encoding — fixing one without the other leaves the door open. I also learned the value of testing fixes against the original PoC, not just unit tests.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The JSONP PoC URL was: `https://rest.nexmo.com/pricing/NO/jsonp?callback=<img src=x onerror=alert(document.domain)>aaaaa`
* The fix validated the `callback` parameter against a regex `^[a-zA-Z0-9_\.]+$` before including it in the response.
* The XSS-to-ATO (APIDB-13621) was a more complex attack chain involving a password manager autofill that could be triggered by a malicious page.
* Both fixes were deployed to production and the VRR findings were formally closed.

---

## Story 15 — CD Failover Testing & Health Check Infrastructure
**Amazon LP: Dive Deep | Bias for Action**
**Ticket:** [APIDB-16351](https://jira.vonage.com/browse/APIDB-16351), APIDB-16529, APIDB-16539, APIDB-16540
**Confluence:** [Test CD Failover across regions](https://confluence.vonage.com/display/DAS/Test+CD+Failover+across+regions)

**Situation:** An architecture review revealed that although the Customer Dashboard was deployed to multiple AWS regions and AZs, there was no documented failover procedure and no regular validation that failover actually worked. In the event of a regional outage, the team would have no tested playbook to follow.

**Task:** I was responsible for defining the failover testing procedure, implementing the infrastructure to support it (including a new failover toggle endpoint), and validating failover in both QA and production environments.

**Action:** I created a new `DashboardHealthCheckController` with a `/api/internal/failover` endpoint that toggled a region-level failover flag stored in the regional cache (keys: `failover-eu-west-1` and `failover-eu-central-1`). I also added a `/api/internal/ping` endpoint for health checks. I documented the full failover testing procedure in Confluence (APIDB-16351), then validated it in QA with the regional cache and Jenkins pipeline (APIDB-16529), in QA with APIGW (APIDB-16539), and finally in production with APIGW (APIDB-16540).

**Result:** The team now had a tested, documented failover procedure. The failover toggle could be activated in under 5 minutes, and the health check endpoint provided accurate service status for load balancer routing decisions.

**Learning:** Resilience engineering is not just about building redundancy — it's about regularly testing that the redundancy actually works. I learned that untested failover procedures are almost as bad as no failover procedure.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The failover flag was stored in the regional Redis cache with keys `failover-eu-west-1` and `failover-eu-central-1`, allowing region-specific failover without affecting other regions.
* The `DashboardHealthCheckController` was added to the `customer-dashboard` module and exposed via the internal API gateway.
* The Jenkins pipeline test (APIDB-16529) validated that the cache correctly propagated the failover flag across all instances in the region.
* The production test (APIDB-16540) was done during a low-traffic window with the on-call team standing by.

---

## Story 16 — Sigma Prime: Internal Payment Search Endpoints for Admin Migration
**Amazon LP: Customer Obsession | Invent and Simplify**
**Ticket:** [APIDB-16561](https://jira.vonage.com/browse/APIDB-16561), [APIDB-15536](https://jira.vonage.com/browse/APIDB-15536)

**Situation:** The Admin Dashboard's payment search functionality needed to be migrated to Sigma Prime (an internal admin tool). However, the existing `/api/v1/payments/*` endpoints required a user JWT and could not be called via service-to-service authentication. Additionally, suspended accounts (e.g., due to the China exit) could not log in to delete their saved payment methods, requiring manual database-level deletions by the support team.

**Task:** I was responsible for creating internal endpoints for Sigma Prime that could query the `d_topup_transaction` table via service-to-service auth, and for implementing a secure Get/Delete payment methods endpoint for admin use.

**Action:** For APIDB-16561, I created `GET /api/internal/v1/payments/search` with parameters for `accountRef`, `startDate`, `endDate`, and optional `paymentMethod`, returning paginated results with HATEOAS links. For APIDB-15536, I implemented `GET /api/internal/v1/payment-methods/{accountRef}` with validation (prepaid only, no sub-accounts, no auto-reload), proper audit logging (which admin performed the action, which payment methods were affected), and appropriate error responses.

**Result:** Sigma Prime could now query payment transactions without requiring user JWTs, enabling the Admin Dashboard migration. Support teams could delete payment methods for suspended accounts without manual database intervention, eliminating a class of support tickets.

**Learning:** Internal APIs require the same rigour as external APIs — proper authentication, validation, audit logging, and error handling. I learned to treat internal consumers as first-class API clients.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The internal payment search endpoint used service-to-service JWT authentication via the internal API gateway.
* Pagination used HATEOAS links (`self`, `first`, `last`, `next`) for consistent navigation.
* The payment methods endpoint validated: account must be prepaid, must not be a sub-account, must not have auto-reload enabled.
* Audit logs recorded: admin user ID, timestamp, account ref, and list of deleted payment method tokens.

---

## Story 17 — Mend/Prisma Security Vulnerability Remediation Programme
**Amazon LP: Insist on the Highest Standards | Deliver Results**
**Ticket:** APIDB-15615, APIDB-15630, APIDB-15004, APIDB-15683, APIDB-15733, APIDB-13910, APIDB-15002, APIDB-15291

**Situation:** Vonage's security scanning tools (Mend and Prisma) were flagging critical and high vulnerabilities in the `user-service` and `dashboard` repositories. The `user-service` was in the top 10 most vulnerable services in the organisation. Unaddressed vulnerabilities created compliance risk and potential attack surface.

**Task:** I took ownership of the security vulnerability remediation programme for both `user-service` and `dashboard`, systematically addressing critical dependencies including `spring-beans`, `kafka-clients`, `embedded-redis`, `jetty`, `h2`, `c3p0`, `zookeeper`, `python`, and `tomcat`.

**Action:** I worked through each vulnerability systematically: upgrading `spring-beans` (APIDB-15615), `kafka-clients` (APIDB-15630), `embedded-redis` (APIDB-15004), `jetty` (APIDB-15683), `h2` (APIDB-15733), `c3p0` (APIDB-13910), and `zookeeper` (APIDB-13994) in `user-service`. For `dashboard`, I addressed `python` and `tomcat` (APIDB-15291) and fixed direct dependencies (APIDB-15003). I also fixed ignored JUnit tests (APIDB-15474) that were masking test failures.

**Result:** The `user-service` was removed from the top 10 most vulnerable services list. The team achieved the KTLO (Keep The Lights On) target for Mend vulnerability reduction. Both services maintained 90%+ code coverage (above the standard 80% target).

**Learning:** Security debt compounds — each deferred upgrade makes the next one harder. I learned to treat dependency upgrades as regular maintenance rather than one-off projects, and to use the Mend SPOG (Single Pane of Glass) dashboard for prioritisation.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `spring-beans` upgrade (APIDB-15615) required careful testing as it was a transitive dependency affecting multiple Spring Boot components.
* `embedded-redis` (APIDB-15004) was replaced with a test container approach to avoid the embedded Redis vulnerability.
* The Prisma scan improvements (APIDB-15002, APIDB-15291) involved updating Docker base images to remove OS-level vulnerabilities.
* Arpit's 2025 personal objectives explicitly tracked: "user-service no longer in top 10 list of most vulnerable services" as a key metric.

---

## Story 18 — Kafka Consumer Group UUID Fix (Production Lag Alert)
**Amazon LP: Dive Deep | Bias for Action**
**Ticket:** [APIDB-14429](https://jira.vonage.com/browse/APIDB-14429)

**Situation:** The Clear Cache Event Listener in the Customer Dashboard was generating a new UUID as its Kafka consumer group ID on every restart. This meant each restart created a new consumer group, leaving the old one stale and triggering Kafka lag alerts in production — even though no messages were actually lagging. The operations team was receiving false-positive alerts, eroding trust in the alerting system.

**Task:** I was responsible for fixing the consumer group ID generation to be stable across restarts, eliminating the false-positive lag alerts.

**Action:** I investigated the `ClearCacheEntryKafkaListenerConfiguration` and found the group ID was generated as a random UUID at startup. I changed the group ID generation to use the allocation ID or host IP, ensuring that restarting an allocation would recreate the same group ID. I tested this in the canary instance by restarting the allocation and verifying that the Kafka lag returned to zero (rather than creating a new stale group). I also updated the Grafana alert to exclude the old group ID during the transition period.

**Result:** Kafka lag alerts were no longer triggered by service restarts. The operations team's alert fatigue was reduced. The fix also improved the accuracy of Kafka lag monitoring across the dashboard services.

**Learning:** Alert fatigue is a real operational risk — when alerts fire too often for non-issues, teams start ignoring them. I learned to treat false-positive alerts with the same urgency as real incidents.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The group ID was changed from `UUID.randomUUID().toString()` to `"clear-cache-" + System.getenv("ALLOCATION_ID")` (with a fallback to hostname).
* The log line `"[clearCacheEntryKafkaEventListener] Initializing clear cache kafka consumer factory with group ID:"` was used to verify the fix in QA.
* The Grafana alert exclusion (APIDB-12037) was a temporary measure during the transition, later removed once all instances had the new group ID.
* The `clean_kafka_topics.sh` script was also updated to handle the new stable group ID format.

---

## Story 19 — DevRel Pricing API: Multi-Currency vPricing Migration
**Amazon LP: Think Big | Customer Obsession**
**Ticket:** [APIDB-14896](https://jira.vonage.com/browse/APIDB-14896)

**Situation:** As part of the Prepaid USD / multi-currency strategy, Vonage was migrating pricing management to a new system called vPricing. Customers who had been migrated to vPricing needed to receive appropriate error responses from the existing DevRel Pricing API, rather than incorrect pricing data from the old system.

**Task:** I was responsible for modifying the DevRel Pricing API endpoints to detect whether a customer had been migrated to vPricing (via the PHub capability `rtc-voice-enable-vpricing`) and return the correct HTTP response codes accordingly.

**Action:** I implemented a capability check in the API gateway routing layer that queried PHub for the `rtc-voice-enable-vpricing` capability. Based on the customer's migration status and the specific endpoint called, I returned the appropriate HTTP status codes: 406 (Not Acceptable) for endpoints not supported for vPricing customers, 403 (Forbidden) for endpoints where the customer lacked the required capability, and 200 for supported endpoints. I implemented this across all `get-pricing` and `get-prefix-pricing` endpoint variants.

**Result:** vPricing customers received clear, actionable error responses instead of incorrect pricing data. The API gateway correctly routed requests based on migration status, supporting the phased rollout of vPricing without breaking existing integrations.

**Learning:** API versioning and migration strategies require careful thought about backward compatibility. I learned to use capability flags as a clean mechanism for feature gating during migrations, rather than version-based routing.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The GitHub PR [APIDB-14896 devrel pricing api modifications](https://github.com/vonage-technology/dashboard/pull/...) implemented the capability check in the API gateway.
* The response code matrix was: `get-pricing/outbound` → 406 (vPricing), 403 (no voice), 403 (no SMS); `get-pricing/outbound/sms` → 406, 200, 403; `get-pricing/outbound/voice` → 406, 403, 200.
* The PHub capability check used the existing `PlatformHubClient` (FeignClient) to query the `rtc-voice-enable-vpricing` capability.

---

## Story 20 — User Service Migration to New Artifactory
**Amazon LP: Deliver Results | Bias for Action**
**Ticket:** [APIDB-14181](https://jira.vonage.com/browse/APIDB-14181), APIDB-14230, APIDB-14227, APIDB-14938, APIDB-14269

**Situation:** Vonage was migrating its artifact repository from the old Artifactory instance to a new one (`vonagecc`). The `user-service` and its client library needed to be migrated to fetch dependencies from and publish to the new Artifactory, while the `dashboard` needed to be updated to consume the new client library version.

**Task:** I was responsible for the end-to-end migration of the `user-service` to the new Artifactory, including upgrading the Gradle wrapper, updating dependency resolution, publishing the new client library, and updating the dashboard to consume it.

**Action:** I upgraded the Gradle wrapper version in `user-service` (APIDB-14227) — a prerequisite for publishing to the new Artifactory. I updated the dependency resolution configuration to fetch from the new Artifactory (APIDB-14230). I published the updated `us-client` library to the new Artifactory. I then updated the `dashboard` to consume the new `us-client` from the new Artifactory (APIDB-14269), and updated the Admin Dashboard (AD) similarly. I also created a transitional step (APIDB-14938) where the dashboard consumed the updated `us-client` from the old Artifactory during the migration window.

**Result:** The `user-service` and its client library were successfully migrated to the new Artifactory. The dashboard and Admin Dashboard were updated to consume the new library. The old Artifactory dependency was fully removed.

**Learning:** Dependency migrations require careful sequencing — you can't update the consumer before the producer has published to the new location. I learned to use transitional steps (consuming from old Artifactory while publishing to new) to avoid breaking the build pipeline.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The Gradle wrapper upgrade (APIDB-14227) was from Gradle 6.x to 7.x, which required updating several deprecated API usages in the build scripts.
* The `us-client` library version was bumped to signal the Artifactory migration to consumers.
* GitHub workflows were updated (as noted in Arpit's 2025 objectives) to use the new Artifactory credentials from AWS Secrets Manager.

---

## Story 21 — OneTrust Cookie Banner Migration (GDPR Compliance)
**Amazon LP: Insist on the Highest Standards | Customer Obsession**
**Ticket:** [APIDB-12921](https://jira.vonage.com/browse/APIDB-12921), [APIDB-14215](https://jira.vonage.com/browse/APIDB-14215)

**Situation:** Vonage's Customer Dashboard was using an old version of the OneTrust cookie banner served via Google Tag Manager (GTM). The company needed to migrate to a new script managed by Adobe Tag Manager, and the old GTM code needed to be removed. This was a GDPR compliance requirement affecting all dashboard variants (Vonage, DT, Optus).

**Task:** I was responsible for implementing the new OneTrust cookie banner in QA (APIDB-12921) and then removing the old GTM code from the frontend after the new banner went live in production (APIDB-14215).

**Action:** I worked with Greg Frileux to remove the old cookie banner in QA and implement the new Adobe Tag Manager script. I developed a strategy for handling multiple CSP variants (Vonage, DT, Optus) — each required a different OneTrust configuration. I coordinated with Eeshat Gupta to determine the correct handling for each CSP. Once the new banner was validated in production, I removed all GTM code from the CD frontend (APIDB-14215).

**Result:** The Customer Dashboard was compliant with the new OneTrust cookie banner standard across all CSP variants. The old GTM code was fully removed, reducing the frontend bundle size and eliminating the dependency on the legacy cookie management system.

**Learning:** GDPR compliance changes in multi-tenant systems (multiple CSPs) require careful per-tenant configuration management. I learned to treat each CSP as a separate deployment target with its own compliance requirements.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The OneTrust script was loaded conditionally based on the CSP configuration, with different OneTrust domain IDs for Vonage, DT, and Optus.
* The GTM removal (APIDB-14215) required auditing all GTM-dependent analytics events to ensure they were migrated to the new Adobe Tag Manager before removal.
* The `legal links` feature (APIDB-13818) was implemented in parallel, adding a dedicated legal links section to the dashboard footer.

---

## Story 22 — 10DLC Campaign Management: Full Feature Delivery
**Amazon LP: Customer Obsession | Deliver Results**
**Ticket:** APIDB-10220, APIDB-10160, APIDB-10309, APIDB-9424, APIDB-9999, APIDB-10083, APIDB-10225, APIDB-10050

**Situation:** The US 10DLC (10-Digit Long Code) campaign registration system was a new regulatory requirement for SMS messaging in the US. Vonage needed to implement a full campaign management UI in the Customer Dashboard, including campaign creation, editing, deactivation, and compliance with TCR (The Campaign Registry) requirements.

**Task:** I was responsible for implementing multiple features and bug fixes across the 10DLC campaign management UI, including terms and conditions, subscriber opt-out handling, campaign filtering, and various bug fixes.

**Action:** I implemented the Campaign Terms and Conditions acceptance flow (APIDB-9424), ensuring the `tc_agree` boolean was correctly populated in the POST API call to TenDLC (APIDB-9999). I fixed the subscriber opt-out attribute for 2FA campaigns (APIDB-10160, APIDB-10309), which was mandatory but not being set. I implemented campaign filtering for expired 10DLC campaigns (APIDB-10220). I fixed the campaign description validation (APIDB-10225), the TCR alphanumeric field validation (APIDB-10083), and the numbers list refresh bug (APIDB-10050). I also added a note on the brands page about vetting requirements (APIDB-8267).

**Result:** The 10DLC campaign management feature was delivered with full compliance with TCR requirements. The subscriber opt-out fix ensured Vonage's customers were compliant with US SMS regulations. The UI bugs were resolved, improving the campaign creation success rate.

**Learning:** Regulatory compliance features (10DLC, GDPR) require close collaboration with legal and compliance teams to understand the exact requirements. I learned that "mandatory field" in a regulatory context means zero tolerance for omission — the fix had to be retroactive for existing campaigns.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `tc_agree` field (APIDB-9999) was a boolean that had to be `true` for the TCR API to accept the campaign creation request.
* The subscriber opt-out fix (APIDB-10309) required updating existing 2FA campaigns in the database to set the opt-out attribute retroactively.
* The campaign filtering (APIDB-10220) used the campaign status and expiry date to hide expired campaigns from the active list.
* A stuck campaign (APIDB-10467) at `CARRIERS_REVIEW` status was investigated and resolved by triggering a manual status refresh via the TenDLC API.

---

## Story 23 — SSM Port-Forward & RDS Connectivity Infrastructure
**Amazon LP: Invent and Simplify | Dive Deep**
**Ticket:** APIDB-16150, APIDB-16152, APIDB-16182, APIDB-16181, APIDB-16180

**Situation:** After Vonage's migration to AWS, developers and QA tests needed to connect to RDS databases in the private VPC. The existing approach used direct localhost connections that no longer worked in the new AWS environment, breaking local development and QA test runs.

**Task:** I was responsible for implementing SSM (AWS Systems Manager) port-forwarding scripts and updating all services to use the new connectivity approach.

**Action:** I created `connect_cd_rds_proxy.sh` and `connect_user_rds_proxy.sh` scripts that used AWS SSM Session Manager to establish port-forward tunnels to the RDS instances. I updated the `dashboard-developer-gateway` (APIDB-16150), `dashboard` (APIDB-16152), `qatests_dashboard` (APIDB-16182), `admin-dashboard` (APIDB-16181), and `user-service` (APIDB-16180) to use the new SSM port-forward approach instead of direct localhost connections. I also updated the Admin Dashboard README with instructions for running locally with the new setup.

**Result:** All services could connect to RDS in the AWS environment. QA tests ran successfully with the new connectivity approach. The SSM port-forward scripts became the standard tool for local development database access across the team.

**Learning:** Infrastructure changes (like moving to AWS private VPCs) have a long tail of developer tooling impacts. I learned to proactively audit all localhost/direct connection references when migrating to a new network topology.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `connect_cd_rds_proxy.sh` script used `aws ssm start-session --target <instance-id> --document-name AWS-StartPortForwardingSessionToRemoteHost` to tunnel RDS traffic through SSM.
* The `port-forward.sh` script was also created as a general-purpose port-forwarding utility.
* The `db_user` tickets (APIDB-8010, APIDB-8012, APIDB-8014, APIDB-8429) from 2022 were the earlier phase of this work — creating dedicated DB users for each service.
* Arpit's 2025 objectives noted "ssm-port-forward" as a key infrastructure improvement delivered.

---

## Story 24 — Verify Logs Page: New Feature Delivery
**Amazon LP: Customer Obsession | Deliver Results**
**Ticket:** [APIDB-7906](https://jira.vonage.com/browse/APIDB-7906), [APIDB-8018](https://jira.vonage.com/browse/APIDB-8018)

**Situation:** Vonage customers using the Verify API had no way to view their verification logs directly in the Customer Dashboard. They had to contact support or use the API directly to debug verification failures, creating unnecessary support overhead and a poor developer experience.

**Task:** I was responsible for implementing the Verify Logs page in the Customer Dashboard — a new feature allowing customers to search, filter, and view their Verify API transaction logs directly in the UI.

**Action:** I implemented the full Verify Logs page, including the search form (with date range, request ID, and status filters), the results table, and the log detail view. I integrated with the backend Verify logs API, handling pagination and date validation (`date_start must be in the past` — APIDB-11755). I also fixed the SMS Logs download issue (APIDB-11976) and the missing `date_start` for `SMS_WEBHOOK` (APIDB-12045) as related improvements to the logs infrastructure.

**Result:** Customers could now self-serve their Verify API debugging without contacting support. The Verify Logs page reduced support tickets related to Verify API debugging. The feature was validated with QA tests (`VerifyLogSearchNew.spec.js`).

**Learning:** Developer-facing features require thinking about the debugging workflow — what information does a developer need when a verification fails? I learned to design log views around the most common debugging scenarios rather than just exposing raw data.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `VerifyLogSearchNew.spec.js` test file was added to `qatests_dashboard` to cover the new Verify Logs page.
* The date validation (`date_start must be in the past`) was implemented both client-side and server-side to prevent invalid API calls.
* The SMS Logs download fix (APIDB-11976) was a related improvement that fixed a broken CSV export for SMS logs.
* The `Hide Pricing Details - Verify Logs` ticket ensured pricing information was not exposed in the Verify Logs view for non-authorised users.

---

## Story 25 — Organisation Configuration Migration to Config Service
**Amazon LP: Think Big | Invent and Simplify**
**Ticket:** [APIDB-12995](https://jira.vonage.com/browse/APIDB-12995), [APIDB-12871](https://jira.vonage.com/browse/APIDB-12871), [APIDB-14388](https://jira.vonage.com/browse/APIDB-14388)

**Situation:** Organisation-specific configuration (CSP branding, feature flags, domain settings) was hardcoded in the dashboard codebase and Puppet configuration. This made it difficult to update configuration without a code deployment, and the configuration was scattered across multiple repositories. The domain name change for DT (APIX-1347) highlighted the fragility of this approach — updating a domain required changes in Zuora, Sift, marketplace, and multiple code repositories.

**Task:** I was responsible for migrating organisation configuration to a centralised Config Service, and for coordinating the domain name change across all dependent systems.

**Action:** I migrated the organisation configuration from hardcoded values to the Config Service (APIDB-12995, APIDB-12871), creating a clean API for retrieving CSP-specific configuration at runtime. For the DT domain name change (APIDB-14388), I coordinated updates across Zuora (callback URL — APIDB-13289), marketplace links (APIDB-13288), and Sift (callback URL — APIDB-13278), ensuring all systems were updated atomically. I also updated the `organisation configuration` to point to the new domain.

**Result:** Organisation configuration was centralised in the Config Service, enabling configuration updates without code deployments. The DT domain name change was completed across all dependent systems without service disruption.

**Learning:** Configuration management is an architectural concern, not just an operational one. I learned that scattered configuration creates hidden dependencies that only become visible during changes — centralising configuration early prevents this technical debt from compounding.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The Config Service used a key-value store with organisation ID as the primary key, allowing per-CSP configuration overrides.
* The DT domain change required coordinated updates in 4 external systems (Zuora, Sift, marketplace, dashboard) — Arpit coordinated the sequencing to avoid callback failures during the transition.
* The `Move organisation configuration to config service` tickets (APIDB-12995, APIDB-12871) were done in two phases to allow incremental migration without breaking existing functionality.
* The `Profile Prefix Cacheable` improvement (APIDB-12764) was a related optimisation that reduced Config Service call volume by caching profile prefix lookups.

---


---

## Story 26 — VIES Integration: EU VAT ID Validation FeignClient (Phase 1)
**Amazon LP: Insist on the Highest Standards | Customer Obsession**
**Ticket:** [APIDB-15546](https://jira.vonage.com/browse/APIDB-15546)
**Parent EPIC:** [APIDB-15464](https://jira.vonage.com/browse/APIDB-15464)

**Situation:** Vonage's Customer Dashboard allowed users to enter any VAT ID on the My Service Address page with no validation whatsoever. For EU businesses, an incorrect or fraudulent VAT ID directly affects whether VAT is charged — a valid EU VAT ID triggers tax exemption under EU reverse-charge rules. This was a compliance and revenue risk: customers could enter invalid VAT IDs to avoid paying VAT, and Vonage had no audit trail. The VIES (VAT Information Exchange System) — the EU's official VAT validation service — was available as a public API but had not been integrated.

**Task:** I was responsible for the full backend integration of VIES into the dashboard's company profile edit flow (Phase 1), and then for surfacing the VAT ID validation status on the postpaid My Address page via BSS/vAccount integration (Phase 2).

**Action:** For Phase 1 (APIDB-15546), I built a new `ViesClient` FeignClient against the EU Commission's public VAT validation API (`https://ec.europa.eu/taxation_customs/vies/`), with proper metrics integration, retry logic, and graceful degradation (any API error must not break the existing company edit flow — the endpoint still returns HTTP 200). I implemented a static list of the 26 applicable EU countries and a four-state `vatIdValidationStatus` enum: `NOT_APPLICABLE` (country not in list), `SAME_AS_EXISTING` (VAT ID unchanged — skip the API call), `VALID_VAT_ID`, and `INVALID_VAT_ID`. I added a QA bypass so nightlies would not call the live VIES API. I added the `vatIdValidationStatus` field to the `edit-company` API response (`/api/v1/edit-profile/company`). For Phase 2 (APIDB-16117), I integrated with the BSS endpoint `GET /NEXMO/account/{account_id}/v1/detail` to read the `taxInfo.exemptStatus` field and display the validated/unvalidated status on the postpaid read-only My Address page, gated behind the `vies-validation` feature flag. When a regression in the page redesign dropped the validation status display (APIDB-17132), I diagnosed the root cause — the `vatStatusLabel` component was placed in the edit-form branch of the Angular template, which never mounted for users with a saved address (who always see the summary/read-only view) — and fixed the misplaced template code.

**Result:** Vonage's dashboard now validates EU VAT IDs against the official VIES registry at the point of entry, providing an audit trail of validation status for compliance and finance teams. Postpaid customers can see their VAT ID validation status directly on their My Address page. The graceful degradation design ensured zero customer-facing disruption even when the VIES API was intermittently unavailable.

**Learning:** Integrating with a third-party government API taught me to design for unreliability from the start — the VIES API documentation explicitly warns of downtime, so the "never break the existing flow" requirement was non-negotiable. I also learned that feature flags are essential for compliance features that affect billing, as they allow controlled rollout and instant rollback.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `ViesClient` FeignClient used the EU Commission's Swagger-documented API (`swagger_publicVAT.yaml`) with a configurable timeout and retry policy (3 retries with exponential backoff).
* The 26 applicable EU countries were stored as a static `Set<String>` in a configuration class, making it easy to update without a code change.
* The `SAME_AS_EXISTING` status was a key optimisation — if the user submits the same VAT ID they already have on file, the VIES API call is skipped entirely, reducing unnecessary external API calls.
* Metrics were added to track VIES API call success/failure rates in Grafana, enabling monitoring of VIES availability.
* The Phase 2 bug fix (APIDB-17132) was diagnosed by Arpit: "The root cause was simply misplaced code. `vatStatusLabel` was in the edit form branch of the template — edit form instead of summary view. That's all it was." — a clean, precise root-cause analysis under pressure.
* The GitHub release commit [b422ef3](https://github.com/vonage-technology/dashboard/commit/b422ef39f73cc5cf8ed6f9d16e) — "Release 1477: APIDB-15546 Add VATID validation of specific EU countries" — confirms the production deployment.

---


---

## Story 27 — VAT ID Validation Status: BSS Integration & Postpaid My Address Page (Phase 2)
**Amazon LP: Customer Obsession | Dive Deep**
**Ticket:** [APIDB-16117](https://jira.vonage.com/browse/APIDB-16117), [APIDB-17132](https://jira.vonage.com/browse/APIDB-17132)

**Situation:** Following the Phase 1 VIES integration (Story 26), which validated VAT IDs at the point of entry for prepaid users, Phase 2 extended this to postpaid customers. Postpaid customers have a read-only My Address page (they cannot edit their address directly in the dashboard), but they needed to be able to see whether their VAT ID had been validated or not — a key transparency requirement for EU business customers who rely on VAT exemption status for their invoicing. The validation status was available in the BSS system via the `taxInfo.exemptStatus` field, but was not surfaced in the dashboard UI.

**Task:** I was responsible for reading the VAT ID validation status from the BSS endpoint and displaying it on the postpaid My Address page, gated behind the `vies-validation` feature flag. I was also responsible for diagnosing and fixing a regression where a page redesign inadvertently dropped the validation status display.

**Action:** I integrated with the existing BSS endpoint `GET /NEXMO/account/{account_id}/v1/detail` to read `taxInfo.exemptStatus` and mapped it to a UI-friendly validated/unvalidated label on the postpaid My Address page. The feature was gated behind the `vies-validation` feature flag to allow controlled rollout. When a subsequent page redesign (by another team member) inadvertently dropped the validation status display (APIDB-17132), I was assigned to investigate. I traced the issue to the Angular template structure: the `vatStatusLabel` component had been placed inside the edit-form branch of the template, which never mounts for users with a saved address (who always see the read-only summary view). I moved the component to the summary view branch and raised the fix PR ([#2809](https://github.com/vonage-technology/dashboard-frontend/pull/2809)).

**Result:** Postpaid customers could now see their VAT ID validation status (validated/unvalidated) directly on their My Address page when the feature flag was enabled. The regression was diagnosed and fixed within the same day it was reported. The fix was clean and surgical — no other functionality was affected.

**Learning:** Feature flags are only as good as the regression testing that covers them. The redesign regression happened because the new page design was not tested with the `vies-validation` flag enabled. I learned to add feature-flag-specific test cases to the QA checklist for any page that has flag-gated behaviour.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The BSS endpoint `GET /NEXMO/account/{account_id}/v1/detail` returned `taxInfo.exemptStatus` — Arpit mapped this to a `vatIdValidationStatus` display label in the Angular component.
* The feature flag `vies-validation` was checked in the Angular template using the existing feature flag service, ensuring the validation status was only shown to accounts in the rollout cohort.
* The regression root cause (APIDB-17132): "For a user with a saved service address, `shouldShowSummary` is always `true` (read-only summary view), so the edit form branch never mounts and `vatStatusLabel` was never in the DOM at all. The feature flag and `taxExemptStatus` data were both fine the entire time. The status label just lived in the wrong branch of the template."
* Fix PR: [dashboard-frontend #2809](https://github.com/vonage-technology/dashboard-frontend/pull/2809) — confirmed by Svetlana Nazarenko (reporter): "Fixed it now."
* The GitHub release commit [b3636336](https://github.com/vonage-technology/dashboard-frontend/commit/b3636336f5491e02f) — "Release cdfront 16.31.0: fix APIDB-17132 [CD][Service Address Page] New Design Lost VAT ID Validation Status" — confirms the production fix.

---

## Story 28 — MySQL 5.7 → 8.0 Migration: Schema Fixes, Missing Index & Performance Recovery

**Amazon LP: Dive Deep | Deliver Results**
**Ticket:** [APIDB-16623](https://jira.vonage.com/browse/APIDB-16623) (Maintenance Banner), [APIDB-16232](https://jira.vonage.com/browse/APIDB-16232) (QA Schema Fix), [APIDB-16386](https://jira.vonage.com/browse/APIDB-16386) (Scheduler Performance), [APIDB-17174](https://jira.vonage.com/browse/APIDB-17174) (Missing Index / RDS CPU)

**Situation:** AWS Aurora was ending support for MySQL 5.7, requiring Vonage's Customer Dashboard and User Service databases to be migrated to MySQL 8.0. MySQL 8.0 introduced several breaking changes: it removed the query cache entirely (which MySQL 5.7 had used implicitly), enforced stricter schema validation, and changed default behaviours around indexing and SQL mode. These changes caused a cascade of issues: nightly QA tests began failing with `GenericJDBCException` errors, a critical scheduler job that previously ran in 2 hours started taking 10+ hours, and production RDS CPU spiked to 97%+ due to full table scans on a high-traffic table that was missing an index.

**Task:** I was responsible for diagnosing and fixing the MySQL 8.0 migration issues across three distinct problem areas: QA schema incompatibilities, scheduler performance degradation, and a production missing-index crisis causing RDS CPU alerts.

**Action:**

*Customer-facing maintenance banner (APIDB-16623):* I implemented a maintenance banner on the Customer Dashboard landing page to inform customers of the planned DB migration window, raising a PR ([#2610](https://github.com/vonage-technology/dashboard-frontend/pull/2610)) for the frontend component and coordinating with the Vonage status page team.

*QA schema fix (APIDB-16232):* I audited all dashboard DB tables in the QA environment for MySQL 8.0 schema incompatibilities causing `GenericJDBCException`. I fixed the schema issues using Flyway migration scripts ([PR #4216](https://github.com/vonage-technology/dashboard/pull/4216)), ensuring the QA environment matched the MySQL 8.0 schema expectations. Nightly tests resumed passing after the fix.

*Scheduler performance (APIDB-16386):* I investigated why `managerBalanceAndCreditLimitJob` had degraded from ~2 hours to 10+ hours after the MySQL 8.0 migration. I identified the root cause: MySQL 8.0 removed the query cache that MySQL 5.7 had used implicitly, meaning repeated calls to `userFinderServiceApi.getPrimaryUserForAccountReference()` inside the job loop were now hitting the database on every iteration instead of being served from cache. I replaced the repeated user-service calls with an `accountOwnerCache` lookup, eliminating the N+1 query pattern. I raised [PR #4250](https://github.com/vonage-technology/dashboard/pull/4250) and also added thread name logging to ease future debugging.

*Missing index / RDS CPU crisis (APIDB-17174):* Production RDS CPU was hitting 97%+ during peak hours, triggering OpsGenie alerts. I investigated using Kibana logs and identified two API calls causing full table scans on `d_topup_transaction`: (1) `/api/v1/braintree/webhook` calling `topUpTransactionFinder.getTopUpTransactionWithPaymentId` — the `paymentId` column had no index; (2) the payment summary page calling `topUpTransactionFinder.getTopUpTransaction` with a `requestId` where clause — also unindexed. I added the missing indexes via a Flyway migration script ([Draft PR #4519](https://github.com/vonage-technology/dashboard/pull/4519)), eliminating the full table scans.

**Result:** The MySQL 8.0 migration was completed without customer-facing downtime. QA nightly tests resumed passing. The `managerBalanceAndCreditLimitJob` returned to its expected ~2-hour runtime. Production RDS CPU alerts were eliminated after the missing indexes were added. The maintenance banner kept customers informed throughout the migration window.

**Learning:** Database version migrations are never just an infrastructure task — they have application-level consequences that only surface under production load. The MySQL 8.0 query cache removal was a silent performance regression that only became visible at scale. I learned to always review the "removed features" section of a database version's release notes before migration, and to treat any scheduler job performance change post-migration as a potential query cache dependency.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `managerBalanceAndCreditLimitJob` degradation was confirmed in Kibana: `"Ending scheduled task managerBalanceAndCreditLimitJob - Time Taken [25195626ms]"` (~7 hours) vs. the expected ~2 hours. Arpit identified this in the ticket: "user-service MySQL5 → MySQL8 has removed default query caching."
* The MySQL 8.0 query cache retirement is documented at: `https://dev.mysql.com/blog-archive/mysql-8-0-retiring-support-for-the-query-cache/`
* The missing index on `d_topup_transaction.paymentId` was identified by Arpit in the ticket: "Identified below API calls in CD causing full table scan for `d_topup_transaction`: `/api/v1/braintree/webhook` when doing `topUpTransactionFinder.getTopUpTransactionWithPaymentId` as no index on column `paymentId`."
* The Flyway migration script added `CREATE INDEX idx_topup_txn_payment_id ON d_topup_transaction(paymentId)` and `CREATE INDEX idx_topup_txn_request_id ON d_topup_transaction(requestId)`.
* The GitHub commit [1330aef](https://github.com/vonage-technology/dashboard/commit/1330aef11f972f7cc329987d48d8a8d6c41c) — "APIDB-16152 update LB urls for Pulse VPN: local container mysql8" — confirms the local development environment was also updated to use MySQL 8.0 containers for parity.
* A Teams message from Arpit (2026-08-24): `SHOW TABLES LIKE '%d_user' IN ACCOUNT;` — evidence of active production DB investigation during the migration.

## Summary: Amazon Leadership Principles Coverage

| # | Story | Primary LP | Secondary LP |
|---|-------|-----------|--------------|
| 1 | PayPal Auth-Only SIFT Flow | Dive Deep | Customer Obsession |
| 2 | Negative Balance Scheduler | Invent and Simplify | Bias for Action |
| 3 | KYC Payment Failure Self-Service | Customer Obsession | Invent and Simplify |
| 4 | AWS Scheduler Migration | Bias for Action | Deliver Results |
| 5 | Kafka Hermes Migration | Dive Deep | Deliver Results |
| 6 | CD Signup Race Condition | Dive Deep | Are Right, A Lot |
| 7 | Hardcoded Credentials Security | Earn Trust | Dive Deep |
| 8 | SIFT Missing Fields & Backfill | Dive Deep | Insist on Highest Standards |
| 9 | Deutsche Telekom SSO | Customer Obsession | Earn Trust |
| 10 | Prepaid USD Zoho & Templates | Deliver Results | Think Big |
| 11 | Sanctioned Countries Compliance | Insist on Highest Standards | Earn Trust |
| 12 | Lifecycle Events Architecture | Think Big | Dive Deep |
| 13 | User Service PATCH Endpoint | Invent and Simplify | Dive Deep |
| 14 | XSS Vulnerability Remediation | Insist on Highest Standards | Earn Trust |
| 15 | CD Failover Testing | Dive Deep | Bias for Action |
| 16 | Sigma Prime Internal APIs | Customer Obsession | Invent and Simplify |
| 17 | Mend/Prisma Vulnerability Programme | Insist on Highest Standards | Deliver Results |
| 18 | Kafka Consumer Group UUID Fix | Dive Deep | Bias for Action |
| 19 | DevRel Pricing API vPricing | Think Big | Customer Obsession |
| 20 | Artifactory Migration | Deliver Results | Bias for Action |
| 21 | OneTrust Cookie Banner GDPR | Insist on Highest Standards | Customer Obsession |
| 22 | 10DLC Campaign Management | Customer Obsession | Deliver Results |
| 23 | SSM Port-Forward Infrastructure | Invent and Simplify | Dive Deep |
| 24 | Verify Logs Page | Customer Obsession | Deliver Results |
| 25 | Organisation Config Migration | Think Big | Invent and Simplify |
| 26 | VIES FeignClient: EU VAT ID Validation (Phase 1) | Insist on the Highest Standards | Customer Obsession |
| 27 | VAT ID Status Display: BSS Integration & Regression Fix (Phase 2) | Customer Obsession | Dive Deep |
| 28 | MySQL 5.7→8.0 Migration: Schema, Missing Index & Performance | Dive Deep | Deliver Results |

---

## Interview Tips (UK Senior Software Engineer Market)

**For Amazon specifically:**
* Always open with the LP name before your story: *"This is a great example of Dive Deep for me..."*
* Keep Situation + Task to ~60 seconds; spend 60% of your time on Action (what YOU did).
* Quantify wherever possible: "~190K accounts", "15 security violations", "6 Kafka topics", "zero downtime".
* The "Deeper Dive" sections in each story give you the technical ammunition to answer follow-up questions like *"Tell me more about how you implemented that"* or *"What was the hardest technical challenge?"*

**For other UK tech companies (FAANG, scale-ups, fintechs):**
* Stories 1, 3, 11 are strong for **fintech/payments** roles (fraud, compliance, KYC).
* Stories 4, 5, 15 are strong for **platform/infrastructure** roles (AWS, Kafka, resilience).
* Stories 7, 14, 17 are strong for **security-conscious** organisations.
* Stories 12, 13, 25 are strong for **architecture/design** discussions.
* Stories 2, 6, 18 are strong for **operational excellence** discussions.

**Redundancy framing (UK context):**
* You are being made redundant due to organisational restructuring — this is a neutral, common event in the UK tech market.
* Frame it positively: *"Vonage/Ericsson is going through a strategic restructuring, and my role is being made redundant. I'm now looking for my next challenge where I can bring this depth of experience in Java/Spring, payments, and distributed systems."*
* Under UK employment law, you are entitled to a redundancy payment and a reference — ensure you have both before your last day.
