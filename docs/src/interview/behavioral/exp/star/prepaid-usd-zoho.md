# Prepaid USD Multi-Currency Launch: Zoho & Email Templates

<-- [Back](./..)  
::: info About
**Prepaid USD Multi-Currency: Zoho CRM & Email Template Integration**.  
**Prepaid USD Multi-Currency Launch: Zoho & Email Templates**   
Amazon LP: <Badge type="warning" text="Deliver Results" /> <Badge type="tip" text="Think Big" />  
**Ticket:** EPIC-1516, TICKET-14686, TICKET-14744, TICKET-14950, TICKET-14760, TICKET-15215
:::

## Situation

Vonage was launching Prepaid USD — a strategic initiative to expand into the US market with local currency support. This required updating the Zoho CRM integration to handle multi-currency accounts, updating all payment email templates to display the correct currency, and ensuring bank transfer details for USD accounts were correctly shown in both QA and production.

Vonage was expanding its Customer Dashboard to support USD as a payment currency (Prepaid USD product). However, the Zoho CRM integration and all payment email templates were hardcoded for EUR. USD customers were receiving incorrect bank transfer details, wrong currency symbols in emails, and Zoho accounts were being created without currency information — causing confusion and support tickets.

## Task

I was responsible for the Zoho and email template components of the Prepaid USD launch — adding currency to Zoho customer account creation, updating payment email templates, and fixing bank transfer details for USD accounts.

Extend the Zoho integration and email template system to support multi-currency (EPIC-1516 Epic), specifically adding USD support for bank transfer details, Zoho customer account creation, and all payment-related email templates.

## Action

I added the `currency` field to the Zoho customer account creation API call (TICKET-14686), ensuring USD accounts were correctly tagged in Zoho from the moment of creation. I updated all payment email templates (TICKET-14744) to include the account currency, so customers received emails showing USD amounts rather than EUR. I deployed the bank transfer details for USD accounts to QA (TICKET-14950) and production (TICKET-14760), and fixed a template mismatch between QA and PROD environments (TICKET-15215) that was causing inconsistent customer communications.

* Added currency field to Zoho customer account creation (TICKET-14686) — ensuring USD accounts were correctly tagged in CRM.
* Updated all payment email templates to include account currency (TICKET-14744) — bank transfer details, receipts, and notifications.
* Fixed bank transfer details for USD accounts in QA (TICKET-14950) and PROD (TICKET-14760).
* Resolved a template mismatch between QA and PROD environments (TICKET-15215) that was causing inconsistent email content.
* Refactored `AccountCurrencyCache` before the USD deploy (TICKET-15310) to support multi-currency lookups efficiently.

## Result

The Prepaid USD launch had correct Zoho CRM data and accurate email communications from day one. The template mismatch fix prevented customer confusion about bank transfer details. The Zoho integration supported the multi-currency strategy without requiring manual data correction.

* USD Prepaid customers received correct bank transfer details and currency-specific email communications.
* Zoho CRM accurately reflected customer currency, enabling Finance and Sales teams to segment USD customers correctly.
* Template mismatch between QA and PROD resolved, improving deployment confidence.

## Learning

I learned that multi-currency launches have a long tail of integration points — CRM, email templates, bank transfer details — each of which can independently cause customer confusion if not updated. I now advocate for a "currency audit" checklist for any new currency rollout.

Learned that multi-currency support is a cross-cutting concern that touches every layer of the stack — from database schema to CRM integration to email templates. A seemingly simple "add USD" requirement requires a systematic audit of all currency-dependent code paths.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The Zoho API call was updated to pass `currency: "USD"` in the account creation payload, using the existing `AccountCurrencyCache` (which was also refactored in TICKET-15310).
* Email templates were updated in the `notification-templates` repository to conditionally display the currency symbol based on the account's currency field.
* The QA/PROD template mismatch (TICKET-15215) was caused by a deployment ordering issue — the QA templates had been updated but the PROD deployment had used an older template version.
* The `AccountCurrencyCache` refactor (TICKET-15310) was done in parallel to ensure the cache correctly reflected USD accounts before the USD deploy.
* **JIRA Epic:** EPIC-1516 — "CD - Prepaid USD - Zoho Support (Multi-currency Support)"
* **JIRA:** TICKET-14686 (Zoho currency), TICKET-14744 (email templates), TICKET-14950 (QA bank transfer), TICKET-14760 (PROD bank transfer), TICKET-15215 (template mismatch), TICKET-15310 (AccountCurrencyCache refactor)
