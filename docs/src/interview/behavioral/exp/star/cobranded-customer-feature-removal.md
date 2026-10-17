# Optus Co-Branded Dashboard: Feature Removal & Coupon Bug Fix

<-- [Back](./..)  
::: info About
**Optus Co-Branded Dashboard: Feature Removal & Coupon Bug Fix**.  
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Earn Trust, Deliver Results" />  
:::

## Situation

Vonage's Optus co-branded Customer Dashboard (a white-label product for the Australian telco) had accumulated features that were not appropriate for the Optus brand — pages and menu items that should not be visible to Optus users. Additionally, Optus customers were experiencing an `INTERNAL_SERVER_ERROR` when trying to load a 100-credit coupon (TICKET-14070), blocking a key onboarding flow.

## Task

Remove inappropriate features from the Optus co-branded dashboard (TICKET-17021, TICKET-13782) and fix the coupon loading bug (TICKET-14070).

## Action

* Implemented conditional menu rendering: `show menu link if NOT Optus` logic in the Dashboard frontend (TICKET-17021 — "Removal of the new dashboard changes for Optus co-branded dashboard").
* GitHub PR: `TICKET-17021 Optus Users (remove unwanted pages) (#2820)` — added `show menu link if NOT` conditional rendering.
* Disabled Pricing Download for all Optus Dashboard users (TICKET-13782).
* Investigated and fixed the 100-credit coupon `INTERNAL_SERVER_ERROR` (TICKET-14070) — traced to a missing configuration for the Optus org subscription.
* Coordinated with the Optus account team (PART-141 linked ticket) to validate the changes.

## Result

* Optus co-branded dashboard correctly showed only Optus-appropriate features.
* Coupon loading bug fixed — Optus customers could successfully apply the 100-credit coupon.
* Optus account team confirmed the changes met their requirements.

## Learning

Learned that white-label/co-branded products require careful feature flagging at the org subscription level. A single codebase serving multiple brands needs robust conditional rendering — not separate codebases.

## Deeper Dive (Technical Detail from Jira/GitHub)

* **JIRA:** TICKET-17021 (feature removal, linked to PART-141), TICKET-13782 (disable pricing download), TICKET-14070 (coupon bug)
* **GitHub:** `TICKET-17021 Optus Users (remove unwanted pages) (#2820)`
