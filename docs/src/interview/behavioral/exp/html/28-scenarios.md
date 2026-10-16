# STAR 28

Also add 3 user stories for VIES, VAT ID and MySQL 5.7 to 8.0 (I remember working on ticket to add index for DB column after migration) - add these 3 new user stories in STAR-L format


Let me research these three topics before writing the stories.

Good — I found the VAT ID ticket reference (TICKET-15546) and some Slack threads. Let me dig deeper.

Excellent — this is gold. I now have the exact technical details for all three stories. Let me get a bit more depth on the MySQL migration and the VIES work.

I now have all the technical detail I need. The three stories are clearly defined:

1. **VIES/VAT ID** — Two-phase work: TICKET-15546 (Phase 1: VIES FeignClient integration, validation statuses) + TICKET-16117 (Phase 2: BSS/vAccount integration, show validation status on postpaid My Address page) + TICKET-17132 (bug fix: validation status lost after page redesign)
2. **MySQL 5.7 → 8.0 migration** — TICKET-16623 (maintenance banner), TICKET-16232 (QA schema/Flyway fix), TICKET-16386 (scheduler job 10hrs→2hrs due to MySQL8 query cache removal), TICKET-17174 (missing index on `d_topup_transaction.paymentId` causing full table scans + RDS CPU alerts)

I have everything I need. Now let me append the three new stories to the existing document.

Now update the summary table to include the three new rows and fix the title:

Wait — you asked for 3 new stories (VIES, VAT ID, MySQL). Let me check: VIES and VAT ID are closely related (same ticket chain) — I combined them into one story (Story 26). Let me re-read your request and split them properly, then add Story 28 for the standalone MySQL missing-index story.

All 28 stories are confirmed. Let me also update the artifact title to reflect the new count.

The document is updated and will render with the new content. Here's a summary of the 3 new stories added:

---

## 3 New Stories Added (26, 27, 28)

