# Scheduler : Automated Negative Balance Notification

<-- [Back](./..)  
::: info About
**Automated Negative Balance Notification Scheduler**   
Amazon LP: <Badge type="warning" text="Invent and Simplify" /> <Badge type="tip" text="Bias for Action" />  
**Ticket:** [TICKET-15822](https://jira.vonage.com/browse/TICKET-15822), [TICKET-16005](https://jira.vonage.com/browse/TICKET-16005), [TICKET-16211](https://jira.vonage.com/browse/TICKET-16211)
:::

## Situation

Vonage's Finance team was manually identifying ~190,000 prepaid accounts with negative balances and sending reminder emails by hand. This was error-prone, time-consuming, and did not scale. There was no automated system to notify customers, escalate reminders, or stop notifications after a threshold.

## Task

I was tasked with designing and implementing a new scheduler job from scratch to automate the entire negative balance notification lifecycle, replacing the manual Finance process.

## Action

I designed the job to run on the 10th, 18th, and 25th of each month, processing accounts in batches of 10,000 every 30 minutes to avoid database overload. I implemented three escalating reminder levels — after the 3rd reminder, the `negative_balance_notification` flag was set to `false` unless the balance was cleared. Notifications were sent to the primary user, manager, and finance email. I added a feature flag to disable emails in QA (TICKET-16211) to prevent test noise. I also wrote the full documentation for the job (TICKET-16005) and added Grafana metrics (`NegativeBalanceNotificationMetrics.java`) for production monitoring.

## Result

The Finance team's manual process was fully automated. The scheduler handled ~190K accounts per run, with zero manual intervention required. The documentation I wrote became the reference for the team's ownership of the scheduler service.

## Learning

Building a batch job at scale taught me the importance of idempotency, batching strategy, and observability. I learned to think about failure modes — what happens if the job runs twice, or if the quota service is slow — and to build in safeguards like the `negative_balance_notification` flag.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The job queried `d_account_billing` for accounts with `type_id=2` and negative balance in the quota service.
* Batch size of 10,000 with 30-minute intervals was chosen after load analysis to avoid RDS CPU spikes (related to TICKET-16721 RDS CPU high alert).
* `NegativeBalanceNotificationMetrics.java` was added to the `common-dashboard` module for Grafana tracking.
* The job was added to the existing Scheduler service (which Arpit owned as a 2025 personal objective), leveraging the XML-to-Java migration already completed.
* A production page-size bug in the quota call was identified and fixed post-deployment.
