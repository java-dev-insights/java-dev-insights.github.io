# Kafka Topic Migration to AWS Hermes Cluster

<-- [Back](./..)  
::: info About
**Kafka Topic Migration to AWS Hermes Cluster**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Deliver Results" />  
**Ticket:** [EPIC-983](https://jira.vonage.com/browse/EPIC-983), TICKET-13772, TICKET-13773, TICKET-13682
:::

## Situation

Vonage's Customer Dashboard was publishing and consuming Kafka events on a legacy Softlayer-based Kiwi cluster. As part of the AWS migration strategy, all Kafka topics needed to be migrated to the new Hermes cluster in AWS. This affected multiple critical topics including email, fraud, marketing, Zoho invoices, NCCO user, and WebSocket notifications.

Vonage's Customer Dashboard services were running Kafka on a legacy Softlayer (SL) cluster. As part of the company-wide AWS migration strategy, all Kafka topics needed to move to the new AWS Hermes cluster. This was a high-risk operation: Kafka is the backbone of the dashboard's event-driven architecture, handling fraud detection, billing, marketing, notifications, and lifecycle events. Any disruption would cause data loss or service outages.

The Customer Dashboard was consuming Kafka topics from the legacy Kiwi cluster (Softlayer). As part of Vonage's cloud-first strategy, all Kafka topics needed to migrate to the Hermes cluster on AWS (EPIC EPIC-983). This affected six critical topics: `service_dashboard-email`, `service_dashboard-fraud`, `service_dashboard-marketing_user`, `service_dashboard-zoho-invoices`, `service_dashboard-ncco_user`, and `service_dashboard-ws_notifications`.

## Task

I was responsible for migrating the dashboard's Kafka producers and consumers from the Kiwi cluster to the Hermes AWS cluster, ensuring zero message loss and no service disruption.

Migrate all dashboard Kafka topics (EPIC-983 Epic) to AWS Hermes with zero data loss and zero downtime, covering services including `service_dashboard-email`, `service_dashboard-fraud`, `service_dashboard-marketing_user`, `service_dashboard-zoho-invoices`, `service_dashboard-ncco_user`, and `service_dashboard-ws_notifications`.

Migrate all six Kafka consumer groups from Kiwi to Hermes without message loss or consumer lag, and clean up the legacy cluster configuration.

## Action

I implemented a dual-cluster configuration — keeping the old Kiwi listeners active while adding new Hermes producers — to allow gradual traffic migration. I updated the `KafkaProducerFactory` and `KafkaSSConfiguration` to support two clusters simultaneously. I then progressively moved topics: `service_dashboard-email`, `service_dashboard-fraud`, `service_dashboard-marketing_user`, `service_dashboard-zoho-invoices`, `service_dashboard-ncco_user`, and `service_dashboard-ws_notifications`. Once all consumers were confirmed on Hermes, I removed the vBilling listeners from the Kiwi cluster (TICKET-13772/13773) and updated the Kafka broker configuration (TICKET-13682).

* Designed a dual-cluster migration strategy: temporarily ran producers on both SL and AWS clusters in parallel, then cut over consumers one topic at a time.
* Implemented `KafkaProducerConfiguration.java` changes to support dual-cluster publishing during the transition window.
* Created `clean_kafka_topics.sh` and `DeleteStaleKafkaGroupIdsWithScript.Jenkinsfile` to clean up stale consumer group IDs post-migration — preventing false Kafka lag alerts.
* Fixed a Grafana alert issue (TICKET-12037) where old group IDs were triggering false lag alerts after migration.
* Renamed consumer group IDs (TICKET-12039) and reverted SRE alerting for specific groups (TICKET-12040) to ensure clean monitoring post-migration.
* Removed vBilling listeners from the legacy Kiwi cluster (TICKET-13772, TICKET-13773) as the final cleanup step.
* Documented the full migration in Confluence: "[DONE] Migrate to Kafka Hermes Cluster in AWS".
* Updated Kafka broker configurations for all six topics to point to the Hermes cluster (TICKET-13682).
* Coordinated the stop of vBilling listeners on the Kiwi cluster (TICKET-13773) and their removal (TICKET-13772) in a sequenced, zero-downtime manner.
* Fixed false-positive Kafka lag alerts in the SRE alerting system that were firing for the `dashboard-vaccounts-sync` group ID during the transition (TICKET-12037, GitHub PR #3144 in `sre-alerting`).
* Created a `DeleteStaleKafkaGroupIds` Jenkins pipeline (TICKET-11968) and a `groupId purger` script for production (TICKET-12027) to clean up stale consumer group IDs left over from the migration.
* Updated Grafana dashboards to reflect the new cluster topology.

## Result

All dashboard Kafka topics were successfully migrated to AWS Hermes with no message loss. The legacy Kiwi cluster listeners were decommissioned, reducing operational complexity and aligning with the AWS-first infrastructure strategy.

* All dashboard Kafka topics successfully migrated to AWS Hermes with zero data loss and zero downtime.
* Eliminated dependency on the legacy Softlayer Kafka cluster, reducing infrastructure costs and operational complexity.
* Kafka lag alerts became accurate post-migration, improving on-call reliability.
* All six Kafka topics migrated to Hermes with no message loss and no consumer lag incidents.
* False-positive alerts eliminated, reducing on-call noise.
* The stale group ID cleanup pipeline became a reusable operational tool for the team.
* Kiwi cluster dependencies fully removed, enabling its eventual decommission.

## Learning

I learned that Kafka migrations require a careful dual-cluster transition period. The key insight was to never cut over producers and consumers simultaneously — always migrate consumers first, validate, then switch producers.

Learned that infrastructure migrations require as much care as feature development — the dual-cluster parallel-run pattern is a powerful technique for zero-downtime migrations. Also learned that cleaning up after a migration (stale group IDs, old alerts) is as important as the migration itself.

Kafka migrations require treating consumer group IDs as first-class infrastructure artefacts. I learned that stale group IDs are a silent operational hazard — they trigger lag alerts and confuse monitoring — and that building cleanup tooling as part of the migration (not after) is essential.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The `KafkaProducerFactory` was refactored to support two `ProducerFactory` beans — one for Kiwi, one for Hermes — with a configuration flag to switch between them.
* The `hq cluster in prod Jenkins` pipeline (TICKET-9408) was updated to support the new Hermes cluster configuration.
* Kafka lag alerts in Grafana were updated to exclude old group IDs during the transition (TICKET-12037).
* A `DeleteStaleKafkaGroupIds` Jenkins pipeline (TICKET-11968) was created to clean up stale consumer group IDs post-migration.
* A `groupId purger` script (TICKET-12027) was created for production cleanup.
* **JIRA Epic:** EPIC-983 — "Kafka Topic Migration to Hermes Cluster (AWS)"
* **JIRA:** TICKET-12037 (exclude false alerts), TICKET-12039 (rename groupID), TICKET-12040 (revert SRE alerting), TICKET-13772/13773 (remove vBilling listeners), TICKET-12027 (create groupId purger for Kafka prod), TICKET-11968 (add DeleteStaleKafkaGroupIds pipeline)
* **GitHub:** `EPIC-983 Release kafka hermes (#2484)`, `clean_kafka_topics.sh`, `DeleteStaleKafkaGroupIdsWithScript.Jenkinsfile`, `KafkaProducerConfiguration.java`
* **Confluence:** "[DONE] Migrate to Kafka Hermes Cluster in AWS"
