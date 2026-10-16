# Paypal Auth with SIFT Fraud Check

<-- [Back](./..)  
::: info About
**Fraud Prevention: PayPal Authorization-Only Flow with SIFT Integration**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Customer Obsession" />  
**Ticket:** [TICKET-16377](https://jira.vonage.com/browse/TICKET-16377), [TICKET-16847](https://jira.vonage.com/browse/TICKET-16847), [TICKET-16893](https://jira.vonage.com/browse/TICKET-16893)
:::

## Situation

Vonage's payment platform was suffering from a critical fraud gap: PayPal transactions via Braintree were always settled immediately, even when SIFT's fraud-detection engine flagged them as high-risk. This meant fraudulent payments were captured before any intervention was possible, leading to PayPal disputes, financial losses, and reputational damage with PayPal as a payment partner.

## Task

I was assigned to design and implement an Authorization-Only PayPal flow — a fundamental change to the payment lifecycle — so that SIFT's fraud decision could conditionally void or settle a transaction before funds were captured.

## Action

I led the full-stack implementation across the backend (Java/Spring) and frontend (Angular). On the backend, I changed the Braintree integration to use `AUTHORIZE` instead of `SALE` for PayPal transactions, then built a conditional settlement service that called SIFT's payment workflow API and, based on the decision (`ALLOW` / `BLOCK`), either submitted the transaction for settlement or voided it. I also built the failure-scenario frontend (TICKET-16893) to surface a meaningful KYC-linked error page when a payment was blocked. I wrote SQL test queries for QA validation and coordinated with the SIFT team on the PayPal V2 migration email thread.

**Result:** Fraudulent PayPal payments could now be blocked before funds were captured, eliminating the root cause of PayPal disputes. The feature was deployed to production and covered ~190K prepaid users. The SIFT integration became the standard fraud gate for all new PayPal payment flows.

## Learning

I learned that payment fraud prevention requires thinking end-to-end — from the payment gateway API contract, through the fraud-scoring engine, to the customer-facing UX. Changing a single API call (`SALE` → `AUTHORIZE`) had cascading implications across settlement, notification templates, and error handling that required careful cross-team coordination.

## Deeper Dive (Technical Detail from Jira/GitHub)

- The SIFT check was inserted between Braintree's `authorize` response and the `submitForSettlement` call. If SIFT returned `BLOCK`, the code called `braintreeGateway.transaction().voidTransaction(transactionId)`.
- SQL queries were added to `d_payment_method_config` to configure the new PayPal BT method per country.
- The frontend failure scenario (TICKET-16893) added a new tab on the payment summary screen with a KYC form allowing customers to raise a Zendesk support ticket directly from the dashboard.
- A Grafana board (TICKET-17064) was updated to track BT PayPal payment metrics in production.
- The feature was gated behind a beta feature flag and rolled out progressively.
