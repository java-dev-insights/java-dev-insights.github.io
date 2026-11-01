# Braintree 3D Secure: Configurable Non-3DS Payment Flow for USD Prepaid

<-- [Back](./..)  
::: info About
**Braintree 3D Secure: Configurable Non-3DS Payment Flow for USD Prepaid**.  
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Deliver Results, Invent and Simplify" />  
:::

## Situation

Vonage was launching a Prepaid USD product using Braintree for card payments. The USD Merchant ID (MID) from Braintree did not have 3D Secure (3DS) enabled — but the existing codebase always attempted to create a 3DS nonce, causing payment failures for USD customers. Additionally, 3DS enablement was expected to change (potentially with a new MID), so the solution needed to be configurable rather than hardcoded.

## Task

Implement a configurable 3D Secure flag (TICKET-15324) that allows the USD payment flow to bypass 3DS when the org subscription `ENABLE_NON_3DS_PAYMENTS` is set, while keeping 3DS mandatory for EUR accounts.

## Action

* Investigated the Braintree client SDK's 3DS flow: the frontend uses the drop-in UI to create a 3DS instance and verify the card nonce before submission.
* Implemented a feature flag (`ENABLE_NON_3DS_PAYMENTS`) at the org subscription level, checked in both frontend and backend.
* Modified the frontend to skip the 3DS nonce verification step when the flag is set and the account currency is USD.
* Added console logging (`[is3dsPaymentFlow] is (true/false) for accountCurrency=(EUR/USD) and hasNon3dsPaymentsEnabled=(true/false)`) for debugging.
* Validated all four combinations: EUR/USD × 3DS enabled/disabled.
* Monitored 3DS nonce statuses in production (TICKET-15324 follow-up: "3D Secure Payment - Monitor statuses received from BrainTree for past 30/60 days") — documented in `3D Secure Nonce Status` and `BrainTree - 3D Secure Status` OneDrive docs.

## Result

* USD Prepaid customers could make card payments without 3DS friction, unblocking the USD product launch.
* The configurable flag meant the team could enable 3DS for USD in future without a code change.
* Zero payment errors related to 3DS for USD accounts post-deployment.

## Learning

Learned that payment flows require deep understanding of both the merchant's configuration and the client SDK behaviour. A feature flag is the right pattern when a behaviour needs to change based on external factors (MID configuration) that are outside the team's control.

## Deeper Dive (Technical Detail from Jira/GitHub)

* **JIRA:** TICKET-15324 — "Prepaid USD - Braintree 3D secure flag"
* **GitHub:** `TICKET-15324 braintree 3D secure flag` (two PRs — initial and follow-up)
* **OneDrive docs:** `3D Secure Nonce Status`, `BrainTree - 3D Secure Status` — production monitoring analysis
* **Related:** TICKET-14808 — "[Prod] Find & populate Braintree USD merchant ID"
