# Paypal Auth with SIFT Fraud Check

<-- [Back](./..)  
::: info About
**Fraud Prevention: PayPal Authorization-Only Flow with SIFT Fraud Gate Integration**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Customer Obsession" />  
:::

## Situation

Vonage's payment platform was suffering from a critical fraud gap: PayPal transactions via Braintree were always settled immediately, even when SIFT's fraud-detection engine flagged them as high-risk. This meant fraudulent payments were captured before any intervention was possible, leading to PayPal disputes, financial losses, and reputational damage with PayPal as a payment partner.

Fraudulent actors were exploiting this window to top up accounts and immediately use the communications credits before any manual review could intervene. The business was absorbing direct financial losses and compliance risk.

## Task

I was assigned to design and implement an Authorization-Only PayPal flow — a fundamental change to the payment lifecycle — so that SIFT's fraud decision could conditionally void or settle a transaction before funds were captured.

I was assigned to design and implement an authorization-only PayPal flow (TICKET-16377) — a fundamental change to the payment lifecycle — so that funds would only be captured *after* SIFT returned a "safe" decision, and voided otherwise.

## Action

I led the full-stack implementation across the backend (Java/Spring) and frontend (Angular). On the backend, I changed the Braintree integration to use `AUTHORIZE` instead of `SALE` for PayPal transactions, then built a conditional settlement service that called SIFT's payment workflow API and, based on the decision (`ALLOW` / `BLOCK`), either submitted the transaction for settlement or voided it. I also built the failure-scenario frontend (TICKET-16893) to surface a meaningful KYC-linked error page when a payment was blocked. I wrote SQL test queries for QA validation and coordinated with the SIFT team on the PayPal V2 migration email thread.

* Redesigned the Braintree PayPal integration to use **authorization-only** nonces instead of immediate capture, adding a new asynchronous settlement/void step triggered by SIFT's webhook callback.
* Implemented `PaymentKycService.java` and `PaymentKycSupportController.java` to handle the conditional settlement logic, with full unit test coverage in `PaymentKycServiceTest.java`.
* Extended the SIFT event pipeline to send `$transaction` events with enriched metadata (account_ref, fraud_score, user_type) so SIFT's ML model had the context it needed to make accurate decisions.
* Coordinated with the Frontend team on `PaymentFailureKycForm.java` and `PaymentFailureKYCForm.spec.ts` to surface a KYC self-service form (TICKET-15778) when a payment was blocked — replacing a manual Zendesk ticket process.
* Wrote SQL test queries for QA validation and documented the full flow in Confluence.
* Deployed via canary release (BTPP QA env → canary → prod), monitoring Grafana boards (TICKET-17064) throughout.

## Result

Fraudulent PayPal payments could now be blocked before funds were captured, eliminating the root cause of PayPal disputes. The feature was deployed to production and covered ~190K prepaid users. The SIFT integration became the standard fraud gate for all new PayPal payment flows.

* Fraudulent PayPal top-ups were blocked at the authorization stage before any funds were captured, eliminating a class of financial loss.
* The KYC self-service form reduced manual support ticket volume for payment-blocked customers.
* The Grafana board gave the team real-time visibility into BT PayPal payment flows for the first time.
* SIFT's fraud analyst confirmed improved detection accuracy after receiving enriched transaction data.

## Learning

I learned that payment fraud prevention requires thinking end-to-end — from the payment gateway API contract, through the fraud-scoring engine, to the customer-facing UX. Changing a single API call (`SALE` → `AUTHORIZE`) had cascading implications across settlement, notification templates, and error handling that required careful cross-team coordination.

I learned that payment security is not a single feature but a layered system — authorization, fraud scoring, and customer communication must all be redesigned together. I also learned to work closely with a third-party fraud platform (SIFT) as a product partner, not just an API endpoint.

## Deeper Dive (Technical Detail from Jira/GitHub)

- The SIFT check was inserted between Braintree's `authorize` response and the `submitForSettlement` call. If SIFT returned `BLOCK`, the code called `braintreeGateway.transaction().voidTransaction(transactionId)`.
- SQL queries were added to `d_payment_method_config` to configure the new PayPal BT method per country.
- The frontend failure scenario (TICKET-16893) added a new tab on the payment summary screen with a KYC form allowing customers to raise a Zendesk support ticket directly from the dashboard.
- A Grafana board (TICKET-17064) was updated to track BT PayPal payment metrics in production.
- The feature was gated behind a beta feature flag and rolled out progressively.
* **JIRA:** TICKET-16377 (8 story points) — "Implement Authorization-Only PayPal Flow and Conditional Settlement Based on Sift Fraud Decision"
* **JIRA:** TICKET-15778 (8 story points) — "KYC on payment failure changes (backend updated)" — added KYC form on payment summary screen; TICKET-15757 (frontend); TICKET-15944 (remove feature flag after full rollout)
* **GitHub PRs:** `TICKET-15778 payment failure kyc`, `TICKET-15778 payment failure kyc (retry)`, `TICKET-15757 payment failure kyc frontend`
* **Code files:** `PaymentKycService.java`, `PaymentKycServiceTest.java`, `PaymentKycSupportController.java`, `PaymentFailureKycForm.java`, `PaymentFailureKycTemplateDTO.java`
* **Confluence:** "Analysis of Braintree Paypal Add Funds Issue in QA" — deep-dive root cause analysis of PayPal sandbox ↔ merchant account linkage issues encountered during QA
