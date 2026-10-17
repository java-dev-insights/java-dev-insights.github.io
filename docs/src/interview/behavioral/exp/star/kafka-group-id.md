# Kafka Consumer Group UUID Fix (Production Lag Alert)

<-- [Back](./..)  
::: info About
**Kafka Consumer Group UUID Fix (Production Lag Alert)**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Bias for Action" />  
**Ticket:** TICKET-14429
:::

## Situation

The Clear Cache Event Listener in the Customer Dashboard was generating a new UUID as its Kafka consumer group ID on every restart. This meant each restart created a new consumer group, leaving the old one stale and triggering Kafka lag alerts in production — even though no messages were actually lagging. The operations team was receiving false-positive alerts, eroding trust in the alerting system.

## Task

I was responsible for fixing the consumer group ID generation to be stable across restarts, eliminating the false-positive lag alerts.

## Action

I investigated the `ClearCacheEntryKafkaListenerConfiguration` and found the group ID was generated as a random UUID at startup. I changed the group ID generation to use the allocation ID or host IP, ensuring that restarting an allocation would recreate the same group ID. I tested this in the canary instance by restarting the allocation and verifying that the Kafka lag returned to zero (rather than creating a new stale group). I also updated the Grafana alert to exclude the old group ID during the transition period.

## Result

Kafka lag alerts were no longer triggered by service restarts. The operations team's alert fatigue was reduced. The fix also improved the accuracy of Kafka lag monitoring across the dashboard services.

## Learning

Alert fatigue is a real operational risk — when alerts fire too often for non-issues, teams start ignoring them. I learned to treat false-positive alerts with the same urgency as real incidents.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The group ID was changed from `UUID.randomUUID().toString()` to `"clear-cache-" + System.getenv("ALLOCATION_ID")` (with a fallback to hostname).
* The log line `"[clearCacheEntryKafkaEventListener] Initializing clear cache kafka consumer factory with group ID:"` was used to verify the fix in QA.
* The Grafana alert exclusion (TICKET-12037) was a temporary measure during the transition, later removed once all instances had the new group ID.
* The `clean_kafka_topics.sh` script was also updated to handle the new stable group ID format.
