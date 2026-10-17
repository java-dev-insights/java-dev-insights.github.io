# Mend/Prisma Security Vulnerability Remediation Programme

<-- [Back](./..)  
::: info About
**Mend/Prisma Security Vulnerability Remediation Programme**   
Amazon LP: <Badge type="warning" text="Insist on the Highest Standards" /> <Badge type="tip" text="Deliver Results" />  
**Ticket:** TICKET-15615, TICKET-15630, TICKET-15004, TICKET-15683, TICKET-15733, TICKET-13910, TICKET-15002, TICKET-15291
:::

## Situation

Vonage's security scanning tools (Mend and Prisma) were flagging critical and high vulnerabilities in the `user-service` and `dashboard` repositories. The `user-service` was in the top 10 most vulnerable services in the organisation. Unaddressed vulnerabilities created compliance risk and potential attack surface.

## Task

I took ownership of the security vulnerability remediation programme for both `user-service` and `dashboard`, systematically addressing critical dependencies including `spring-beans`, `kafka-clients`, `embedded-redis`, `jetty`, `h2`, `c3p0`, `zookeeper`, `python`, and `tomcat`.

## Action

I worked through each vulnerability systematically: upgrading `spring-beans` (TICKET-15615), `kafka-clients` (TICKET-15630), `embedded-redis` (TICKET-15004), `jetty` (TICKET-15683), `h2` (TICKET-15733), `c3p0` (TICKET-13910), and `zookeeper` (TICKET-13994) in `user-service`. For `dashboard`, I addressed `python` and `tomcat` (TICKET-15291) and fixed direct dependencies (TICKET-15003). I also fixed ignored JUnit tests (TICKET-15474) that were masking test failures.

## Result

The `user-service` was removed from the top 10 most vulnerable services list. The team achieved the KTLO (Keep The Lights On) target for Mend vulnerability reduction. Both services maintained 90%+ code coverage (above the standard 80% target).

## Learning

Security debt compounds — each deferred upgrade makes the next one harder. I learned to treat dependency upgrades as regular maintenance rather than one-off projects, and to use the Mend SPOG (Single Pane of Glass) dashboard for prioritisation.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The `spring-beans` upgrade (TICKET-15615) required careful testing as it was a transitive dependency affecting multiple Spring Boot components.
* `embedded-redis` (TICKET-15004) was replaced with a test container approach to avoid the embedded Redis vulnerability.
* The Prisma scan improvements (TICKET-15002, TICKET-15291) involved updating Docker base images to remove OS-level vulnerabilities.
* Arpit's 2025 personal objectives explicitly tracked: "user-service no longer in top 10 list of most vulnerable services" as a key metric.
