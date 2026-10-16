# Organisation Configuration Migration to Config Service

<-- [Back](./..)  
::: info About
**Organisation Configuration Migration to Config Service**   
Amazon LP: <Badge type="warning" text="Think Big" /> <Badge type="tip" text="Invent and Simplify" />  
**Ticket:** TICKET-12995, TICKET-12871, TICKET-14388
:::

## Situation

Organisation-specific configuration (CSP branding, feature flags, domain settings) was hardcoded in the dashboard codebase and Puppet configuration. This made it difficult to update configuration without a code deployment, and the configuration was scattered across multiple repositories. The domain name change for DT (EPIC-1347) highlighted the fragility of this approach — updating a domain required changes in Zuora, Sift, marketplace, and multiple code repositories.

## Task

I was responsible for migrating organisation configuration to a centralised Config Service, and for coordinating the domain name change across all dependent systems.

## Action

I migrated the organisation configuration from hardcoded values to the Config Service (TICKET-12995, TICKET-12871), creating a clean API for retrieving CSP-specific configuration at runtime. For the DT domain name change (TICKET-14388), I coordinated updates across Zuora (callback URL — TICKET-13289), marketplace links (TICKET-13288), and Sift (callback URL — TICKET-13278), ensuring all systems were updated atomically. I also updated the `organisation configuration` to point to the new domain.

## Result

Organisation configuration was centralised in the Config Service, enabling configuration updates without code deployments. The DT domain name change was completed across all dependent systems without service disruption.

## Learning

Configuration management is an architectural concern, not just an operational one. I learned that scattered configuration creates hidden dependencies that only become visible during changes — centralising configuration early prevents this technical debt from compounding.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The Config Service used a key-value store with organisation ID as the primary key, allowing per-CSP configuration overrides.
* The DT domain change required coordinated updates in 4 external systems (Zuora, Sift, marketplace, dashboard) — Arpit coordinated the sequencing to avoid callback failures during the transition.
* The `Move organisation configuration to config service` tickets (TICKET-12995, TICKET-12871) were done in two phases to allow incremental migration without breaking existing functionality.
* The `Profile Prefix Cacheable` improvement (TICKET-12764) was a related optimisation that reduced Config Service call volume by caching profile prefix lookups.
