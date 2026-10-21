# DevRel Pricing API: Multi-Currency vPricing Migration

<-- [Back](./..)  
::: info About
**DevRel Pricing API: Multi-Currency vPricing Migration**   
Amazon LP: <Badge type="warning" text="Think Big" /> <Badge type="tip" text="Customer Obsession" />  
**Ticket:** TICKET-14896
:::

## Situation

As part of the Prepaid USD / multi-currency strategy, Vonage was migrating pricing management to a new system called vPricing. Customers who had been migrated to vPricing needed to receive appropriate error responses from the existing DevRel Pricing API, rather than incorrect pricing data from the old system.

## Task

I was responsible for modifying the DevRel Pricing API endpoints to detect whether a customer had been migrated to vPricing (via the PHub capability `rtc-voice-enable-vpricing`) and return the correct HTTP response codes accordingly.

## Action

I implemented a capability check in the API gateway routing layer that queried PHub for the `rtc-voice-enable-vpricing` capability. Based on the customer's migration status and the specific endpoint called, I returned the appropriate HTTP status codes: 406 (Not Acceptable) for endpoints not supported for vPricing customers, 403 (Forbidden) for endpoints where the customer lacked the required capability, and 200 for supported endpoints. I implemented this across all `get-pricing` and `get-prefix-pricing` endpoint variants.

## Result

vPricing customers received clear, actionable error responses instead of incorrect pricing data. The API gateway correctly routed requests based on migration status, supporting the phased rollout of vPricing without breaking existing integrations.

## Learning

API versioning and migration strategies require careful thought about backward compatibility. I learned to use capability flags as a clean mechanism for feature gating during migrations, rather than version-based routing.

## Deeper Dive (Technical Detail from Jira/GitHub)

* implemented the capability check in the API gateway.
* The response code matrix was: `get-pricing/outbound` → 406 (vPricing), 403 (no voice), 403 (no SMS); `get-pricing/outbound/sms` → 406, 200, 403; `get-pricing/outbound/voice` → 406, 403, 200.
* The PHub capability check used the existing `PlatformHubClient` (FeignClient) to query the `rtc-voice-enable-vpricing` capability.
