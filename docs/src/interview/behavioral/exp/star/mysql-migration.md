# MySQL 5.7 → 8.0 Migration

<-- [Back](./..)  
::: info About
**MySQL 5.7 → 8.0 Migration: Schema Fixes, Missing Index & Performance Recovery**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Deliver Results" />  
**Ticket:** TICKET-16623 (Maintenance Banner), TICKET-16232 (QA Schema Fix), TICKET-16386 (Scheduler Performance), TICKET-17174 (Missing Index / RDS CPU)
:::

## Situation

AWS Aurora was ending support for MySQL 5.7, requiring Vonage's Customer Dashboard and User Service databases to be migrated to MySQL 8.0. MySQL 8.0 introduced several breaking changes: it removed the query cache entirely (which MySQL 5.7 had used implicitly), enforced stricter schema validation, and changed default behaviours around indexing and SQL mode. These changes caused a cascade of issues: nightly QA tests began failing with `GenericJDBCException` errors, a critical scheduler job that previously ran in 2 hours started taking 10+ hours, and production RDS CPU spiked to 97%+ due to full table scans on a high-traffic table that was missing an index.

## Task

I was responsible for diagnosing and fixing the MySQL 8.0 migration issues across three distinct problem areas: QA schema incompatibilities, scheduler performance degradation, and a production missing-index crisis causing RDS CPU alerts.

## Action

*Customer-facing maintenance banner (TICKET-16623):* I implemented a maintenance banner on the Customer Dashboard landing page to inform customers of the planned DB migration window, raising a PR ([#2610](https://github.com/vonage-technology/dashboard-frontend/pull/2610)) for the frontend component and coordinating with the Vonage status page team.

*QA schema fix (TICKET-16232):* I audited all dashboard DB tables in the QA environment for MySQL 8.0 schema incompatibilities causing `GenericJDBCException`. I fixed the schema issues using Flyway migration scripts ([PR #4216](https://github.com/vonage-technology/dashboard/pull/4216)), ensuring the QA environment matched the MySQL 8.0 schema expectations. Nightly tests resumed passing after the fix.

*Scheduler performance (TICKET-16386):* I investigated why `managerBalanceAndCreditLimitJob` had degraded from ~2 hours to 10+ hours after the MySQL 8.0 migration. I identified the root cause: MySQL 8.0 removed the query cache that MySQL 5.7 had used implicitly, meaning repeated calls to `userFinderServiceApi.getPrimaryUserForAccountReference()` inside the job loop were now hitting the database on every iteration instead of being served from cache. I replaced the repeated user-service calls with an `accountOwnerCache` lookup, eliminating the N+1 query pattern. I raised [PR #4250](https://github.com/vonage-technology/dashboard/pull/4250) and also added thread name logging to ease future debugging.

*Missing index / RDS CPU crisis (TICKET-17174):* Production RDS CPU was hitting 97%+ during peak hours, triggering OpsGenie alerts. I investigated using Kibana logs and identified two API calls causing full table scans on `d_topup_transaction`: (1) `/api/v1/braintree/webhook` calling `topUpTransactionFinder.getTopUpTransactionWithPaymentId` — the `paymentId` column had no index; (2) the payment summary page calling `topUpTransactionFinder.getTopUpTransaction` with a `requestId` where clause — also unindexed. I added the missing indexes via a Flyway migration script (Draft PR #4519), eliminating the full table scans.

## Result

The MySQL 8.0 migration was completed without customer-facing downtime. QA nightly tests resumed passing. The `managerBalanceAndCreditLimitJob` returned to its expected ~2-hour runtime. Production RDS CPU alerts were eliminated after the missing indexes were added. The maintenance banner kept customers informed throughout the migration window.

## Learning

Database version migrations are never just an infrastructure task — they have application-level consequences that only surface under production load. The MySQL 8.0 query cache removal was a silent performance regression that only became visible at scale. I learned to always review the "removed features" section of a database version's release notes before migration, and to treat any scheduler job performance change post-migration as a potential query cache dependency.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The `managerBalanceAndCreditLimitJob` degradation was confirmed in Kibana: `"Ending scheduled task managerBalanceAndCreditLimitJob - Time Taken [25195626ms]"` (~7 hours) vs. the expected ~2 hours. Arpit identified this in the ticket: "user-service MySQL5 → MySQL8 has removed default query caching."
* The MySQL 8.0 query cache retirement is documented at: `https://dev.mysql.com/blog-archive/mysql-8-0-retiring-support-for-the-query-cache/`
* The missing index on `d_topup_transaction.paymentId` was identified by Arpit in the ticket: "Identified below API calls in CD causing full table scan for `d_topup_transaction`: `/api/v1/braintree/webhook` when doing `topUpTransactionFinder.getTopUpTransactionWithPaymentId` as no index on column `paymentId`."
* The Flyway migration script added `CREATE INDEX idx_topup_txn_payment_id ON d_topup_transaction(paymentId)` and `CREATE INDEX idx_topup_txn_request_id ON d_topup_transaction(requestId)`.
* The GitHub commit 1330aef — "TICKET-16152 update LB urls for Pulse VPN: local container mysql8" — confirms the local development environment was also updated to use MySQL 8.0 containers for parity.
* A Teams message from Arpit (2026-08-24): `SHOW TABLES LIKE '%d_user' IN ACCOUNT;` — evidence of active production DB investigation during the migration.

## Context

**MySQL 5.7 → 8.0 migration** — TICKET-16623 (maintenance banner), TICKET-16232 (QA schema/Flyway fix), TICKET-16386 (scheduler job 10hrs→2hrs due to MySQL8 query cache removal), TICKET-17174 (missing index on `d_topup_transaction.paymentId` causing full table scans + RDS CPU alerts)

four interconnected problems from the same migration:
* **Maintenance banner** — customer communication for the migration window
* **QA schema fix** — Flyway migrations to resolve `GenericJDBCException` in nightly tests
* **Scheduler 10hrs→2hrs** — MySQL 8.0 removed query cache; fixed N+1 pattern with `accountOwnerCache`
* **Missing index / 97% RDS CPU** — `d_topup_transaction.paymentId` and `requestId` had no indexes, causing full table scans on every Braintree webhook and payment summary page load
