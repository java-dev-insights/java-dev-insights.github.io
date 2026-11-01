# User Service: PATCH Endpoint & Client Library

<-- [Back](./..)  
::: info About
**User Service: PATCH Endpoint & Client Library**   
Amazon LP: <Badge type="warning" text="Invent and Simplify" /> <Badge type="tip" text="Dive Deep" />  
**Ticket:** TICKET-12934, TICKET-13080
:::

## Situation

The User Service only supported full PUT updates for user records. This caused a critical bug: when the dashboard read a user from cache (which might be stale) and then updated a single field (e.g., setting status to `SUSPENDED`), it would overwrite other fields like `accountRef` with stale values, causing data corruption.

## Task

I was responsible for creating a new PATCH endpoint in the User Service that allowed partial updates — updating only the specified fields without affecting others — and then integrating it into the dashboard.

## Action

I implemented a PATCH endpoint in the `UserController` using JSON Patch (RFC 6902), which allowed callers to specify exactly which fields to update. I created a client library for the new endpoint and published it to Artifactory (TICKET-12934). I then integrated the PATCH endpoint into the dashboard (TICKET-13080), replacing the problematic full-update calls in the user suspension flow with targeted PATCH calls.

## Result

The data corruption bug caused by stale cache reads was eliminated. The PATCH endpoint became the standard for all partial user updates, reducing the risk of unintended field overwrites across the codebase.

## Learning

I learned that API design decisions (PUT vs. PATCH) have real downstream consequences for data integrity. The lesson was to always use the most specific operation available — PATCH for partial updates, PUT only for full replacements.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The PATCH endpoint used `JsonPatch` library for RFC 6902 compliance, allowing operations like `replace`, `add`, `remove` on individual user fields.
* Arpit commented in the ticket: "client library created here, link to artifactory here" — confirming the library was published and available for dashboard consumption.
* The integration in TICKET-13080 replaced the `updateUser` call in the suspension flow with `patchUser`, passing only the `status` field.
* The fix also addressed the `UserFinance not found` log errors (TICKET-12586) that were a symptom of the same stale-cache issue.
