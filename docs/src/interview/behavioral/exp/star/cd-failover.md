# CD Failover Testing & Health Check Infrastructure

<-- [Back](./..)  
::: info About
**Multi-Region Failover: Designing & Validating Customer Dashboard Resilience**.  
**CD Failover Testing & Health Check Infrastructure**   
Amazon LP: <Badge type="warning" text="Dive Deep" /> <Badge type="tip" text="Bias for Action" />  
**Ticket:** TICKET-16351, TICKET-16529, TICKET-16539, TICKET-16540
:::

## Situation

An architecture review revealed that although the Customer Dashboard was deployed to multiple AWS regions and AZs, there was no documented failover procedure and no regular validation that failover actually worked. In the event of a regional outage, the team would have no tested playbook to follow.

An architecture review of the Customer Dashboard (CD) revealed a critical gap: although CD was deployed across multiple AWS regions and availability zones, there was no documented failover procedure, no validated runbook, and no automated mechanism to shift traffic when a region became unhealthy. The team had never tested whether the multi-region setup actually worked under failure conditions.

## Task

I was responsible for defining the failover testing procedure, implementing the infrastructure to support it (including a new failover toggle endpoint), and validating failover in both QA and production environments.

Lead the discovery, design, and end-to-end validation of a CD regional failover capability (TICKET-16351, TICKET-16529, TICKET-16539, TICKET-16540).

## Action

I created a new `DashboardHealthCheckController` with a `/api/internal/failover` endpoint that toggled a region-level failover flag stored in the regional cache (keys: `failover-eu-west-1` and `failover-eu-central-1`). I also added a `/api/internal/ping` endpoint for health checks. I documented the full failover testing procedure in Confluence (TICKET-16351), then validated it in QA with the regional cache and Jenkins pipeline (TICKET-16529), in QA with APIGW (TICKET-16539), and finally in production with APIGW (TICKET-16540).

* Conducted a discovery sprint (TICKET-16351) to map the full failover architecture: APIGW healthcheck endpoints, regional cache keys (`failover-eu-west-1`, `failover-eu-central-1`), and Jenkins pipeline triggers.
* Designed a new `/api/internal/failover` endpoint to toggle a region-level failover flag via cache, and enhanced `/api/internal/ping` to return richer health metadata (region, instance) for APIGW to evaluate.
* Built a Jenkins pipeline (TICKET-16529) to automate failover triggering — enabling the team to shift traffic with a single button click rather than manual config changes.
* Validated the full flow in QA (TICKET-16539): APIGW healthcheck → failover flag set → traffic shifts to secondary region → Kibana log verification.
* Validated in PROD (TICKET-16540) with live traffic monitoring.
* Authored the Confluence runbook "How to do CD Failover across regions" and "Test CD Failover across regions" — the team's first documented disaster recovery procedure for this service.

## Result

The team now had a tested, documented failover procedure. The failover toggle could be activated in under 5 minutes, and the health check endpoint provided accurate service status for load balancer routing decisions.

* The team now has a tested, documented, and automated failover capability for the Customer Dashboard.
* Failover can be triggered in under 2 minutes via Jenkins, compared to previously having no procedure at all.
* The runbook was adopted as the standard DR procedure for CD.

## Learning

Resilience engineering is not just about building redundancy — it's about regularly testing that the redundancy actually works. I learned that untested failover procedures are almost as bad as no failover procedure.

Learned that resilience is not just about architecture — it's about *validated* architecture. A multi-region deployment that has never been tested under failure is not resilient. I also learned to think about operational runbooks as a first-class deliverable alongside code.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The failover flag was stored in the regional Redis cache with keys `failover-eu-west-1` and `failover-eu-central-1`, allowing region-specific failover without affecting other regions.
* The `DashboardHealthCheckController` was added to the `customer-dashboard` module and exposed via the internal API gateway.
* The Jenkins pipeline test (TICKET-16529) validated that the cache correctly propagated the failover flag across all instances in the region.
* The production test (TICKET-16540) was done during a low-traffic window with the on-call team standing by.
* **JIRA:** TICKET-16351 (3 story points) — Discovery; TICKET-16529 (2 story points) — Jenkins pipeline; TICKET-16539 — QA validation; TICKET-16540 — PROD validation
* **GitHub PRs:** `TICKET-16529 cd failover jenkins pipeline`, `TICKET-16539 cd failover qa env`, `TICKET-16539 cd failover qa env reset to master`
* **Confluence:** "Test CD Failover across regions" — full design doc with endpoint specs, cache key design, QA/PROD steps, and Kibana verification steps
* **Confluence:** "How to do CD Failover across regions" — operational runbook