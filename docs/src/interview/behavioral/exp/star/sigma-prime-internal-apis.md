# Sigma Prime: Internal Payment Search Endpoints for Admin Migration

<-- [Back](./..)  
::: info About
**Sigma Prime: Internal Payment Search Endpoints for Admin Migration**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Invent and Simplify" />  
**Ticket:** TICKET-16561, TICKET-15536
:::

## Situation

The Admin Dashboard's payment search functionality needed to be migrated to Sigma Prime (an internal admin tool). However, the existing `/api/v1/payments/*` endpoints required a user JWT and could not be called via service-to-service authentication. Additionally, suspended accounts (e.g., due to the China exit) could not log in to delete their saved payment methods, requiring manual database-level deletions by the support team.

When Vonage accounts were suspended (e.g., due to the China exit), customers could not log into the dashboard to delete their saved payment methods. This led to a backlog of support tickets requiring manual database-level deletions by engineers — a time-consuming, error-prone, and audit-free process (TICKET-15536).

Vonage's internal Sigma Prime analytics platform needed access to payment transaction data (payment methods, topup transactions) from the Customer Dashboard. There was no internal API for this — Sigma Prime was either scraping data or relying on manual exports. This was inefficient and created data freshness issues for the analytics team.

## Task

I was responsible for creating internal endpoints for Sigma Prime that could query the `d_topup_transaction` table via service-to-service auth, and for implementing a secure Get/Delete payment methods endpoint for admin use.

Build a secure internal API endpoint (for the Sigma Prime admin tool) that allows authorised admin users to retrieve and delete payment methods for suspended accounts, with full audit logging.

Expose internal API endpoints for payment transaction search (TICKET-16561) and payment method retrieval (TICKET-15536) to enable Sigma Prime to query data programmatically.

## Action

For TICKET-16561, I created `GET /api/internal/v1/payments/search` with parameters for `accountRef`, `startDate`, `endDate`, and optional `paymentMethod`, returning paginated results with HATEOAS links. For TICKET-15536, I implemented `GET /api/internal/v1/payment-methods/{accountRef}` with validation (prepaid only, no sub-accounts, no auto-reload), proper audit logging (which admin performed the action, which payment methods were affected), and appropriate error responses.

* Designed the API contract: `GET /internal/payment-methods/{accountRef}` and `DELETE /internal/payment-methods/{accountRef}/{paymentMethodId}`.
* Implemented validation logic: only prepaid accounts pass; subaccounts and accounts with auto-reload enabled are rejected with appropriate errors.
* Added comprehensive audit logging: recording which admin user performed the action, which payment methods were deleted, and the timestamp.
* Clarified with the Braintree/PayPal integration that only payment tokens (not full card details) are stored, ensuring GDPR compliance.
* Exposed the endpoint via the internal API gateway (TICKET-16561 — Sigma Prime payment transaction search was a related parallel effort).
* Wrote QA test cases with specific account references for each validation scenario.

* Implemented `PostpaidService.getPaymentMethods()` and exposed it via a new internal API endpoint (TICKET-15536 — "Get Payment Methods - Sigma Integration - DB").
* Implemented a topup transaction search endpoint (TICKET-16561 — "Expose internal endpoints for payment transaction search") with filtering by account, date range, and transaction type.
* GitHub PR: `TICKET-16561 sigma search topup transactions (#4320)`, `TICKET-15536 sigma get payment methods (#4174)`.
* Ensured endpoints were internal-only (not exposed via APIGW to external customers).
* Added appropriate logging and metrics.

## Result

Sigma Prime could now query payment transactions without requiring user JWTs, enabling the Admin Dashboard migration. Support teams could delete payment methods for suspended accounts without manual database intervention, eliminating a class of support tickets.

* Admin users can now manage payment methods for suspended accounts without engineer intervention.
* Manual database deletions eliminated — full audit trail in place.
* Support ticket resolution time for payment method deletion requests reduced from days to minutes.
* GDPR compliance maintained — no raw card data exposed.
* Sigma Prime analytics team gained programmatic access to payment data, eliminating manual exports.
* Data freshness improved — Sigma Prime could query real-time transaction data.
* Internal API pattern established for future analytics integrations.

## Learning

Internal APIs require the same rigour as external APIs — proper authentication, validation, audit logging, and error handling. I learned to treat internal consumers as first-class API clients.

Internal tooling deserves the same design rigour as customer-facing features. I learned that audit logging is not optional for any admin action that touches financial data — it's the difference between a tool and a liability.

Learned that internal APIs deserve the same design rigour as external APIs — proper authentication, rate limiting, and documentation. An undocumented internal API quickly becomes a maintenance burden.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The internal payment search endpoint used service-to-service JWT authentication via the internal API gateway.
* Pagination used HATEOAS links (`self`, `first`, `last`, `next`) for consistent navigation.
* The payment methods endpoint validated: account must be prepaid, must not be a sub-account, must not have auto-reload enabled.
* Audit logs recorded: admin user ID, timestamp, account ref, and list of deleted payment method tokens.
* **JIRA:** TICKET-16561 — "Expose internal endpoints for payment transaction search (Sigma Prime)"; TICKET-15536 — "Get Payment Methods - Sigma Integration - DB"
* **GitHub:** `TICKET-16561 sigma search topup transactions (#4320)`, `TICKET-15536 sigma get payment methods (#4174)`
