# APICM Ticket Automation: Eliminating Manual Deployment Ticket Creation

<-- [Back](./..)  
::: info About
**APICM Ticket Automation: Eliminating Manual Deployment Ticket Creation**.  
Amazon LP: <Badge type="warning" text="Invent and Simplify" /> <Badge type="tip" text="Deliver Results" />  
:::

## Situation

Every deployment of every service (Customer Dashboard BE/FE, User Service, Scheduler, Autoreload, DevAPI) required a manually created JIRA APICM deployment ticket. The team was creating dozens of these tickets per sprint — a repetitive, error-prone process that consumed developer time and introduced inconsistencies in ticket format.

## Task

Automate APICM deployment ticket creation via GitHub Actions workflows (TICKET-14964).

## Action

* Designed and implemented a GitHub Actions workflow (`pr-comment.yml`, `pr-instructions-common.yml`) that automatically creates an APICM deployment ticket when a PR is raised or merged.
* Added the workflow to the Dashboard Frontend repo (APIDB — "Add APICM GitHub Workflow for Dashboard Frontend Repo").
* Wrote the developer guide: "APICM Ticket Automation — Developer Guide" in Confluence — documenting how the automation works and how to extend it to new repos.
* Documented the "Automated APICM ticket creation" process in Confluence.

## Result

* Manual APICM ticket creation eliminated for all covered repos.
* Deployment tickets became consistent in format and content.
* Developer time saved: estimated 15–30 minutes per deployment cycle across the team.

## Learning

Learned that automation of repetitive processes has a compounding return — the time saved accumulates across every sprint, every team member, and every future deployment. The key is making the automation self-documenting so it can be extended by others.

## Deeper Dive (Technical Detail from Jira/GitHub)

* **JIRA:** TICKET-14964 — "Add git message on PR creation"; "Add APICM GitHub Workflow for Dashboard Frontend Repo"
* **GitHub:** `pr-comment.yml`, `pr-instructions-common.yml`, `update slack msg (#987)`
* **Confluence:** "APICM Ticket Automation — Developer Guide", "Automated APICM ticket creation"
