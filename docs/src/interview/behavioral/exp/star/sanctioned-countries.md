# Compliance: Blocking Sanctioned Countries for Payments & Addresses

<-- [Back](./..)  
::: info About
**Compliance: Blocking Sanctioned Countries for Payments & Addresses**   
Amazon LP: <Badge type="warning" text="Insist on the Highest Standards" /> <Badge type="tip" text="Earn Trust" />  
**Ticket:** TICKET-15482, TICKET-15483
:::

## Situation

Vonage's payment method and service address forms were allowing users to select sanctioned countries (Russia, Syria, Iran, Cuba, North Korea, China, Hong Kong, Macau) — a direct violation of US CFIUS regulations and Vonage's internal compliance policies. This was a legal and regulatory risk that needed immediate remediation.

## Task

I was responsible for implementing country-level blocking on both the payment method form and the service address form to prevent users from selecting sanctioned countries.

## Action

I implemented a server-side validation layer in the dashboard backend that checked the selected country against a configurable sanctioned-countries list before allowing the form submission. I also added frontend validation to provide immediate feedback to users. The sanctioned countries list included Russia, Syria, Iran, Cuba, North Korea, China (CFIUS), Hong Kong (CFIUS), and Macau. I added Ireland (IE) as a test-only banned country in QA (with a note to revert before PROD deployment) to validate the blocking logic without using real sanctioned countries.

## Result

Both the payment method and service address forms were compliant with CFIUS regulations and Vonage's internal policies. The fix was deployed to production, eliminating the regulatory risk. The configurable country list allowed future updates without code changes.

## Learning

Compliance requirements often have tight deadlines and zero tolerance for errors. I learned to use test-only configurations (like the IE test country) to validate blocking logic safely in QA without risking false positives in production.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The sanctioned countries list was stored in the dashboard configuration service, making it updatable without a code deployment.
* The backend validation was added to both the `PaymentMethodController` and the `ServiceAddressController`.
* The frontend validation used the same country list via an API call, ensuring consistency between client and server validation.
* TICKET-15482 (payment method) was 8 story points; TICKET-15483 (service address) was 5 story points — reflecting the additional complexity of the payment method form.
