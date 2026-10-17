# Deutsche Telekom SSO Integration (DT IDP Migration)

<-- [Back](./..)  
::: info About
**Deutsche Telekom SSO Integration (DT IDP Migration)**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Earn Trust" />  
**Ticket:** TICKET-16458, TICKET-16483, TICKET-16487, TICKET-16493
:::

## Situation

Deutsche Telekom (DT), a major Vonage CSP (Communications Service Provider) partner, was migrating to their own Identity Provider (IDP) for SSO. Once migrated, DT would manage the full user lifecycle, meaning Vonage's dashboard should no longer allow users to modify their profile or addresses directly — those actions should redirect to DT's IDP at `https://auth.api.telekom.com/realms/dtmaceretail/account`.

## Task

I was responsible for implementing the SSO integration changes in the Customer Dashboard: hiding/redirecting My Profile and My Addresses pages for DT users, redirecting user invite emails to the DT IDP, and fixing 2FA phone numbers on affected CSP DT accounts.

## Action

I modified the hamburger menu navigation to conditionally hide My Profile and My Addresses links for DT-branded users, replacing them with redirects to the DT IDP URL. I updated the user invite email flow (TICKET-16483) to redirect DT users to the DT IDP instead of the standard Vonage onboarding flow. I also fixed 2FA phone numbers on specific CSP DT accounts (TICKET-16493) that had been incorrectly configured. I coordinated directly with the DT team (Nicolas Altrien-Buffaral) to confirm the correct redirect URLs.

## Result

DT users were seamlessly redirected to their own IDP for profile management, meeting DT's contractual requirement. The invite email flow was updated without disrupting existing DT users. The integration was delivered on schedule for the DT IDP migration go-live.

## Learning

Working with a major enterprise partner's SSO integration taught me the importance of clear API contracts and redirect URL validation. I also learned to manage stakeholder expectations when requirements evolve mid-sprint (the initial spec changed from "hide pages" to "redirect to DT IDP").

## Deeper Dive (Technical Detail from Jira/GitHub)

* The DT IDP redirect URL was `https://auth.api.telekom.com/realms/dtmaceretail/account` — confirmed by the DT team after a coordination call.
* The conditional logic used the existing CSP/organisation configuration to identify DT-branded users.
* TICKET-16493 required direct database-level fixes for 2FA phone numbers on specific accounts — a production data fix coordinated with the DT team.
* The EPIC [EPIC-1347](https://jira.vonage.com/browse/EPIC-1347) (CSP DT domain name change) was the broader context, with Arpit's tickets being the dashboard-side implementation.
