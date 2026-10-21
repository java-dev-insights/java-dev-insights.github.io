# User Service Migration to New Artifactory

<-- [Back](./..)  
::: info About
**User Service Migration to New Artifactory**   
Amazon LP: <Badge type="warning" text="Deliver Results" /> <Badge type="tip" text="Bias for Action" />  
**Ticket:** TICKET-14181, TICKET-14230, TICKET-14227, TICKET-14938, TICKET-14269
:::

## Situation

Vonage was migrating its artifact repository from the old Artifactory instance to a new one (`vcc`). The `user-service` and its client library needed to be migrated to fetch dependencies from and publish to the new Artifactory, while the `dashboard` needed to be updated to consume the new client library version.

The User Service was still publishing its client library (`us-client`) to the old Vonage Artifactory instance, which was scheduled for decommission. All dashboard projects needed to migrate to the new `vcc` Artifactory. The User Service had a complication: its Gradle wrapper version was too old to support the new Artifactory's publishing protocol (TICKET-14181).

The User Service was using an old Artifactory instance that was being decommissioned. All dashboard projects needed to migrate to the new `vcc` Artifactory. The User Service had additional complexity: it published a client library (`userservice-client`) consumed by Dashboard and Admin Dashboard — so the migration required coordinating changes across three repositories simultaneously.

## Task

I was responsible for the end-to-end migration of the `user-service` to the new Artifactory, including upgrading the Gradle wrapper, updating dependency resolution, publishing the new client library, and updating the dashboard to consume it.

Migrate the User Service and all its consumers (Customer Dashboard, Admin Dashboard) to the new Artifactory, including upgrading the Gradle wrapper and updating all dependency resolution configurations.

Migrate User Service to the new Artifactory (TICKET-14181 Epic), upgrade the Gradle wrapper (required for the new publish mechanism), and ensure all downstream consumers (Dashboard, Admin Dashboard) were updated to read from the new Artifactory.

## Action

I upgraded the Gradle wrapper version in `user-service` (TICKET-14227) — a prerequisite for publishing to the new Artifactory. I updated the dependency resolution configuration to fetch from the new Artifactory (TICKET-14230). I published the updated `us-client` library to the new Artifactory. I then updated the `dashboard` to consume the new `us-client` from the new Artifactory (TICKET-14269), and updated the Admin Dashboard (AD) similarly. I also created a transitional step (TICKET-14938) where the dashboard consumed the updated `us-client` from the old Artifactory during the migration window.

* Upgraded the Gradle wrapper version in the User Service to support the new Artifactory publishing protocol (TICKET-14227) — this was a prerequisite for all subsequent steps.
* Updated the User Service to fetch all dependencies from the new Artifactory (TICKET-14230).
* Published the updated `us-client` to the new Artifactory and updated the Customer Dashboard to consume it (TICKET-14269).
* Updated the Admin Dashboard similarly (TICKET-14269).
* Created a transitional step where the Dashboard consumed the updated `us-client` from the old Artifactory during the migration window (TICKET-14938), ensuring no service disruption.
* Verified the full dependency chain in QA before promoting to production.
* Upgraded the Gradle wrapper version in User Service (TICKET-14227) — a prerequisite for publishing to the new Artifactory.
* Migrated User Service to fetch all dependencies from the new `vcc` Artifactory (TICKET-14230), updating `build.gradle` and `settings.gradle`.
* Updated Dashboard to consume the updated `userservice-client` from the old Artifactory during the transition (TICKET-14938).
* Updated Dashboard and Admin Dashboard to read `userservice-client` from the new Artifactory (TICKET-14269).
* Validated the full build pipeline: User Service build → publish to vcc → Dashboard consumes → nightly tests pass.
* GitHub PR: `build(deployment): publish to vcc new artifactory (TICKET-14227) (#406)`, `TICKET-14230 fetch from new artifactory vcc (#373)`.

## Result

The `user-service` and its client library were successfully migrated to the new Artifactory. The dashboard and Admin Dashboard were updated to consume the new library. The old Artifactory dependency was fully removed.

* User Service fully migrated to new Artifactory with zero service disruption.
* Old Artifactory dependency eliminated, unblocking its decommission.
* The migration was completed in a carefully sequenced set of PRs that could be individually rolled back if needed.
* GitHub commit `33e53e1` in `user-service` marks the successful publish to `vcc` Artifactory.
* User Service fully migrated to new Artifactory — old Artifactory dependency eliminated.
* All downstream consumers (Dashboard, Admin Dashboard) updated without service disruption.
* Nightly tests passed post-migration, confirming end-to-end build pipeline integrity.

## Learning

Dependency migrations require careful sequencing — you can't update the consumer before the producer has published to the new location. I learned to use transitional steps (consuming from old Artifactory while publishing to new) to avoid breaking the build pipeline.

Infrastructure migrations that touch build systems require extra care because a broken build blocks the entire team. I learned to always create a "bridge" step (consuming from old Artifactory while publishing to new) to avoid a hard cutover that could leave the team unable to build.

Learned that library migrations require a "strangler fig" approach — keep the old and new working simultaneously until all consumers are updated. Rushing the cutover risks breaking downstream builds.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The Gradle wrapper upgrade (TICKET-14227) was from Gradle 6.x to 7.x, which required updating several deprecated API usages in the build scripts.
* The `us-client` library version was bumped to signal the Artifactory migration to consumers.
* GitHub workflows were updated (as noted in Arpit's 2025 objectives) to use the new Artifactory credentials from AWS Secrets Manager.
* **JIRA Epic:** TICKET-14181 — "User service migration to new Artifactory"
* **JIRA:** TICKET-14227 (Gradle wrapper), TICKET-14230 (fetch from new artifactory), TICKET-14938 (Dashboard consume from old), TICKET-14269 (Dashboard/AD from new)
* **GitHub:** `build(deployment): publish to vcc new artifactory (TICKET-14227) (#406)`, `TICKET-14230 fetch from new artifactory vcc (#373)`