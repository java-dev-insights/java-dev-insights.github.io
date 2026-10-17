# CD Failover Testing & Health Check Infrastructure

<-- [Back](./..)  
::: info About
**CD Failover Testing & Health Check Infrastructure**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Bias for Action" />  
**Ticket:** TICKET-16351, TICKET-16529, TICKET-16539, TICKET-16540
:::

## Situation

An architecture review revealed that although the Customer Dashboard was deployed to multiple AWS regions and AZs, there was no documented failover procedure and no regular validation that failover actually worked. In the event of a regional outage, the team would have no tested playbook to follow.

## Task

I was responsible for defining the failover testing procedure, implementing the infrastructure to support it (including a new failover toggle endpoint), and validating failover in both QA and production environments.

## Action

I created a new `DashboardHealthCheckController` with a `/api/internal/failover` endpoint that toggled a region-level failover flag stored in the regional cache (keys: `failover-eu-west-1` and `failover-eu-central-1`). I also added a `/api/internal/ping` endpoint for health checks. I documented the full failover testing procedure in Confluence (TICKET-16351), then validated it in QA with the regional cache and Jenkins pipeline (TICKET-16529), in QA with APIGW (TICKET-16539), and finally in production with APIGW (TICKET-16540).

## Result

The team now had a tested, documented failover procedure. The failover toggle could be activated in under 5 minutes, and the health check endpoint provided accurate service status for load balancer routing decisions.

## Learning

Resilience engineering is not just about building redundancy — it's about regularly testing that the redundancy actually works. I learned that untested failover procedures are almost as bad as no failover procedure.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The failover flag was stored in the regional Redis cache with keys `failover-eu-west-1` and `failover-eu-central-1`, allowing region-specific failover without affecting other regions.
* The `DashboardHealthCheckController` was added to the `customer-dashboard` module and exposed via the internal API gateway.
* The Jenkins pipeline test (TICKET-16529) validated that the cache correctly propagated the failover flag across all instances in the region.
* The production test (TICKET-16540) was done during a low-traffic window with the on-call team standing by.
