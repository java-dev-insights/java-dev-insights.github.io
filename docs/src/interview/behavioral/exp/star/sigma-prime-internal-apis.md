# Sigma Prime: Internal Payment Search Endpoints for Admin Migration

<-- [Back](./..)  
::: info About
**Sigma Prime: Internal Payment Search Endpoints for Admin Migration**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Invent and Simplify" />  
**Ticket:** TICKET-16561, TICKET-15536
:::

## Situation

The Admin Dashboard's payment search functionality needed to be migrated to Sigma Prime (an internal admin tool). However, the existing `/api/v1/payments/*` endpoints required a user JWT and could not be called via service-to-service authentication. Additionally, suspended accounts (e.g., due to the China exit) could not log in to delete their saved payment methods, requiring manual database-level deletions by the support team.

## Task

I was responsible for creating internal endpoints for Sigma Prime that could query the `d_topup_transaction` table via service-to-service auth, and for implementing a secure Get/Delete payment methods endpoint for admin use.

## Action

For TICKET-16561, I created `GET /api/internal/v1/payments/search` with parameters for `accountRef`, `startDate`, `endDate`, and optional `paymentMethod`, returning paginated results with HATEOAS links. For TICKET-15536, I implemented `GET /api/internal/v1/payment-methods/{accountRef}` with validation (prepaid only, no sub-accounts, no auto-reload), proper audit logging (which admin performed the action, which payment methods were affected), and appropriate error responses.

## Result

Sigma Prime could now query payment transactions without requiring user JWTs, enabling the Admin Dashboard migration. Support teams could delete payment methods for suspended accounts without manual database intervention, eliminating a class of support tickets.

## Learning

Internal APIs require the same rigour as external APIs — proper authentication, validation, audit logging, and error handling. I learned to treat internal consumers as first-class API clients.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The internal payment search endpoint used service-to-service JWT authentication via the internal API gateway.
* Pagination used HATEOAS links (`self`, `first`, `last`, `next`) for consistent navigation.
* The payment methods endpoint validated: account must be prepaid, must not be a sub-account, must not have auto-reload enabled.
* Audit logs recorded: admin user ID, timestamp, account ref, and list of deleted payment method tokens.
