# Kafka Consumer Group UUID Fix (Production Lag Alert)

<-- [Back](./..)  
::: info About
**Kafka Consumer Group UUID Fix (Production Lag Alert)**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Bias for Action" />  
**Ticket:** TICKET-14429
:::

## Situation

The Clear Cache Event Listener in the Customer Dashboard was generating a new UUID as its Kafka consumer group ID on every restart. This meant each restart created a new consumer group, leaving the old one stale and triggering Kafka lag alerts in production — even though no messages were actually lagging. The operations team was receiving false-positive alerts, eroding trust in the alerting system.

Every time the Customer Dashboard was restarted (e.g., during a deployment), the `ClearCacheEntryKafkaListener` generated a new UUID as its consumer group ID. This meant each restart created a new, orphaned consumer group in Kafka — the old group ID became stale and triggered Kafka lag alerts in OpsGenie, even though no actual message lag existed. The on-call team was receiving false-positive alerts on every deployment (TICKET-14429).

The Customer Dashboard's Clear Cache Event Listener was generating a new UUID as its Kafka consumer group ID on every restart. This meant that every time an allocation restarted (routine in a containerised environment), a new stale consumer group was left behind, triggering Kafka lag alerts in production. The on-call team was receiving false-positive alerts, eroding trust in the alerting system and causing alert fatigue.

## Task

I was responsible for fixing the consumer group ID generation to be stable across restarts, eliminating the false-positive lag alerts.

Fix the consumer group ID generation so that restarts reuse the same group ID, eliminating the false-positive lag alerts without changing the cache-clearing behaviour.

Diagnose the root cause of the false Kafka lag alerts (TICKET-14429) and implement a fix that produced stable, deterministic consumer group IDs across restarts.

## Action

I investigated the `ClearCacheEntryKafkaListenerConfiguration` and found the group ID was generated as a random UUID at startup. I changed the group ID generation to use the allocation ID or host IP, ensuring that restarting an allocation would recreate the same group ID. I tested this in the canary instance by restarting the allocation and verifying that the Kafka lag returned to zero (rather than creating a new stale group). I also updated the Grafana alert to exclude the old group ID during the transition period.

* Traced the `ClearCacheEntryKafkaListenerConfig` to find where the UUID was being generated.
* Investigated whether the allocation ID or host IP could be used as a stable, deterministic group ID component — confirming that the host IP was stable across restarts within the same allocation.
* Implemented the fix to use a deterministic group ID (based on host IP or allocation ID) instead of a random UUID, ensuring restarts reuse the same consumer group.
* Updated the SRE alerting configuration (building on the work from TICKET-12037) to correctly handle the group ID pattern.
* Validated in QA by performing multiple restarts and confirming no new stale group IDs were created.
* Traced the issue to `ClearCacheEntryKafkaListenerConfiguration` where `UUID.randomUUID()` was used as the group ID.
* Investigated alternatives: allocation ID and host IP as stable identifiers that survive restarts.
* Implemented a fix to use the allocation/host identifier as the group ID suffix, ensuring that restarting an allocation reuses the same group ID.
* Validated in canary: restarted the allocation, confirmed the same group ID was generated, and verified Kafka lag returned to zero.
* Added log statement `"[clearCacheEntryKafkaEventListener] Initializing clear cache kafka consumer factory with group ID:"` for future debugging.

## Result

Kafka lag alerts were no longer triggered by service restarts. The operations team's alert fatigue was reduced. The fix also improved the accuracy of Kafka lag monitoring across the dashboard services.

* False-positive Kafka lag alerts on deployment eliminated.
* On-call alert noise reduced, improving team confidence in the alerting system.
* The fix was simple (a one-line change to group ID generation) but had a disproportionate impact on operational quality.
* The root cause analysis was documented for future engineers working on Kafka listener configuration.
* False Kafka lag alerts in production eliminated.
* On-call alert fatigue reduced — the team could trust that a Kafka lag alert meant a real problem.
* The fix was generalised as a pattern for other Kafka listeners in the codebase.

## Learning

Alert fatigue is a real operational risk — when alerts fire too often for non-issues, teams start ignoring them. I learned to treat false-positive alerts with the same urgency as real incidents.

Alert fatigue is a real operational risk — when engineers stop trusting alerts, they miss real incidents. I learned that fixing false positives is as important as fixing real bugs, and that the root cause of a noisy alert is often a subtle configuration decision made without considering restart behaviour.

Learned that alert quality is as important as alert coverage. A false-positive alert is not just noise — it trains engineers to ignore alerts, which is dangerous. Fixing the root cause of false alerts is a high-value operational improvement.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The group ID was changed from `UUID.randomUUID().toString()` to `"clear-cache-" + System.getenv("ALLOCATION_ID")` (with a fallback to hostname).
* The log line `"[clearCacheEntryKafkaEventListener] Initializing clear cache kafka consumer factory with group ID:"` was used to verify the fix in QA.
* The Grafana alert exclusion (TICKET-12037) was a temporary measure during the transition, later removed once all instances had the new group ID.
* The `clean_kafka_topics.sh` script was also updated to handle the new stable group ID format.
* **JIRA:** TICKET-14429 (3 story points) — "CD - Kafka Consumer Group UUID causing lag on restart allocation"
* **Code:** `ClearCacheEntryKafkaListenerConfiguration` — consumer group ID fix
* **Related:** TICKET-12037 (exclude false alerts for kafka lag in hermes cluster), TICKET-12039 (rename groupID)