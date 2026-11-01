# Dashboard Cache Reliability & Redis Expiration Fix

<-- [Back](./..)  
::: info About
**Dashboard Cache Resilience: Fixing Expiration Issues & Jenkins Pipeline**.  
**Dashboard Cache Reliability & Redis Expiration Fix**   
Amazon LP: <Badge type="warning" text="Operational Excellence" /> <Badge type="tip" text="Dive Deep" />  
:::

## Situation

The Customer Dashboard was experiencing sporadic cache-related issues: stale data being served to users after account updates, and cache entries not expiring correctly. Investigation revealed that many Redis cache beans were configured with `AFTER_READ` expiration strategy instead of `AFTER_WRITE`, meaning a frequently-read cache entry could live indefinitely (TICKET-14121). Additionally, there was no Jenkins pipeline to manually clear specific cache keys in production when needed (TICKET-14122).

The Customer Dashboard's caching layer was experiencing expiration issues (TICKET-14121) — cached data was not being invalidated correctly after account updates, causing customers to see stale data (wrong balance, wrong account status). Additionally, there was no operational tool to manually clear the cache in production when needed, forcing engineers to restart services as a blunt instrument.

## Task

Fix the cache expiration strategy across all affected cache beans, add `deleteAfterLogout` for user-specific caches, and build operational tooling to manage the cache in production.

Fix the cache expiration logic (TICKET-14121) and build a Jenkins pipeline to allow controlled cache clearing in production (TICKET-14122).

## Action

* Audited all cache bean configurations in `DashboardCacheCommonConfiguration` and `DashboardCacheConfigurationMany`, identifying all beans using the incorrect `AFTER_READ` strategy.
* Updated all affected beans to `AFTER_WRITE` expiration and added `deleteAfterLogout(true)` for user-specific caches (e.g., `organisationSettingsCache`, `viamTokenCache`, `getOrganisationById`).
* Built Jenkins pipelines for QA and Production to list cache keys by name and delete specific keys on demand (TICKET-14122).
* Validated the fix by monitoring Kibana logs for the `[load] calling cache loader for key={}` pattern to confirm cache refresh behaviour.
* Also investigated and fixed the `clear_cache_entry` Kafka topic flow that was causing accounts to not be upgraded after top-up (TICKET-13879), creating a new `service_dashboard-clear_cache_entry` topic and `ClearCacheEntryListener`.
* Diagnosed the cache expiration bug: the `AccountCurrencyCache` and related caches were not respecting TTL correctly under certain update patterns.
* Fixed the expiration logic (TICKET-14121) and added the `clearCacheEvent` Kafka topic consumer to handle cache invalidation triggered by account updates (TICKET-13879 — "Account not upgraded after topup (clearCacheEvent)").
* Built a Jenkins pipeline (TICKET-14122) that allowed the team to clear specific cache keys or the entire cache without a service restart.
* Fixed the `AccountsClient` to use `FeignClient` instead of `HttpRequester` (TICKET-15740) — improving connection pooling and timeout handling.
* Fixed a cache dependency issue (TICKET-16322) that was causing cascading cache failures.

## Result

* Stale cache issues eliminated; users now see updated account state immediately after changes.
* The Jenkins cache-management pipelines gave the team an operational lever that didn't exist before.
* The `clear_cache_entry` fix resolved a customer-reported issue where accounts remained in "upgrade required" state after topping up.
* Cache expiration issues resolved — customers saw up-to-date account data after top-ups and account changes.
* Jenkins cache-clearing pipeline gave the team a surgical tool for production incidents, reducing MTTR.
* `FeignClient` migration improved resilience of downstream service calls.

## Learning

Cache bugs are insidious because they're intermittent and hard to reproduce. I learned to treat cache configuration as production-critical code, not boilerplate, and to always build operational tooling alongside new cache infrastructure.

Learned that caching bugs are particularly insidious because they cause intermittent, hard-to-reproduce issues. The key is to have both correct expiration logic *and* an operational escape hatch (the Jenkins pipeline) for when things go wrong in production.

## Deeper Dive (Technical Detail from Jira/GitHub)

* **JIRA:** TICKET-14121 (cache expiration fix), TICKET-14122 (Jenkins pipeline), TICKET-13879 (clearCacheEvent), TICKET-15740 (FeignClient migration), TICKET-16322 (cache dependency fix)
* **GitHub:** `config_customer_dashboard.py`, `TICKET-16322` related PRs
