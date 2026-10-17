# Lifecycle Events Architecture: Account Billing, User Finance, Company Events

<-- [Back](./..)  
::: info About
**Lifecycle Events Architecture: Account Billing, User Finance, Company Events**   
Amazon LP: <Badge type="warning" text="Think Big" /> <Badge type="tip" text="Dive Deep" />  
**Ticket:** TICKET-12324, TICKET-12178, TICKET-10625, TICKET-10804
:::

## Situation

Vonage's downstream systems (VServices, billing, analytics) were tightly coupled to the dashboard's internal Volga events for account state changes. This created fragile dependencies and made it impossible for downstream teams to evolve independently. The architecture needed a clean, versioned event contract.

## Task

I was part of the team responsible for designing and implementing the Lifecycle Events architecture — a new set of Kafka events published to the Hermes cluster that downstream systems could consume independently. I specifically owned the Account Billing, User Finance, and Company lifecycle events.

## Action

For Account Billing (TICKET-12324), I created a new Kafka topic (`service_dashboard-account_billing_lifecycle_events`), defined the event schema with `billing_type` and `payment_type` fields, and replaced the existing Volga listener with a new lifecycle event publisher. For User Finance (TICKET-12178), I created the corresponding event for user finance state changes. For Company events (TICKET-10625), I created lifecycle events for company create and update, updating `d_user_search` via `userSearchService.saveOrUpdate`. I also enriched existing events with more fields (TICKET-10804) based on downstream team feedback.

## Result

Downstream systems could now consume clean, versioned lifecycle events from the Hermes cluster without depending on Vonage's internal Volga events. The VServices team was able to decouple their billing integration. The lifecycle events became the standard integration pattern for all new downstream consumers.

## Learning

Designing event schemas is harder than it looks — you need to think about backward compatibility, versioning, and what downstream consumers will need in 2 years, not just today. I learned to involve downstream teams in schema design from the start.

## Deeper Dive (Technical Detail from Jira/GitHub)

* `AccountBillingLifeCycleEvent.java` was added to the `customer-dashboard` module with fields: `type`, `account_ref`, `oldValue`, `newValue`, `billing_type`, `payment_type`.
* The Confluence [LifeCycle Events](https://confluence.vonage.com/display/DAS/LifeCycle+Events) page documents the full event catalogue — Arpit contributed the Account Billing, User Finance, and Company sections.
* The `SubAccountListener` was refactored (TICKET-11315) to centralise account lifecycle event publishing, replacing scattered event publishing across multiple services.
* JSON schema generation for lifecycle events was explored (TICKET-12721) to provide a formal contract for downstream consumers.
