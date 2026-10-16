# Kafka Topic Migration to AWS Hermes Cluster

<-- [Back](./..)  
::: info About
**Kafka Topic Migration to AWS Hermes Cluster**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Deliver Results" />  
**Ticket:** [EPIC-983](https://jira.vonage.com/browse/EPIC-983), TICKET-13772, TICKET-13773, TICKET-13682
:::

## Situation

Vonage's Customer Dashboard was publishing and consuming Kafka events on a legacy Softlayer-based Kiwi cluster. As part of the AWS migration strategy, all Kafka topics needed to be migrated to the new Hermes cluster in AWS. This affected multiple critical topics including email, fraud, marketing, Zoho invoices, NCCO user, and WebSocket notifications.

## Task

I was responsible for migrating the dashboard's Kafka producers and consumers from the Kiwi cluster to the Hermes AWS cluster, ensuring zero message loss and no service disruption.

## Action

I implemented a dual-cluster configuration — keeping the old Kiwi listeners active while adding new Hermes producers — to allow gradual traffic migration. I updated the `KafkaProducerFactory` and `KafkaSSConfiguration` to support two clusters simultaneously. I then progressively moved topics: `service_dashboard-email`, `service_dashboard-fraud`, `service_dashboard-marketing_user`, `service_dashboard-zoho-invoices`, `service_dashboard-ncco_user`, and `service_dashboard-ws_notifications`. Once all consumers were confirmed on Hermes, I removed the vBilling listeners from the Kiwi cluster (TICKET-13772/13773) and updated the Kafka broker configuration (TICKET-13682).

## Result

All dashboard Kafka topics were successfully migrated to AWS Hermes with no message loss. The legacy Kiwi cluster listeners were decommissioned, reducing operational complexity and aligning with the AWS-first infrastructure strategy.

## Learning

I learned that Kafka migrations require a careful dual-cluster transition period. The key insight was to never cut over producers and consumers simultaneously — always migrate consumers first, validate, then switch producers.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The `KafkaProducerFactory` was refactored to support two `ProducerFactory` beans — one for Kiwi, one for Hermes — with a configuration flag to switch between them.
* The `hq cluster in prod Jenkins` pipeline (TICKET-9408) was updated to support the new Hermes cluster configuration.
* Kafka lag alerts in Grafana were updated to exclude old group IDs during the transition (TICKET-12037).
* A `DeleteStaleKafkaGroupIds` Jenkins pipeline (TICKET-11968) was created to clean up stale consumer group IDs post-migration.
* A `groupId purger` script (TICKET-12027) was created for production cleanup.
