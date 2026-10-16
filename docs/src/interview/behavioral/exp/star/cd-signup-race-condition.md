# CD Signup Race Condition Fix (Multi-Service Async Flow)

<-- [Back](./..)  
::: info About
**CD Signup Race Condition Fix (Multi-Service Async Flow)**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Are Right, A Lot" />  
**Ticket:** TICKET-14496, TICKET-14281, TICKET-14498
:::

## Situation

Vonage's customer signup flow involved multiple asynchronous services — Customer Dashboard, User Service, PHub (account creation), provisioning service, and vAccounts (BSS). A race condition was causing intermittent signup failures in production, where some services completed before others had finished initialising the account, leading to failed nightly regression tests and occasional customer-facing errors.

## Task

I was tasked with investigating the root cause of the race condition, mapping the full async signup flow, and implementing a fix across the affected services.

## Action

I traced the signup flow end-to-end across all five services, documenting the sequence of async events and identifying the exact timing window where the race condition occurred. I found that the BSS vAccounts service (TICKET-14281) and the provisioning service (TICKET-14498) were both responding to the same account creation event without coordination. I implemented ordering guarantees and retry logic to ensure downstream services waited for upstream completion signals before proceeding. I also updated the Confluence signup flow documentation.

## Result

The race condition was resolved. Nightly regression tests passed consistently post-fix. The fix also improved the reliability of the prepaid USD signup flow, which was being built concurrently.

## Learning

Debugging distributed async systems requires mapping the full event chain before touching any code. I learned to use Kafka consumer group lag metrics and Kibana logs together to pinpoint exactly where the timing gap occurred.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The race condition manifested as a `UserFinance not found` error (related to TICKET-12661) when the dashboard tried to read user finance data before the user-service had finished creating it.
* The fix in the provisioning service (TICKET-14498) added a retry mechanism with exponential backoff before returning a success response.
* The vAccounts fix (TICKET-14281) ensured the BSS account creation event was only published after all required fields were populated.
* Arpit noted in the ticket: "we changed the flow in ppusd, Not needed anymore" — indicating the fix was also absorbed into the new prepaid USD flow design.
