# Deutsche Telekom SSO Integration (DT IDP Migration)

<-- [Back](./..)  
::: info About
**DT CSP Domain Migration: Zero-Downtime URL Cutover**  
**Deutsche Telekom SSO Integration (DT IDP Migration)**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Earn Trust" />  
**Ticket:** TICKET-16458, TICKET-16483, TICKET-16487, TICKET-16493
:::

## Situation

Deutsche Telekom (DT), a major Vonage CSP (Communications Service Provider) partner, was migrating to their own Identity Provider (IDP) for SSO. Once migrated, DT would manage the full user lifecycle, meaning Vonage's dashboard should no longer allow users to modify their profile or addresses directly — those actions should redirect to DT's IDP at `https://auth.api.telekom.com/realms/dtmaceretail/account`.

Vonage's Deutsche Telekom (DT) co-branded Customer Dashboard was running on legacy `api.telekom.net` domains. DT required a full domain migration to new URLs across all services — Dashboard frontend, Developer Portal, static pages, VIAM routing, APIGW, and SSL certificates. This was a high-visibility migration affecting a major enterprise customer (DT) with strict SLA requirements.

Deutsche Telekom (DT), a major Vonage CSP (Communications Service Provider) partner, was migrating their users to their own Identity Provider (IDP) using SSO. Once migrated, DT would manage the full user lifecycle — meaning Vonage's Customer Dashboard needed to stop allowing DT users to edit their profile and addresses directly, and instead redirect them to DT's IDP portal (EPIC EPIC-1347).

## Task

I was responsible for implementing the SSO integration changes in the Customer Dashboard: hiding/redirecting My Profile and My Addresses pages for DT users, redirecting user invite emails to the DT IDP, and fixing 2FA phone numbers on affected CSP DT accounts.

Lead the technical implementation of the DT domain migration (EPIC-1435 Epic) across all affected services, ensuring zero downtime and backward compatibility during the transition.

Implement SSO integration changes for DT across multiple tickets: hide/redirect My Profile and My Addresses for DT users, handle user invite email redirects, fix 2FA phone numbers on CSP DT accounts, and ensure the domain name change was handled cleanly.

## Action

I modified the hamburger menu navigation to conditionally hide My Profile and My Addresses links for DT-branded users, replacing them with redirects to the DT IDP URL. I updated the user invite email flow (TICKET-16483) to redirect DT users to the DT IDP instead of the standard Vonage onboarding flow. I also fixed 2FA phone numbers on specific CSP DT accounts (TICKET-16493) that had been incorrectly configured. I coordinated directly with the DT team (Nicolas Altrien-Buffaral) to confirm the correct redirect URLs.

* Updated Dashboard frontend URLs for DT co-branded dashboard (TICKET-14069, TICKET-13152).
* Updated VIAM routing for Dashboard, Developer Portal, static pages, and 5G-slice (multiple APIDB tickets under EPIC-1347 and EPIC-1435).
* Implemented support for both old and new domains simultaneously during the transition period (APIDB CSP DT - dashboard - support old and new domains).
* Updated Developer Portal CMS (APIDB CSP DT - Dashboard URL update in developer-portal-cms).
* Coordinated new wildcard SSL certificate provisioning and TLS cert approval (APIDB CSP DT - Prod - New wildcard SSL certificate for telekom, TLS cert approval and DNS point to APIGW).
* Configured new IAP (Identity-Aware Proxy) for new domains (APIDB CSP DT - Prod - Dashboard (vng telekom) - New IAP configuration for new domains).
* Removed all references to `api.telekom.net` and subdomains after cutover (APIDB CSP DT - remove api.telekom.net and subdomains).
* Fixed DT SSO integration issues: enabled My Profile page for password changes (TICKET-12909), implemented read-only My Addresses for SSO users (TICKET-16487), redirected user invite emails to DT IDP (TICKET-16483).
* Implemented UI changes to hide the My Addresses and My Profile edit links for DT SSO users, replacing them with redirects to `https://auth.api.telekom.com/realms/dtmaceretail/account` (TICKET-16458, TICKET-16487).
* Updated the user invite email flow to redirect DT users to the DT IDP instead of the Vonage password reset flow (TICKET-16483).
* Fixed 2FA phone numbers on specific CSP DT accounts that had incorrect data (TICKET-16493).
* Handled the account rename/delete flow for SSO re-use cases where a user needed to log in with a specific email already associated with a different API key (TICKET-13960).
* Enabled the My Profile password change page specifically for DT users (TICKET-12909).
* Coordinated directly with the DT technical team to validate redirect URLs and confirm the migration timeline.

## Result

DT users were seamlessly redirected to their own IDP for profile management, meeting DT's contractual requirement. The invite email flow was updated without disrupting existing DT users. The integration was delivered on schedule for the DT IDP migration go-live.

* DT domain migration completed with zero downtime — DT customers experienced no service interruption.
* All legacy `api.telekom.net` references removed from the codebase.
* DT SSO integration improved with correct profile page behaviour for SSO users.
* DT SSO integration delivered on schedule, enabling DT to manage their user lifecycle independently.
* Zero reported login failures post-migration for DT users.
* The clean separation of DT-specific UI behaviour from the standard dashboard reduced future maintenance complexity.

## Learning

Working with a major enterprise partner's SSO integration taught me the importance of clear API contracts and redirect URL validation. I also learned to manage stakeholder expectations when requirements evolve mid-sprint (the initial spec changed from "hide pages" to "redirect to DT IDP").

Learned that enterprise customer migrations require meticulous coordination across infrastructure, security (SSL/TLS), routing (APIGW/VIAM), and application layers. The "support old and new domains simultaneously" pattern is essential for zero-downtime cutovers.

Enterprise partner integrations require treating the partner's technical constraints as requirements, not obstacles. I learned to build in explicit coordination checkpoints with external teams and to always validate redirect URLs in a staging environment before production.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The DT IDP redirect URL was `https://auth.api.telekom.com/realms/dtmaceretail/account` — confirmed by the DT team after a coordination call.
* The conditional logic used the existing CSP/organisation configuration to identify DT-branded users.
* TICKET-16493 required direct database-level fixes for 2FA phone numbers on specific accounts — a production data fix coordinated with the DT team.
* The EPIC-1347 (CSP DT domain name change) was the broader context, with Arpit's tickets being the dashboard-side implementation.
* **JIRA Epics:** EPIC-1435 (CSP DT domain migration), EPIC-1347 (CPAAS update URLs for dashboard)
* **JIRA:** TICKET-12909 (DT My Profile), TICKET-16483 (DT IDP redirect), TICKET-16487 (DT SSO read-only addresses), TICKET-13960 (rename/delete account for SSO reuse)
* **GitHub PRs:** `EPIC-1347 cpaas update urls for dashboard new domains (#1475) (#1483)`, `TICKET-13152 CSP DT - Developer Portal url update`, `TICKET-14069 please update urls in dt co branded dashboard`
