# Lifecycle Events Architecture: Account Billing, User Finance, Company Events

<-- [Back](./..)  
::: info About
**Lifecycle Events Architecture: Account Billing, User Finance, Company Events**   
Amazon LP: <Badge type="warning" text="Think Big" /> <Badge type="tip" text="Dive Deep" />  
**Ticket:** TICKET-12324, TICKET-12178, TICKET-10625, TICKET-10804
:::

## Situation

Vonage's downstream systems (VServices, billing, analytics) were tightly coupled to the dashboard's internal Volga events for account state changes. This created fragile dependencies and made it impossible for downstream teams to evolve independently. The architecture needed a clean, versioned event contract.

Multiple internal teams (VServices, billing, analytics) needed to react to changes in Vonage account state — user creation, account billing changes, company updates, sub-account changes. The existing approach was tightly coupled: services called each other directly or listened to raw Volga events, creating a fragile dependency web. There was no standardised event contract.

Downstream teams (marketing, billing, fraud, provisioning) needed real-time notifications when users, accounts, sub-accounts, and companies changed state. The existing approach was ad-hoc: each team polled databases or relied on brittle point-to-point integrations. There was no standardised event schema, no documentation, and no reliable delivery guarantee.

## Task

I was part of the team responsible for designing and implementing the Lifecycle Events architecture — a new set of Kafka events published to the Hermes cluster that downstream systems could consume independently. I specifically owned the Account Billing, User Finance, and Company lifecycle events.

Design and implement a comprehensive Lifecycle Events system using Kafka, providing a clean, versioned event contract for all downstream consumers. This spanned multiple quarters and tickets.

Design and implement a comprehensive Lifecycle Events platform on Kafka Hermes, covering User, Account, Sub-Account, Company, and UserFinance entities, and publish documentation to the VCP Core Developer Hub.

## Action

For Account Billing (TICKET-12324), I created a new Kafka topic (`service_dashboard-account_billing_lifecycle_events`), defined the event schema with `billing_type` and `payment_type` fields, and replaced the existing Volga listener with a new lifecycle event publisher. For User Finance (TICKET-12178), I created the corresponding event for user finance state changes. For Company events (TICKET-10625), I created lifecycle events for company create and update, updating `d_user_search` via `userSearchService.saveOrUpdate`. I also enriched existing events with more fields (TICKET-10804) based on downstream team feedback.

* Implemented **Company Lifecycle Events** (TICKET-10625): created Kafka topic, event and event-type classes, and wired create/update events in the company service.
* Implemented **Account Billing Lifecycle Events** (TICKET-12324): replaced the direct Volga listener with a Kafka event, decoupling the billing service from the dashboard.
* Implemented **User Finance Lifecycle Events** (TICKET-12178): added a new event type for user finance state changes.
* Refactored the `AccountLifeCycleEvent` structure (TICKET-11929) to standardise the event schema across all event types.
* Added `externalId` to `PhubAccountJson` and `AccountDTO` (TICKET-11778) and to `SmppAccount` (TICKET-11777) to enrich events with the data downstream consumers needed.
* Centralised account lifecycle event publishing in `user-service SubAccountListener` (TICKET-11315) to eliminate duplicate event publishing.
* Wrote the Confluence documentation for the Lifecycle Events system, which became the canonical reference for all consuming teams.
* Generated JSON Schema for lifecycle events (TICKET-12721) to provide a machine-readable contract.
* Designed the event schema for each entity type: `UserLifeCycleEvent.java`, `AccountBillingLifeCycleEvent.java`, `UserFinanceLifeCycleEvent.java`, `SubAccountLifeCycleEvent.java`, with corresponding `*EventType` enums.
* Implemented Kafka producers in User Service and Dashboard, with `UserLifeCycleEventsListenerTest.java` and `VaccountLifeCycleListenerTest.java` for test coverage.
* Centralised account lifecycle event publishing in User Service's `SubAccountListener` (TICKET-11315), replacing scattered ad-hoc publishers across the codebase.
* Added new lifecycle events: Account Billing (TICKET-12324), User Finance (TICKET-12178), Company (TICKET-10625), and enriched existing events with more fields (TICKET-10804).
* Refactored the `AccountLifeCycle` event structure (TICKET-11929) for consistency.
* Published developer documentation to the VCP Core Developer Hub (TICKET-13191, TICKET-12697) — the external-facing API documentation for teams outside Dashboard.
* Added lifecycle events section to Confluence: "LifeCycle Events" page covering all topics, event bodies, producers, and consumers.

## Result

Downstream systems could now consume clean, versioned lifecycle events from the Hermes cluster without depending on Vonage's internal Volga events. The VServices team was able to decouple their billing integration. The lifecycle events became the standard integration pattern for all new downstream consumers.

* A clean, documented Kafka-based event system replaced ad-hoc direct service calls.
* Multiple downstream teams (VServices, billing) onboarded to the new events without requiring dashboard code changes.
* The JSON Schema contract reduced integration errors for consuming teams.
* The Confluence documentation became the team's most-referenced technical page.
* Downstream teams (marketing/Pardot, billing/Zoho, fraud/SIFT, provisioning) could now consume standardised, reliable lifecycle events from a single Kafka cluster.
* The VCP Core documentation became the authoritative reference for external teams integrating with Vonage's user lifecycle.
* Reduced point-to-point integrations and database polling across the platform.

## Learning

Designing event schemas is harder than it looks — you need to think about backward compatibility, versioning, and what downstream consumers will need in 2 years, not just today. I learned to involve downstream teams in schema design from the start.

Event-driven architecture is only as good as its contract. I learned that investing in schema definition and documentation upfront pays dividends for every team that integrates later — and that centralising event publishing in one place is far easier to maintain than distributed publishing scattered across services.

Learned that event-driven architecture requires as much investment in documentation and schema design as in code. A poorly documented event schema becomes a maintenance burden for every consumer team.

## Deeper Dive (Technical Detail from Jira/GitHub)

* `AccountBillingLifeCycleEvent.java` was added to the `customer-dashboard` module with fields: `type`, `account_ref`, `oldValue`, `newValue`, `billing_type`, `payment_type`.
* The Confluence LifeCycle Events page documents the full event catalogue — Arpit contributed the Account Billing, User Finance, and Company sections.
* The `SubAccountListener` was refactored (TICKET-11315) to centralise account lifecycle event publishing, replacing scattered event publishing across multiple services.
* JSON schema generation for lifecycle events was explored (TICKET-12721) to provide a formal contract for downstream consumers.
* **JIRA:** TICKET-10625 (Company lifecycle events), TICKET-12324 (Account Billing), TICKET-12178 (User Finance), TICKET-10804 (Send more info in events), TICKET-11315 (Centralise account lifecycle events), TICKET-11929 (Refactor AccountLifeCycle), TICKET-13191 (VCP Core Documentation update), TICKET-12697 (Add Lifecycle Events to VCP Core Documentation)
* **GitHub:** `UserLifeCycleEvent.java`, `AccountBillingLifeCycleEvent.java`, `UserFinanceLifeCycleEvent.java`, `SubAccountLifeCycleEvent.java`, `UserLifeCycleEventType.java`, `UserFinanceLifeCycleEventType.java`, `VAccountCompanySyncEventListener.java`, `UserFinanceLifeCycleEventsListener.java`, `TICKET-11315 centralise volga event listener (#235)`, `TICKET-12697 add section lifecycle events (#54)`
* **Confluence:** "LifeCycle Events" — full topic catalogue with event bodies, producers, consumers
