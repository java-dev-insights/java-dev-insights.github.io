# OneTrust Cookie Banner Migration (GDPR Compliance)

<-- [Back](./..)  
::: info About
**OneTrust Cookie Banner Migration (GDPR Compliance)**   
Amazon LP: <Badge type="warning" text="Insist on the Highest Standards" /> <Badge type="tip" text="Customer Obsession" />  
**Ticket:** TICKET-12921, TICKET-14215
:::

## Situation

Vonage's Customer Dashboard was using an old version of the OneTrust cookie banner served via Google Tag Manager (GTM). The company needed to migrate to a new script managed by Adobe Tag Manager, and the old GTM code needed to be removed. This was a GDPR compliance requirement affecting all dashboard variants (Vonage, DT, Optus).

## Task

I was responsible for implementing the new OneTrust cookie banner in QA (TICKET-12921) and then removing the old GTM code from the frontend after the new banner went live in production (TICKET-14215).

## Action

I worked with Greg Frileux to remove the old cookie banner in QA and implement the new Adobe Tag Manager script. I developed a strategy for handling multiple CSP variants (Vonage, DT, Optus) — each required a different OneTrust configuration. I coordinated with Eeshat Gupta to determine the correct handling for each CSP. Once the new banner was validated in production, I removed all GTM code from the CD frontend (TICKET-14215).

## Result

The Customer Dashboard was compliant with the new OneTrust cookie banner standard across all CSP variants. The old GTM code was fully removed, reducing the frontend bundle size and eliminating the dependency on the legacy cookie management system.

## Learning

GDPR compliance changes in multi-tenant systems (multiple CSPs) require careful per-tenant configuration management. I learned to treat each CSP as a separate deployment target with its own compliance requirements.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The OneTrust script was loaded conditionally based on the CSP configuration, with different OneTrust domain IDs for Vonage, DT, and Optus.
* The GTM removal (TICKET-14215) required auditing all GTM-dependent analytics events to ensure they were migrated to the new Adobe Tag Manager before removal.
* The `legal links` feature (TICKET-13818) was implemented in parallel, adding a dedicated legal links section to the dashboard footer.
