# CD Signup Race Condition Fix (Multi-Service Async Flow)

<-- [Back](./..)  
::: info About
**Signup Race Condition: Fixing a Multi-Service Async Bug Causing Customer Onboarding Failures**.  
**CD Signup Race Condition Fix (Multi-Service Async Flow)**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Are Right, A Lot" />  
**Ticket:** TICKET-14496, TICKET-14281, TICKET-14498
:::

## Situation

Vonage's customer signup flow involved multiple asynchronous services — Customer Dashboard, User Service, PHub (account creation), provisioning service, and vAccounts (BSS). A race condition was causing intermittent signup failures in production, where some services completed before others had finished initialising the account, leading to failed nightly regression tests and occasional customer-facing errors.

Vonage's Customer Dashboard signup flow involved multiple asynchronous services: the dashboard frontend, user-service, PHub (pricing hub), BSS vAccounts, and a provisioning service. Intermittently, newly signed-up users would land in a broken state — unable to buy numbers or access features — because downstream services hadn't finished processing when the dashboard assumed they had. This was a race condition that was hard to reproduce and had been open for some time (TICKET-14496).

New customer signups were intermittently failing — users would complete the signup flow but find their account in an inconsistent state (missing capabilities, wrong status). The root cause was a race condition in the async communication between Customer Dashboard, User Service, PHub (account provisioning), and the BSS vaccounts service. The issue was non-deterministic and hard to reproduce, making it a persistent source of customer complaints and nightly test failures.

## Task

I was tasked with investigating the root cause of the race condition, mapping the full async signup flow, and implementing a fix across the affected services.

Investigate the root cause of the race condition across multiple services, propose a fix, and implement it without disrupting the live signup flow.

Investigate the signup race condition (TICKET-14496 wrapper), identify the exact failure points across all involved services, and implement fixes.

## Action

I traced the signup flow end-to-end across all five services, documenting the sequence of async events and identifying the exact timing window where the race condition occurred. I found that the BSS vAccounts service (TICKET-14281) and the provisioning service (TICKET-14498) were both responding to the same account creation event without coordination. I implemented ordering guarantees and retry logic to ensure downstream services waited for upstream completion signals before proceeding. I also updated the Confluence signup flow documentation.

* Traced the full signup event sequence across Kafka topics and service logs, mapping the exact timing dependencies between user-service, PHub, and BSS vAccounts.
* Identified that the dashboard was reading account state before PHub had finished writing the pricing group, causing the "upgrade required" state to persist incorrectly.
* Implemented a fix in the BSS vAccounts service (TICKET-14281) and the provisioning service (TICKET-14498) to introduce proper event ordering and retry logic.
* Added detailed logging at each step of the signup flow to make future race conditions diagnosable from Kibana without needing to reproduce locally.
* Mapped the full signup flow across all services: CD → User Service → PHub → provisioning → vaccounts, identifying the async handoff points where race conditions could occur.
* Fixed the BSS vaccounts race condition (TICKET-14281) by introducing a new Kafka topic (`TICKET-14281 signup vaccount sync new kafka topic`) to synchronise account creation events, replacing a polling-based approach.
* Fixed the provisioning service race condition (TICKET-14498) with appropriate retry/backoff logic.
* Refactored the signup package in User Service (TICKET-11223) to make the flow more deterministic and easier to reason about.
* Added a SQL migration (`20231018_1725__TICKET-12115_make_status_new_for_last_two_months_signups.sql`) to correct the status of accounts affected by the bug in production.
* Validated fixes by ensuring nightly tests passed consistently.

## Result

The race condition was resolved. Nightly regression tests passed consistently post-fix. The fix also improved the reliability of the prepaid USD signup flow, which was being built concurrently.

* The race condition was eliminated; no recurrence reported after the fix was deployed to production.
* The added logging reduced mean-time-to-diagnose for signup issues from hours to minutes.
* The fix was delivered as a coordinated multi-service change, requiring careful sequencing of deployments.
* Signup race condition resolved — nightly tests passed consistently post-fix.
* Customer onboarding failures due to this issue eliminated.
* The refactored signup package became easier to maintain and extend for future features (e.g., Prepaid USD signup flow).

## Learning

Debugging distributed async systems requires mapping the full event chain before touching any code. I learned to use Kafka consumer group lag metrics and Kibana logs together to pinpoint exactly where the timing gap occurred.

Distributed systems race conditions are rarely obvious from a single service's logs. I learned to treat the event timeline as the primary debugging artefact and to always add observability as part of the fix, not as a follow-up.

Learned that race conditions in distributed systems are often invisible until they cause customer-facing failures. The key insight was that async communication requires explicit synchronisation points — Kafka topics with proper consumer group semantics are more reliable than polling or fire-and-forget events.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The race condition manifested as a `UserFinance not found` error (related to TICKET-12661) when the dashboard tried to read user finance data before the user-service had finished creating it.
* The fix in the provisioning service (TICKET-14498) added a retry mechanism with exponential backoff before returning a success response.
* The vAccounts fix (TICKET-14281) ensured the BSS account creation event was only published after all required fields were populated.
* Arpit noted in the ticket: "we changed the flow in ppusd, Not needed anymore" — indicating the fix was also absorbed into the new prepaid USD flow design.
* **JIRA:** TICKET-14496 (wrapper, 5 story points), TICKET-14281 (BSS vaccounts), TICKET-14498 (provisioning service), TICKET-11223 (refactor signup package)
* **GitHub:** `Apidb 14281 signup vaccount sync new kafka topic (#3827)`, `TICKET-14281 signup race condition and 404`, `TICKET-11223 refactor package signup account (#227)`
* **SQL:** `20231018_1725__TICKET-12115_make_status_new_for_last_two_months_signups.sql`
* **Slack:** Thread between Arpit, Mohit, and Tasos — coordination on the fix
