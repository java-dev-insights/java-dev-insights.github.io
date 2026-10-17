# Compliance: Blocking Sanctioned Countries for Payments & Addresses

<-- [Back](./..)  
::: info About
**Compliance: Blocking Sanctioned Countries for Payments & Addresses**   
Amazon LP: <Badge type="warning" text="Insist on the Highest Standards" /> <Badge type="tip" text="Earn Trust" />  
**Ticket:** TICKET-15482, TICKET-15483
:::

## Situation

Vonage's payment method and service address forms were allowing users to select sanctioned countries (Russia, Syria, Iran, Cuba, North Korea, China, Hong Kong, Macau) — a direct violation of US CFIUS regulations and Vonage's internal compliance policies. This was a legal and regulatory risk that needed immediate remediation.

Vonage's Customer Dashboard was allowing users from sanctioned countries (Russia, Syria, Iran, Cuba, North Korea, China/Hong Kong — per CFIUS requirements) to add new payment methods and service addresses. This was a direct violation of US trade regulations and Vonage's internal compliance policies, creating legal and financial risk for the company (TICKET-15482, TICKET-15483).

## Task

I was responsible for implementing country-level blocking on both the payment method form and the service address form to prevent users from selecting sanctioned countries.

Implement country-level blocking for both the payment method form and the service address form, ensuring sanctioned countries cannot be selected, while minimising disruption to legitimate users.

## Action

I implemented a server-side validation layer in the dashboard backend that checked the selected country against a configurable sanctioned-countries list before allowing the form submission. I also added frontend validation to provide immediate feedback to users. The sanctioned countries list included Russia, Syria, Iran, Cuba, North Korea, China (CFIUS), Hong Kong (CFIUS), and Macau. I added Ireland (IE) as a test-only banned country in QA (with a note to revert before PROD deployment) to validate the blocking logic without using real sanctioned countries.

* Analysed the existing country selection logic in both the payment method and service address flows.
* Implemented backend validation to reject requests from sanctioned countries, returning appropriate error responses.
* Updated the frontend country dropdowns to exclude sanctioned countries from the selectable list.
* Added Ireland (IE) as a test-only banned country in QA to validate the blocking logic without affecting production data — with a documented reminder to revert before production deployment.
* Coordinated with the Legal/Compliance team to confirm the exact list of blocked countries and the CFIUS requirements.
* Deployed to production after thorough QA validation.

## Result

Both the payment method and service address forms were compliant with CFIUS regulations and Vonage's internal policies. The fix was deployed to production, eliminating the regulatory risk. The configurable country list allowed future updates without code changes.

* Sanctioned country blocking live in production for both payment methods and service addresses.
* Compliance risk eliminated for the affected flows.
* Zero false positives reported — legitimate users in non-sanctioned countries unaffected.
* The implementation was clean enough to be extended to additional flows in future without rework.

## Learning

Compliance requirements often have tight deadlines and zero tolerance for errors. I learned to use test-only configurations (like the IE test country) to validate blocking logic safely in QA without risking false positives in production.

Compliance requirements are non-negotiable constraints, not feature requests. I learned to treat them with the same urgency as security vulnerabilities and to always involve Legal/Compliance as a stakeholder from the start, not at the end.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The sanctioned countries list was stored in the dashboard configuration service, making it updatable without a code deployment.
* The backend validation was added to both the `PaymentMethodController` and the `ServiceAddressController`.
* The frontend validation used the same country list via an API call, ensuring consistency between client and server validation.
* TICKET-15482 (payment method) was 8 story points; TICKET-15483 (service address) was 5 story points — reflecting the additional complexity of the payment method form.