### Story 26 — VIES FeignClient: EU VAT ID Validation (Phase 1)
**LP: Insist on the Highest Standards | Customer Obsession**
Built from [TICKET-15546](https://jira.vonage.com/browse/TICKET-15546) — the full backend integration with the EU Commission's VIES API. Key technical details captured:
* New `ViesClient` FeignClient with retry logic, metrics, and graceful degradation (never breaks existing flow)
* Four-state `vatIdValidationStatus` enum: `NOT_APPLICABLE`, `SAME_AS_EXISTING`, `VALID_VAT_ID`, `INVALID_VAT_ID`
* Static list of 26 applicable EU countries; QA bypass to avoid hitting live VIES in nightlies
* Confirmed by GitHub release commit [b422ef3](https://github.com/vonage-technology/dashboard/commit/b422ef39f73cc5cf8ed6f9d16e)

### Story 27 — VAT ID Validation Status Display: BSS Integration & Regression Fix (Phase 2)
**LP: Customer Obsession | Dive Deep**
Built from [TICKET-16117](https://jira.vonage.com/browse/TICKET-16117) + [TICKET-17132](https://jira.vonage.com/browse/TICKET-17132) — surfacing the validation status on the postpaid My Address page, plus diagnosing a regression where a page redesign silently dropped the status display. The root-cause analysis is verbatim from the ticket: *"vatStatusLabel lived in the wrong branch of the template — edit form instead of summary view. That's all it was."*

### Story 28 — MySQL 5.7 → 8.0 Migration: Schema, Missing Index & Performance Recovery
**LP: Dive Deep | Deliver Results**
Built from [TICKET-16623](https://jira.vonage.com/browse/TICKET-16623) + [TICKET-16232](https://jira.vonage.com/browse/TICKET-16232) + [TICKET-16386](https://jira.vonage.com/browse/TICKET-16386) + [TICKET-17174](https://jira.vonage.com/browse/TICKET-17174) — four interconnected problems from the same migration:
* **Maintenance banner** — customer communication for the migration window
* **QA schema fix** — Flyway migrations to resolve `GenericJDBCException` in nightly tests
* **Scheduler 10hrs→2hrs** — MySQL 8.0 removed query cache; fixed N+1 pattern with `accountOwnerCache`
* **Missing index / 97% RDS CPU** — `d_topup_transaction.paymentId` and `requestId` had no indexes, causing full table scans on every Braintree webhook and payment summary page load

---

# 28 Amazon Leadership Principle STAR-L Stories
## Story 9 — Deutsche Telekom SSO Integration (DT IDP Migration)
**Amazon LP: Customer Obsession | Earn Trust**
**Ticket:** [TICKET-16458](https://jira.vonage.com/browse/TICKET-16458), [TICKET-16483](https://jira.vonage.com/browse/TICKET-16483), [TICKET-16487](https://jira.vonage.com/browse/TICKET-16487), [TICKET-16493](https://jira.vonage.com/browse/TICKET-16493)

**Situation:** Deutsche Telekom (DT), a major Vonage CSP (Communications Service Provider) partner, was migrating to their own Identity Provider (IDP) for SSO. Once migrated, DT would manage the full user lifecycle, meaning Vonage's dashboard should no longer allow users to modify their profile or addresses directly — those actions should redirect to DT's IDP at `https://auth.api.telekom.com/realms/dtmaceretail/account`.

**Task:** I was responsible for implementing the SSO integration changes in the Customer Dashboard: hiding/redirecting My Profile and My Addresses pages for DT users, redirecting user invite emails to the DT IDP, and fixing 2FA phone numbers on affected CSP DT accounts.

**Action:** I modified the hamburger menu navigation to conditionally hide My Profile and My Addresses links for DT-branded users, replacing them with redirects to the DT IDP URL. I updated the user invite email flow (TICKET-16483) to redirect DT users to the DT IDP instead of the standard Vonage onboarding flow. I also fixed 2FA phone numbers on specific CSP DT accounts (TICKET-16493) that had been incorrectly configured. I coordinated directly with the DT team (Nicolas Altrien-Buffaral) to confirm the correct redirect URLs.

**Result:** DT users were seamlessly redirected to their own IDP for profile management, meeting DT's contractual requirement. The invite email flow was updated without disrupting existing DT users. The integration was delivered on schedule for the DT IDP migration go-live.

**Learning:** Working with a major enterprise partner's SSO integration taught me the importance of clear API contracts and redirect URL validation. I also learned to manage stakeholder expectations when requirements evolve mid-sprint (the initial spec changed from "hide pages" to "redirect to DT IDP").

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The DT IDP redirect URL was `https://auth.api.telekom.com/realms/dtmaceretail/account` — confirmed by the DT team after a coordination call.
* The conditional logic used the existing CSP/organisation configuration to identify DT-branded users.
* TICKET-16493 required direct database-level fixes for 2FA phone numbers on specific accounts — a production data fix coordinated with the DT team.
* The EPIC [EPIC-1347](https://jira.vonage.com/browse/EPIC-1347) (CSP DT domain name change) was the broader context, with Arpit's tickets being the dashboard-side implementation.

---

## Story 10 — Prepaid USD Multi-Currency Launch: Zoho & Email Templates
**Amazon LP: Deliver Results | Think Big**
**Ticket:** [EPIC-1516](https://jira.vonage.com/browse/EPIC-1516), TICKET-14686, TICKET-14744, TICKET-14950, TICKET-14760, TICKET-15215

**Situation:** Vonage was launching Prepaid USD — a strategic initiative to expand into the US market with local currency support. This required updating the Zoho CRM integration to handle multi-currency accounts, updating all payment email templates to display the correct currency, and ensuring bank transfer details for USD accounts were correctly shown in both QA and production.

**Task:** I was responsible for the Zoho and email template components of the Prepaid USD launch — adding currency to Zoho customer account creation, updating payment email templates, and fixing bank transfer details for USD accounts.

**Action:** I added the `currency` field to the Zoho customer account creation API call (TICKET-14686), ensuring USD accounts were correctly tagged in Zoho from the moment of creation. I updated all payment email templates (TICKET-14744) to include the account currency, so customers received emails showing USD amounts rather than EUR. I deployed the bank transfer details for USD accounts to QA (TICKET-14950) and production (TICKET-14760), and fixed a template mismatch between QA and PROD environments (TICKET-15215) that was causing inconsistent customer communications.

**Result:** The Prepaid USD launch had correct Zoho CRM data and accurate email communications from day one. The template mismatch fix prevented customer confusion about bank transfer details. The Zoho integration supported the multi-currency strategy without requiring manual data correction.

**Learning:** I learned that multi-currency launches have a long tail of integration points — CRM, email templates, bank transfer details — each of which can independently cause customer confusion if not updated. I now advocate for a "currency audit" checklist for any new currency rollout.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The Zoho API call was updated to pass `currency: "USD"` in the account creation payload, using the existing `AccountCurrencyCache` (which was also refactored in TICKET-15310).
* Email templates were updated in the `notification-templates` repository to conditionally display the currency symbol based on the account's currency field.
* The QA/PROD template mismatch (TICKET-15215) was caused by a deployment ordering issue — the QA templates had been updated but the PROD deployment had used an older template version.
* The `AccountCurrencyCache` refactor (TICKET-15310) was done in parallel to ensure the cache correctly reflected USD accounts before the USD deploy.

---

## Story 11 — Compliance: Blocking Sanctioned Countries for Payments & Addresses
**Amazon LP: Insist on the Highest Standards | Earn Trust**
**Ticket:** [TICKET-15482](https://jira.vonage.com/browse/TICKET-15482), [TICKET-15483](https://jira.vonage.com/browse/TICKET-15483)

**Situation:** Vonage's payment method and service address forms were allowing users to select sanctioned countries (Russia, Syria, Iran, Cuba, North Korea, China, Hong Kong, Macau) — a direct violation of US CFIUS regulations and Vonage's internal compliance policies. This was a legal and regulatory risk that needed immediate remediation.

**Task:** I was responsible for implementing country-level blocking on both the payment method form and the service address form to prevent users from selecting sanctioned countries.

**Action:** I implemented a server-side validation layer in the dashboard backend that checked the selected country against a configurable sanctioned-countries list before allowing the form submission. I also added frontend validation to provide immediate feedback to users. The sanctioned countries list included Russia, Syria, Iran, Cuba, North Korea, China (CFIUS), Hong Kong (CFIUS), and Macau. I added Ireland (IE) as a test-only banned country in QA (with a note to revert before PROD deployment) to validate the blocking logic without using real sanctioned countries.

**Result:** Both the payment method and service address forms were compliant with CFIUS regulations and Vonage's internal policies. The fix was deployed to production, eliminating the regulatory risk. The configurable country list allowed future updates without code changes.

**Learning:** Compliance requirements often have tight deadlines and zero tolerance for errors. I learned to use test-only configurations (like the IE test country) to validate blocking logic safely in QA without risking false positives in production.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The sanctioned countries list was stored in the dashboard configuration service, making it updatable without a code deployment.
* The backend validation was added to both the `PaymentMethodController` and the `ServiceAddressController`.
* The frontend validation used the same country list via an API call, ensuring consistency between client and server validation.
* TICKET-15482 (payment method) was 8 story points; TICKET-15483 (service address) was 5 story points — reflecting the additional complexity of the payment method form.

---

## Story 12 — Lifecycle Events Architecture: Account Billing, User Finance, Company Events
**Amazon LP: Think Big | Dive Deep**
**Ticket:** [TICKET-12324](https://jira.vonage.com/browse/TICKET-12324), [TICKET-12178](https://jira.vonage.com/browse/TICKET-12178), [TICKET-10625](https://jira.vonage.com/browse/TICKET-10625), [TICKET-10804](https://jira.vonage.com/browse/TICKET-10804)
**Confluence:** [LifeCycle Events](https://confluence.vonage.com/display/DAS/LifeCycle+Events)

**Situation:** Vonage's downstream systems (VServices, billing, analytics) were tightly coupled to the dashboard's internal Volga events for account state changes. This created fragile dependencies and made it impossible for downstream teams to evolve independently. The architecture needed a clean, versioned event contract.

**Task:** I was part of the team responsible for designing and implementing the Lifecycle Events architecture — a new set of Kafka events published to the Hermes cluster that downstream systems could consume independently. I specifically owned the Account Billing, User Finance, and Company lifecycle events.

**Action:** For Account Billing (TICKET-12324), I created a new Kafka topic (`service_dashboard-account_billing_lifecycle_events`), defined the event schema with `billing_type` and `payment_type` fields, and replaced the existing Volga listener with a new lifecycle event publisher. For User Finance (TICKET-12178), I created the corresponding event for user finance state changes. For Company events (TICKET-10625), I created lifecycle events for company create and update, updating `d_user_search` via `userSearchService.saveOrUpdate`. I also enriched existing events with more fields (TICKET-10804) based on downstream team feedback.

**Result:** Downstream systems could now consume clean, versioned lifecycle events from the Hermes cluster without depending on Vonage's internal Volga events. The VServices team was able to decouple their billing integration. The lifecycle events became the standard integration pattern for all new downstream consumers.

**Learning:** Designing event schemas is harder than it looks — you need to think about backward compatibility, versioning, and what downstream consumers will need in 2 years, not just today. I learned to involve downstream teams in schema design from the start.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* `AccountBillingLifeCycleEvent.java` was added to the `customer-dashboard` module with fields: `type`, `account_ref`, `oldValue`, `newValue`, `billing_type`, `payment_type`.
* The Confluence [LifeCycle Events](https://confluence.vonage.com/display/DAS/LifeCycle+Events) page documents the full event catalogue — Arpit contributed the Account Billing, User Finance, and Company sections.
* The `SubAccountListener` was refactored (TICKET-11315) to centralise account lifecycle event publishing, replacing scattered event publishing across multiple services.
* JSON schema generation for lifecycle events was explored (TICKET-12721) to provide a formal contract for downstream consumers.

---

## Story 13 — User Service: PATCH Endpoint & Client Library
**Amazon LP: Invent and Simplify | Dive Deep**
**Ticket:** [TICKET-12934](https://jira.vonage.com/browse/TICKET-12934), [TICKET-13080](https://jira.vonage.com/browse/TICKET-13080)

**Situation:** The User Service only supported full PUT updates for user records. This caused a critical bug: when the dashboard read a user from cache (which might be stale) and then updated a single field (e.g., setting status to `SUSPENDED`), it would overwrite other fields like `accountRef` with stale values, causing data corruption.

**Task:** I was responsible for creating a new PATCH endpoint in the User Service that allowed partial updates — updating only the specified fields without affecting others — and then integrating it into the dashboard.

**Action:** I implemented a PATCH endpoint in the `UserController` using JSON Patch (RFC 6902), which allowed callers to specify exactly which fields to update. I created a client library for the new endpoint and published it to Artifactory (TICKET-12934). I then integrated the PATCH endpoint into the dashboard (TICKET-13080), replacing the problematic full-update calls in the user suspension flow with targeted PATCH calls.

**Result:** The data corruption bug caused by stale cache reads was eliminated. The PATCH endpoint became the standard for all partial user updates, reducing the risk of unintended field overwrites across the codebase.

**Learning:** I learned that API design decisions (PUT vs. PATCH) have real downstream consequences for data integrity. The lesson was to always use the most specific operation available — PATCH for partial updates, PUT only for full replacements.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The PATCH endpoint used `JsonPatch` library for RFC 6902 compliance, allowing operations like `replace`, `add`, `remove` on individual user fields.
* Arpit commented in the ticket: "client library created here, link to artifactory here" — confirming the library was published and available for dashboard consumption.
* The integration in TICKET-13080 replaced the `updateUser` call in the suspension flow with `patchUser`, passing only the `status` field.
* The fix also addressed the `UserFinance not found` log errors (TICKET-12586) that were a symptom of the same stale-cache issue.

---

## Story 14 — Security: XSS Vulnerability Remediation (Reflected XSS & JSONP)
**Amazon LP: Insist on the Highest Standards | Earn Trust**
**Ticket:** [TICKET-11309](https://jira.vonage.com/browse/TICKET-11309), [TICKET-13621](https://jira.vonage.com/browse/TICKET-13621), [TICKET-13666](https://jira.vonage.com/browse/TICKET-13666)

**Situation:** A security researcher reported a Reflected XSS vulnerability on `https://rest.nexmo.com/` via an unsanitised `callback` parameter in the JSONP endpoint. The PoC demonstrated that visiting a crafted URL could execute arbitrary JavaScript in the victim's browser. A separate XSS-to-ATO (Account Takeover) vulnerability was also identified via a password manager on the same domain.

**Task:** I was responsible for remediating the JSONP callback validation vulnerability and the XSS-to-ATO issue, ensuring the endpoints were hardened against injection attacks.

**Action:** For the JSONP endpoint (TICKET-13666), I implemented strict alphanumeric validation on the `callback` parameter, rejecting any value containing HTML/JavaScript characters. For the XSS-to-ATO issue (TICKET-13621), I implemented Content Security Policy (CSP) headers and input sanitisation on the affected password manager integration point. I tested the fixes against the original PoC payloads to confirm remediation.

**Result:** Both vulnerabilities were remediated and verified. The security findings were closed in the VRR. The JSONP endpoint now rejects malformed callback parameters with a 400 error, preventing the XSS attack vector.

**Learning:** Security vulnerabilities in public-facing APIs require both input validation and output encoding — fixing one without the other leaves the door open. I also learned the value of testing fixes against the original PoC, not just unit tests.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The JSONP PoC URL was: `https://rest.nexmo.com/pricing/NO/jsonp?callback=<img src=x onerror=alert(document.domain)>aaaaa`
* The fix validated the `callback` parameter against a regex `^[a-zA-Z0-9_\.]+$` before including it in the response.
* The XSS-to-ATO (TICKET-13621) was a more complex attack chain involving a password manager autofill that could be triggered by a malicious page.
* Both fixes were deployed to production and the VRR findings were formally closed.

---

## Story 15 — CD Failover Testing & Health Check Infrastructure
**Amazon LP: Dive Deep | Bias for Action**
**Ticket:** [TICKET-16351](https://jira.vonage.com/browse/TICKET-16351), TICKET-16529, TICKET-16539, TICKET-16540
**Confluence:** [Test CD Failover across regions](https://confluence.vonage.com/display/DAS/Test+CD+Failover+across+regions)

**Situation:** An architecture review revealed that although the Customer Dashboard was deployed to multiple AWS regions and AZs, there was no documented failover procedure and no regular validation that failover actually worked. In the event of a regional outage, the team would have no tested playbook to follow.

**Task:** I was responsible for defining the failover testing procedure, implementing the infrastructure to support it (including a new failover toggle endpoint), and validating failover in both QA and production environments.

**Action:** I created a new `DashboardHealthCheckController` with a `/api/internal/failover` endpoint that toggled a region-level failover flag stored in the regional cache (keys: `failover-eu-west-1` and `failover-eu-central-1`). I also added a `/api/internal/ping` endpoint for health checks. I documented the full failover testing procedure in Confluence (TICKET-16351), then validated it in QA with the regional cache and Jenkins pipeline (TICKET-16529), in QA with APIGW (TICKET-16539), and finally in production with APIGW (TICKET-16540).

**Result:** The team now had a tested, documented failover procedure. The failover toggle could be activated in under 5 minutes, and the health check endpoint provided accurate service status for load balancer routing decisions.

**Learning:** Resilience engineering is not just about building redundancy — it's about regularly testing that the redundancy actually works. I learned that untested failover procedures are almost as bad as no failover procedure.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The failover flag was stored in the regional Redis cache with keys `failover-eu-west-1` and `failover-eu-central-1`, allowing region-specific failover without affecting other regions.
* The `DashboardHealthCheckController` was added to the `customer-dashboard` module and exposed via the internal API gateway.
* The Jenkins pipeline test (TICKET-16529) validated that the cache correctly propagated the failover flag across all instances in the region.
* The production test (TICKET-16540) was done during a low-traffic window with the on-call team standing by.

---

## Story 16 — Sigma Prime: Internal Payment Search Endpoints for Admin Migration
**Amazon LP: Customer Obsession | Invent and Simplify**
**Ticket:** [TICKET-16561](https://jira.vonage.com/browse/TICKET-16561), [TICKET-15536](https://jira.vonage.com/browse/TICKET-15536)

**Situation:** The Admin Dashboard's payment search functionality needed to be migrated to Sigma Prime (an internal admin tool). However, the existing `/api/v1/payments/*` endpoints required a user JWT and could not be called via service-to-service authentication. Additionally, suspended accounts (e.g., due to the China exit) could not log in to delete their saved payment methods, requiring manual database-level deletions by the support team.

**Task:** I was responsible for creating internal endpoints for Sigma Prime that could query the `d_topup_transaction` table via service-to-service auth, and for implementing a secure Get/Delete payment methods endpoint for admin use.

**Action:** For TICKET-16561, I created `GET /api/internal/v1/payments/search` with parameters for `accountRef`, `startDate`, `endDate`, and optional `paymentMethod`, returning paginated results with HATEOAS links. For TICKET-15536, I implemented `GET /api/internal/v1/payment-methods/{accountRef}` with validation (prepaid only, no sub-accounts, no auto-reload), proper audit logging (which admin performed the action, which payment methods were affected), and appropriate error responses.

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
**Ticket:** TICKET-15615, TICKET-15630, TICKET-15004, TICKET-15683, TICKET-15733, TICKET-13910, TICKET-15002, TICKET-15291

**Situation:** Vonage's security scanning tools (Mend and Prisma) were flagging critical and high vulnerabilities in the `user-service` and `dashboard` repositories. The `user-service` was in the top 10 most vulnerable services in the organisation. Unaddressed vulnerabilities created compliance risk and potential attack surface.

**Task:** I took ownership of the security vulnerability remediation programme for both `user-service` and `dashboard`, systematically addressing critical dependencies including `spring-beans`, `kafka-clients`, `embedded-redis`, `jetty`, `h2`, `c3p0`, `zookeeper`, `python`, and `tomcat`.

**Action:** I worked through each vulnerability systematically: upgrading `spring-beans` (TICKET-15615), `kafka-clients` (TICKET-15630), `embedded-redis` (TICKET-15004), `jetty` (TICKET-15683), `h2` (TICKET-15733), `c3p0` (TICKET-13910), and `zookeeper` (TICKET-13994) in `user-service`. For `dashboard`, I addressed `python` and `tomcat` (TICKET-15291) and fixed direct dependencies (TICKET-15003). I also fixed ignored JUnit tests (TICKET-15474) that were masking test failures.

**Result:** The `user-service` was removed from the top 10 most vulnerable services list. The team achieved the KTLO (Keep The Lights On) target for Mend vulnerability reduction. Both services maintained 90%+ code coverage (above the standard 80% target).

**Learning:** Security debt compounds — each deferred upgrade makes the next one harder. I learned to treat dependency upgrades as regular maintenance rather than one-off projects, and to use the Mend SPOG (Single Pane of Glass) dashboard for prioritisation.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `spring-beans` upgrade (TICKET-15615) required careful testing as it was a transitive dependency affecting multiple Spring Boot components.
* `embedded-redis` (TICKET-15004) was replaced with a test container approach to avoid the embedded Redis vulnerability.
* The Prisma scan improvements (TICKET-15002, TICKET-15291) involved updating Docker base images to remove OS-level vulnerabilities.
* Arpit's 2025 personal objectives explicitly tracked: "user-service no longer in top 10 list of most vulnerable services" as a key metric.

---

## Story 18 — Kafka Consumer Group UUID Fix (Production Lag Alert)
**Amazon LP: Dive Deep | Bias for Action**
**Ticket:** [TICKET-14429](https://jira.vonage.com/browse/TICKET-14429)

**Situation:** The Clear Cache Event Listener in the Customer Dashboard was generating a new UUID as its Kafka consumer group ID on every restart. This meant each restart created a new consumer group, leaving the old one stale and triggering Kafka lag alerts in production — even though no messages were actually lagging. The operations team was receiving false-positive alerts, eroding trust in the alerting system.

**Task:** I was responsible for fixing the consumer group ID generation to be stable across restarts, eliminating the false-positive lag alerts.

**Action:** I investigated the `ClearCacheEntryKafkaListenerConfiguration` and found the group ID was generated as a random UUID at startup. I changed the group ID generation to use the allocation ID or host IP, ensuring that restarting an allocation would recreate the same group ID. I tested this in the canary instance by restarting the allocation and verifying that the Kafka lag returned to zero (rather than creating a new stale group). I also updated the Grafana alert to exclude the old group ID during the transition period.

**Result:** Kafka lag alerts were no longer triggered by service restarts. The operations team's alert fatigue was reduced. The fix also improved the accuracy of Kafka lag monitoring across the dashboard services.

**Learning:** Alert fatigue is a real operational risk — when alerts fire too often for non-issues, teams start ignoring them. I learned to treat false-positive alerts with the same urgency as real incidents.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The group ID was changed from `UUID.randomUUID().toString()` to `"clear-cache-" + System.getenv("ALLOCATION_ID")` (with a fallback to hostname).
* The log line `"[clearCacheEntryKafkaEventListener] Initializing clear cache kafka consumer factory with group ID:"` was used to verify the fix in QA.
* The Grafana alert exclusion (TICKET-12037) was a temporary measure during the transition, later removed once all instances had the new group ID.
* The `clean_kafka_topics.sh` script was also updated to handle the new stable group ID format.

---

## Story 19 — DevRel Pricing API: Multi-Currency vPricing Migration
**Amazon LP: Think Big | Customer Obsession**
**Ticket:** [TICKET-14896](https://jira.vonage.com/browse/TICKET-14896)

**Situation:** As part of the Prepaid USD / multi-currency strategy, Vonage was migrating pricing management to a new system called vPricing. Customers who had been migrated to vPricing needed to receive appropriate error responses from the existing DevRel Pricing API, rather than incorrect pricing data from the old system.

**Task:** I was responsible for modifying the DevRel Pricing API endpoints to detect whether a customer had been migrated to vPricing (via the PHub capability `rtc-voice-enable-vpricing`) and return the correct HTTP response codes accordingly.

**Action:** I implemented a capability check in the API gateway routing layer that queried PHub for the `rtc-voice-enable-vpricing` capability. Based on the customer's migration status and the specific endpoint called, I returned the appropriate HTTP status codes: 406 (Not Acceptable) for endpoints not supported for vPricing customers, 403 (Forbidden) for endpoints where the customer lacked the required capability, and 200 for supported endpoints. I implemented this across all `get-pricing` and `get-prefix-pricing` endpoint variants.

**Result:** vPricing customers received clear, actionable error responses instead of incorrect pricing data. The API gateway correctly routed requests based on migration status, supporting the phased rollout of vPricing without breaking existing integrations.

**Learning:** API versioning and migration strategies require careful thought about backward compatibility. I learned to use capability flags as a clean mechanism for feature gating during migrations, rather than version-based routing.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The GitHub PR [TICKET-14896 devrel pricing api modifications](https://github.com/vonage-technology/dashboard/pull/...) implemented the capability check in the API gateway.
* The response code matrix was: `get-pricing/outbound` → 406 (vPricing), 403 (no voice), 403 (no SMS); `get-pricing/outbound/sms` → 406, 200, 403; `get-pricing/outbound/voice` → 406, 403, 200.
* The PHub capability check used the existing `PlatformHubClient` (FeignClient) to query the `rtc-voice-enable-vpricing` capability.

---

## Story 20 — User Service Migration to New Artifactory
**Amazon LP: Deliver Results | Bias for Action**
**Ticket:** [TICKET-14181](https://jira.vonage.com/browse/TICKET-14181), TICKET-14230, TICKET-14227, TICKET-14938, TICKET-14269

**Situation:** Vonage was migrating its artifact repository from the old Artifactory instance to a new one (`vonagecc`). The `user-service` and its client library needed to be migrated to fetch dependencies from and publish to the new Artifactory, while the `dashboard` needed to be updated to consume the new client library version.

**Task:** I was responsible for the end-to-end migration of the `user-service` to the new Artifactory, including upgrading the Gradle wrapper, updating dependency resolution, publishing the new client library, and updating the dashboard to consume it.

**Action:** I upgraded the Gradle wrapper version in `user-service` (TICKET-14227) — a prerequisite for publishing to the new Artifactory. I updated the dependency resolution configuration to fetch from the new Artifactory (TICKET-14230). I published the updated `us-client` library to the new Artifactory. I then updated the `dashboard` to consume the new `us-client` from the new Artifactory (TICKET-14269), and updated the Admin Dashboard (AD) similarly. I also created a transitional step (TICKET-14938) where the dashboard consumed the updated `us-client` from the old Artifactory during the migration window.

**Result:** The `user-service` and its client library were successfully migrated to the new Artifactory. The dashboard and Admin Dashboard were updated to consume the new library. The old Artifactory dependency was fully removed.

**Learning:** Dependency migrations require careful sequencing — you can't update the consumer before the producer has published to the new location. I learned to use transitional steps (consuming from old Artifactory while publishing to new) to avoid breaking the build pipeline.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The Gradle wrapper upgrade (TICKET-14227) was from Gradle 6.x to 7.x, which required updating several deprecated API usages in the build scripts.
* The `us-client` library version was bumped to signal the Artifactory migration to consumers.
* GitHub workflows were updated (as noted in Arpit's 2025 objectives) to use the new Artifactory credentials from AWS Secrets Manager.

---

## Story 21 — OneTrust Cookie Banner Migration (GDPR Compliance)
**Amazon LP: Insist on the Highest Standards | Customer Obsession**
**Ticket:** [TICKET-12921](https://jira.vonage.com/browse/TICKET-12921), [TICKET-14215](https://jira.vonage.com/browse/TICKET-14215)

**Situation:** Vonage's Customer Dashboard was using an old version of the OneTrust cookie banner served via Google Tag Manager (GTM). The company needed to migrate to a new script managed by Adobe Tag Manager, and the old GTM code needed to be removed. This was a GDPR compliance requirement affecting all dashboard variants (Vonage, DT, Optus).

**Task:** I was responsible for implementing the new OneTrust cookie banner in QA (TICKET-12921) and then removing the old GTM code from the frontend after the new banner went live in production (TICKET-14215).

**Action:** I worked with Greg Frileux to remove the old cookie banner in QA and implement the new Adobe Tag Manager script. I developed a strategy for handling multiple CSP variants (Vonage, DT, Optus) — each required a different OneTrust configuration. I coordinated with Eeshat Gupta to determine the correct handling for each CSP. Once the new banner was validated in production, I removed all GTM code from the CD frontend (TICKET-14215).

**Result:** The Customer Dashboard was compliant with the new OneTrust cookie banner standard across all CSP variants. The old GTM code was fully removed, reducing the frontend bundle size and eliminating the dependency on the legacy cookie management system.

**Learning:** GDPR compliance changes in multi-tenant systems (multiple CSPs) require careful per-tenant configuration management. I learned to treat each CSP as a separate deployment target with its own compliance requirements.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The OneTrust script was loaded conditionally based on the CSP configuration, with different OneTrust domain IDs for Vonage, DT, and Optus.
* The GTM removal (TICKET-14215) required auditing all GTM-dependent analytics events to ensure they were migrated to the new Adobe Tag Manager before removal.
* The `legal links` feature (TICKET-13818) was implemented in parallel, adding a dedicated legal links section to the dashboard footer.

---

## Story 22 — 10DLC Campaign Management: Full Feature Delivery
**Amazon LP: Customer Obsession | Deliver Results**
**Ticket:** TICKET-10220, TICKET-10160, TICKET-10309, TICKET-9424, TICKET-9999, TICKET-10083, TICKET-10225, TICKET-10050

**Situation:** The US 10DLC (10-Digit Long Code) campaign registration system was a new regulatory requirement for SMS messaging in the US. Vonage needed to implement a full campaign management UI in the Customer Dashboard, including campaign creation, editing, deactivation, and compliance with TCR (The Campaign Registry) requirements.

**Task:** I was responsible for implementing multiple features and bug fixes across the 10DLC campaign management UI, including terms and conditions, subscriber opt-out handling, campaign filtering, and various bug fixes.

**Action:** I implemented the Campaign Terms and Conditions acceptance flow (TICKET-9424), ensuring the `tc_agree` boolean was correctly populated in the POST API call to TenDLC (TICKET-9999). I fixed the subscriber opt-out attribute for 2FA campaigns (TICKET-10160, TICKET-10309), which was mandatory but not being set. I implemented campaign filtering for expired 10DLC campaigns (TICKET-10220). I fixed the campaign description validation (TICKET-10225), the TCR alphanumeric field validation (TICKET-10083), and the numbers list refresh bug (TICKET-10050). I also added a note on the brands page about vetting requirements (TICKET-8267).

**Result:** The 10DLC campaign management feature was delivered with full compliance with TCR requirements. The subscriber opt-out fix ensured Vonage's customers were compliant with US SMS regulations. The UI bugs were resolved, improving the campaign creation success rate.

**Learning:** Regulatory compliance features (10DLC, GDPR) require close collaboration with legal and compliance teams to understand the exact requirements. I learned that "mandatory field" in a regulatory context means zero tolerance for omission — the fix had to be retroactive for existing campaigns.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `tc_agree` field (TICKET-9999) was a boolean that had to be `true` for the TCR API to accept the campaign creation request.
* The subscriber opt-out fix (TICKET-10309) required updating existing 2FA campaigns in the database to set the opt-out attribute retroactively.
* The campaign filtering (TICKET-10220) used the campaign status and expiry date to hide expired campaigns from the active list.
* A stuck campaign (TICKET-10467) at `CARRIERS_REVIEW` status was investigated and resolved by triggering a manual status refresh via the TenDLC API.

---

## Story 23 — SSM Port-Forward & RDS Connectivity Infrastructure
**Amazon LP: Invent and Simplify | Dive Deep**
**Ticket:** TICKET-16150, TICKET-16152, TICKET-16182, TICKET-16181, TICKET-16180

**Situation:** After Vonage's migration to AWS, developers and QA tests needed to connect to RDS databases in the private VPC. The existing approach used direct localhost connections that no longer worked in the new AWS environment, breaking local development and QA test runs.

**Task:** I was responsible for implementing SSM (AWS Systems Manager) port-forwarding scripts and updating all services to use the new connectivity approach.

**Action:** I created `connect_cd_rds_proxy.sh` and `connect_user_rds_proxy.sh` scripts that used AWS SSM Session Manager to establish port-forward tunnels to the RDS instances. I updated the `dashboard-developer-gateway` (TICKET-16150), `dashboard` (TICKET-16152), `qatests_dashboard` (TICKET-16182), `admin-dashboard` (TICKET-16181), and `user-service` (TICKET-16180) to use the new SSM port-forward approach instead of direct localhost connections. I also updated the Admin Dashboard README with instructions for running locally with the new setup.

**Result:** All services could connect to RDS in the AWS environment. QA tests ran successfully with the new connectivity approach. The SSM port-forward scripts became the standard tool for local development database access across the team.

**Learning:** Infrastructure changes (like moving to AWS private VPCs) have a long tail of developer tooling impacts. I learned to proactively audit all localhost/direct connection references when migrating to a new network topology.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `connect_cd_rds_proxy.sh` script used `aws ssm start-session --target <instance-id> --document-name AWS-StartPortForwardingSessionToRemoteHost` to tunnel RDS traffic through SSM.
* The `port-forward.sh` script was also created as a general-purpose port-forwarding utility.
* The `db_user` tickets (TICKET-8010, TICKET-8012, TICKET-8014, TICKET-8429) from 2022 were the earlier phase of this work — creating dedicated DB users for each service.
* Arpit's 2025 objectives noted "ssm-port-forward" as a key infrastructure improvement delivered.

---

## Story 24 — Verify Logs Page: New Feature Delivery
**Amazon LP: Customer Obsession | Deliver Results**
**Ticket:** [TICKET-7906](https://jira.vonage.com/browse/TICKET-7906), [TICKET-8018](https://jira.vonage.com/browse/TICKET-8018)

**Situation:** Vonage customers using the Verify API had no way to view their verification logs directly in the Customer Dashboard. They had to contact support or use the API directly to debug verification failures, creating unnecessary support overhead and a poor developer experience.

**Task:** I was responsible for implementing the Verify Logs page in the Customer Dashboard — a new feature allowing customers to search, filter, and view their Verify API transaction logs directly in the UI.

**Action:** I implemented the full Verify Logs page, including the search form (with date range, request ID, and status filters), the results table, and the log detail view. I integrated with the backend Verify logs API, handling pagination and date validation (`date_start must be in the past` — TICKET-11755). I also fixed the SMS Logs download issue (TICKET-11976) and the missing `date_start` for `SMS_WEBHOOK` (TICKET-12045) as related improvements to the logs infrastructure.

**Result:** Customers could now self-serve their Verify API debugging without contacting support. The Verify Logs page reduced support tickets related to Verify API debugging. The feature was validated with QA tests (`VerifyLogSearchNew.spec.js`).

**Learning:** Developer-facing features require thinking about the debugging workflow — what information does a developer need when a verification fails? I learned to design log views around the most common debugging scenarios rather than just exposing raw data.

**Deeper Dive (Technical Detail from Jira/GitHub):**
* The `VerifyLogSearchNew.spec.js` test file was added to `qatests_dashboard` to cover the new Verify Logs page.
* The date validation (`date_start must be in the past`) was implemented both client-side and server-side to prevent invalid API calls.
* The SMS Logs download fix (TICKET-11976) was a related improvement that fixed a broken CSV export for SMS logs.
* The `Hide Pricing Details - Verify Logs` ticket ensured pricing information was not exposed in the Verify Logs view for non-authorised users.

