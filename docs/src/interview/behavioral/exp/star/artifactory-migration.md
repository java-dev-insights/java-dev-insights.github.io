# User Service Migration to New Artifactory

<-- [Back](./..)  
::: info About
**User Service Migration to New Artifactory**   
Amazon LP: <Badge type="warning" text="Deliver Results" /> <Badge type="tip" text="Bias for Action" />  
**Ticket:** TICKET-14181, TICKET-14230, TICKET-14227, TICKET-14938, TICKET-14269
:::

## Situation

Vonage was migrating its artifact repository from the old Artifactory instance to a new one (`vonagecc`). The `user-service` and its client library needed to be migrated to fetch dependencies from and publish to the new Artifactory, while the `dashboard` needed to be updated to consume the new client library version.

## Task

I was responsible for the end-to-end migration of the `user-service` to the new Artifactory, including upgrading the Gradle wrapper, updating dependency resolution, publishing the new client library, and updating the dashboard to consume it.

## Action

I upgraded the Gradle wrapper version in `user-service` (TICKET-14227) — a prerequisite for publishing to the new Artifactory. I updated the dependency resolution configuration to fetch from the new Artifactory (TICKET-14230). I published the updated `us-client` library to the new Artifactory. I then updated the `dashboard` to consume the new `us-client` from the new Artifactory (TICKET-14269), and updated the Admin Dashboard (AD) similarly. I also created a transitional step (TICKET-14938) where the dashboard consumed the updated `us-client` from the old Artifactory during the migration window.

## Result

The `user-service` and its client library were successfully migrated to the new Artifactory. The dashboard and Admin Dashboard were updated to consume the new library. The old Artifactory dependency was fully removed.

## Learning

Dependency migrations require careful sequencing — you can't update the consumer before the producer has published to the new location. I learned to use transitional steps (consuming from old Artifactory while publishing to new) to avoid breaking the build pipeline.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The Gradle wrapper upgrade (TICKET-14227) was from Gradle 6.x to 7.x, which required updating several deprecated API usages in the build scripts.
* The `us-client` library version was bumped to signal the Artifactory migration to consumers.
* GitHub workflows were updated (as noted in Arpit's 2025 objectives) to use the new Artifactory credentials from AWS Secrets Manager.
