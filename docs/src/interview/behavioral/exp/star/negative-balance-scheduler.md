# Scheduler : Automated Negative Balance Notification

<-- [Back](./..)  
::: info About
**Negative Balance Automation: Replacing a Manual Finance Process with a Scheduler Job**.  
**Automating Negative Balance Notifications (Scheduler Service Ownership)**.  
**Automated Negative Balance Notification Scheduler**   
Amazon LP: <Badge type="warning" text="Invent and Simplify" /> <Badge type="tip" text="Bias for Action" />  
:::

## Situation

Vonage's Finance team was manually identifying ~190,000 prepaid accounts with negative balances and sending reminder emails by hand. This was error-prone, time-consuming, and did not scale. There was no automated system to notify customers, escalate reminders, or stop notifications after a threshold.

Vonage's Finance team was manually identifying ~190,000 prepaid accounts with negative balances and sending reminder emails by hand. This was error-prone, time-consuming, and not scalable. There was no automated system, no audit trail, and no escalation path — accounts could remain negative indefinitely without action.

Vonage's Finance team was manually identifying and notifying ~190,000 prepaid customers with negative account balances — a time-consuming, error-prone process done on an ad-hoc basis. There was no automated system to send structured reminders, escalate after multiple missed payments, or disable notifications for accounts that had been through the full cycle.

## Task

I was tasked with designing and implementing a new scheduler job from scratch to automate the entire negative balance notification lifecycle, replacing the manual Finance process.

Design and implement an automated negative balance notification scheduler job (TICKET-15822 Epic) to replace the manual Finance process.

I took end-to-end ownership of designing and delivering an automated scheduler job to replace this manual process entirely (TICKET-15822). This was part of my 2025 objective to become the team's subject-matter expert on the Scheduler service.

## Action

I designed the job to run on the 10th, 18th, and 25th of each month, processing accounts in batches of 10,000 every 30 minutes to avoid database overload. I implemented three escalating reminder levels — after the 3rd reminder, the `negative_balance_notification` flag was set to `false` unless the balance was cleared. Notifications were sent to the primary user, manager, and finance email. I added a feature flag to disable emails in QA (TICKET-16211) to prevent test noise. I also wrote the full documentation for the job (TICKET-16005) and added Grafana metrics (`NegativeBalanceNotificationMetrics.java`) for production monitoring.

* Designed the job logic: check balance in quota service for all ~190K prepaid users, trigger notifications on the 10th, 18th, and 25th of each month, send reminders on the 1st, 2nd, and 3rd, run in batches of 10,000 every 30 minutes.
* Implemented the scheduler job in the Scheduler service, respecting the `Negative_balance_notification` flag to skip accounts that had completed the full cycle.
* Configured notification emails to go to Primary user, manager, and finance email.
* After 3 reminders, set `Negative_balance_notification = false` unless the account was re-enabled.
* Disabled email notifications in QA environment (TICKET-16211) to prevent test emails reaching real customers.
* Created documentation for the job (TICKET-16005).
* Fixed a related issue where `managerBalanceAndCreditLimitJob` was taking too long (TICKET-16386) — optimised the query and batch size.
* Wrote the discovery document and Confluence page ("Negative Balance Jobs — Details") defining the job logic, DB queries, and notification schedule.
* Implemented `prepaidAccountsIdentificationJob` in the Scheduler service (Java/Spring), querying `d_account_billing` and `d_topup_transaction` to identify accounts with balance < 0.
* Configured the job to run on the 10th, 18th, and 25th of each month, with three escalating reminder emails sent to the primary user, manager, and finance contact.
* Added logic to skip accounts where `negative_balance_notification = false` and to suspend accounts after three unanswered reminders.
* Raised GitHub PR #4139 with full unit test coverage; fixed a production page-size issue in the quota call post-deployment (TICKET-16211).
* Created documentation and Grafana alerts for the new job.

## Result

The Finance team's manual process was fully automated. The scheduler handled ~190K accounts per run, with zero manual intervention required. The documentation I wrote became the reference for the team's ownership of the scheduler service.

* Finance team's manual negative balance notification process fully automated.
* ~190,000 prepaid accounts now receive structured, timely notifications.
* Reduced Finance team operational overhead and improved consistency of customer communications.

* Fully automated a process that previously required manual Finance intervention for ~190K accounts.
* The job ran successfully in production on its first scheduled execution with no incidents.
* Finance team reported significant time savings; the process now has a full audit trail.
* I became the team's go-to person for Scheduler service questions, fulfilling my 2025 ownership objective.

## Learning

Building a batch job at scale taught me the importance of idempotency, batching strategy, and observability. I learned to think about failure modes — what happens if the job runs twice, or if the quota service is slow — and to build in safeguards like the `negative_balance_notification` flag.

Learned that automating a manual process requires understanding the *human* workflow first — the Finance team's ad-hoc approach had implicit rules (timing, escalation, opt-out) that needed to be made explicit in code. Documentation is essential when a job runs autonomously.

Owning a service end-to-end — from DB query design to deployment monitoring — gave me a much deeper appreciation for operational readiness. I learned to think beyond "does the code work?" to "what happens at 3 AM when this runs on 190K rows?"

## Deeper Dive (Technical Detail from Jira/GitHub)

* The job queried `d_account_billing` for accounts with `type_id=2` and negative balance in the quota service.
* Batch size of 10,000 with 30-minute intervals was chosen after load analysis to avoid RDS CPU spikes (related to TICKET-16721 RDS CPU high alert).
* `NegativeBalanceNotificationMetrics.java` was added to the `common-dashboard` module for Grafana tracking.
* The job was added to the existing Scheduler service (which Arpit owned as a 2025 personal objective), leveraging the XML-to-Java migration already completed.
* A production page-size bug in the quota call was identified and fixed post-deployment.
* **JIRA:** TICKET-15822 (13 story points, Epic) — "Add a scheduler job for negative balance check"; TICKET-16005 (documentation); TICKET-16211 (disable email in QA); TICKET-16386 (managerBalanceAndCreditLimitJob too slow)
* **GitHub:** `ScheduledTaskServiceImplTest.java`
* **Confluence:** "Negative Balance Jobs (Details)"
