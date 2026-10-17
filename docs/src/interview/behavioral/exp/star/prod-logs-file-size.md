# Production Log File Size: Diagnosing & Fixing a Disk Space Crisis

<-- [Back](./..)  
::: info About
**Production Log File Size: Diagnosing & Fixing a Disk Space Crisis**   
Amazon LP: <Badge type="warning" text="Operational Excellence" /> <Badge type="tip" text="Dive Deep, Bias for Action" />  
:::

## Situation

A production alert fired: the log file for Dashboard Services was growing unboundedly and approaching disk capacity (TICKET-16445 — "Dashboard Services - Prod logs file is too big"). If left unaddressed, the disk would fill up, causing service crashes across all Dashboard services (DevAPI, Scheduler, Autoreload, Customer Dashboard).

## Task

Diagnose the root cause of the log file growth and implement a fix across all affected services without a production outage.

## Action

* Investigated the logging configuration across DevAPI, Scheduler, Autoreload, and Customer Dashboard.
* Identified that log rotation was not configured correctly — logs were accumulating without rolling over.
* Implemented log rotation configuration fixes across all four services (TICKET-16445 GitHub PR: `TICKET-16445 prod log file becoming too big (#4267)` — covering devapi, scheduler, autoreload).
* Updated README files for all services to document the logging configuration (GitHub PR: `Readme files update (#3942)` — root, cd, devapi, autoreload, scheduler).
* Validated in QA before deploying to production.

## Result

* Log file growth stopped — disk usage stabilised within safe bounds.
* No production outage occurred.
* README documentation updated so future engineers understood the logging configuration.

## Learning

Learned that operational issues like disk space are often caused by missing configuration rather than code bugs. The fix was simple — but finding it required understanding the full logging stack across four services. Documentation prevents recurrence.

## Deeper Dive (Technical Detail from Jira/GitHub)

* **JIRA:** TICKET-16445 — "Dashboard Services - Prod logs file is too big"
* **GitHub:** `TICKET-16445 prod log file becoming too big (#4267)` (devapi, scheduler, autoreload), `Readme files update (#3942)` (root, cd, devapi, autoreload, scheduler)

## Context
