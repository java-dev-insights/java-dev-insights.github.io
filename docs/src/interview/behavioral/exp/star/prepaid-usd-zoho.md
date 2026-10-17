# Prepaid USD Multi-Currency Launch: Zoho & Email Templates

<-- [Back](./..)  
::: info About
**Prepaid USD Multi-Currency Launch: Zoho & Email Templates**   
Amazon LP: <Badge type="warning" text="Deliver Results" /> <Badge type="tip" text="Think Big" />  
**Ticket:** EPIC-1516, TICKET-14686, TICKET-14744, TICKET-14950, TICKET-14760, TICKET-15215
:::

## Situation

Vonage was launching Prepaid USD — a strategic initiative to expand into the US market with local currency support. This required updating the Zoho CRM integration to handle multi-currency accounts, updating all payment email templates to display the correct currency, and ensuring bank transfer details for USD accounts were correctly shown in both QA and production.

## Task

I was responsible for the Zoho and email template components of the Prepaid USD launch — adding currency to Zoho customer account creation, updating payment email templates, and fixing bank transfer details for USD accounts.

## Action

I added the `currency` field to the Zoho customer account creation API call (TICKET-14686), ensuring USD accounts were correctly tagged in Zoho from the moment of creation. I updated all payment email templates (TICKET-14744) to include the account currency, so customers received emails showing USD amounts rather than EUR. I deployed the bank transfer details for USD accounts to QA (TICKET-14950) and production (TICKET-14760), and fixed a template mismatch between QA and PROD environments (TICKET-15215) that was causing inconsistent customer communications.

## Result

The Prepaid USD launch had correct Zoho CRM data and accurate email communications from day one. The template mismatch fix prevented customer confusion about bank transfer details. The Zoho integration supported the multi-currency strategy without requiring manual data correction.

## Learning

I learned that multi-currency launches have a long tail of integration points — CRM, email templates, bank transfer details — each of which can independently cause customer confusion if not updated. I now advocate for a "currency audit" checklist for any new currency rollout.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The Zoho API call was updated to pass `currency: "USD"` in the account creation payload, using the existing `AccountCurrencyCache` (which was also refactored in TICKET-15310).
* Email templates were updated in the `notification-templates` repository to conditionally display the currency symbol based on the account's currency field.
* The QA/PROD template mismatch (TICKET-15215) was caused by a deployment ordering issue — the QA templates had been updated but the PROD deployment had used an older template version.
* The `AccountCurrencyCache` refactor (TICKET-15310) was done in parallel to ensure the cache correctly reflected USD accounts before the USD deploy.
