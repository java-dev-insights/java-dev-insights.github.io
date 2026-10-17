# Grafana Observability (DashboardHttpClient)

<-- [Back](./..)  
::: info About
**Grafana Observability: Building Metrics & Alerting for DashboardHttpClient**  
**Grafana Observability (DashboardHttpClient)**   
Amazon LP: <Badge type="warning" text="Operational Excellence" /> <Badge type="tip" text="Dive Deep" /> <Badge type="tip" text="Deliver Results" />  
:::

## Situation

When a customer's payment was blocked by SIFT's fraud engine, the only recourse was to manually contact Vonage support and submit KYC (Know Your Customer) documents via email. This was a poor customer experience and created a high volume of manual support tickets for the operations team.

The Customer Dashboard's `DashboardHttpClient` — the internal HTTP client used for all downstream service calls — had no metrics or Grafana visibility. When downstream services (PHub, User Service, etc.) were slow or failing, the team had no way to quantify the impact, identify which endpoints were affected, or set up proactive alerts. Issues were only discovered reactively via customer complaints or error log spikes.

## Task

I was responsible for implementing a self-service KYC form directly within the Customer Dashboard's payment failure flow, allowing customers to submit their KYC details and automatically create a Zendesk support ticket without leaving the dashboard.

Implement metrics for `DashboardHttpClient` and create Grafana boards for real-time observability (TICKET-15451).

## Action

I modified the payment summary screen to add a new KYC tab, visible only when a payment was blocked due to a SIFT fraud decision. The tab contained a structured form collecting the required KYC fields. On submission, the backend called the Zendesk API to create a support ticket pre-populated with the customer's account details and KYC data. I implemented the feature behind a feature flag for controlled rollout, and later removed the flag (TICKET-15944) once validated in production.

* Instrumented `DashboardHttpClient` with Micrometer metrics: request count, error rate, and latency percentiles per endpoint.
* Created Grafana dashboards (TICKET-15451 — "Dashboard Services - metrics for DashboardHttpClient - GRAFANA boards") showing request rates, error rates, and p95/p99 latencies for all downstream calls.
* Added a P3 alert for DevAPI PHUB calls (TICKET-15170) — the first proactive alert for this critical integration.
* Added OpsGenie alert for CD RDS CPU high usage (TICKET-17174) — enabling the team to respond to database performance issues before they caused customer-facing failures.
* Fixed the `autoFraudScoreUpgradeJob` `HttpClientTimeOutException` (TICKET-15382) — identified via the new metrics that the job was timing out on audit event calls; added `threadName` to logs for easier debugging (noted in 2025 personal objectives).

## Result

Customers could now self-serve their KYC submission without contacting support manually. The support team saw a reduction in unstructured KYC emails, and customers received a faster, more transparent resolution path.

* `DashboardHttpClient` metrics gave the team real-time visibility into all downstream service health.
* P3 alert for PHUB calls enabled proactive detection of integration issues.
* `autoFraudScoreUpgradeJob` timeout issue identified and fixed using the new metrics.
* OpsGenie RDS CPU alert prevented a potential database performance incident.

## Learning

This project reinforced the value of closing the loop for customers at the point of failure rather than redirecting them elsewhere. I also learned the importance of feature flags for gradual rollout of customer-facing changes.

Learned that observability is not a luxury — it's a prerequisite for reliable operations. Instrumenting a shared HTTP client gives you visibility into the health of every downstream dependency simultaneously. The investment in metrics pays dividends every time an incident occurs.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The KYC form was added to the payment summary screen as a new Angular tab component.
* The backend created a new endpoint that accepted KYC form data and called the Zendesk ticket creation API.
* The feature was initially hidden behind a feature flag (`kyc-payment-failure`) and validated in QA before production rollout.
* TICKET-15944 removed the feature flag after successful production validation.
* The Zendesk NPA (TICKET-16331) was also updated as part of the broader KYC initiative.
* **JIRA:** TICKET-15451 (DashboardHttpClient metrics + Grafana), TICKET-15170 (P3 alert for PHUB), TICKET-17174 (CD RDS OpsGenie alert), TICKET-15382 (autoFraudScoreUpgrade HttpClientTimeOutException)
* **2025 Personal Objectives:** "Grafana - Added for DashboardHttpClient" and "autofraudScoreUpgrade failures (HttpClientTimeOutException) - threadName to ease debugging"
* **Slack:** Thread between Arpit and OpsGenie — multiple production alert responses

## Context

### What is Zendesk

Zendesk is a cloud-based customer service and sales software platform that helps businesses manage customer support, communication, and relationships in one central place.

It was by the Support team to manage our Knowledgebase Articles, as well as manage support tickets from our customers.  
Yes, Zendesk can absolutely be used for knowledge base articles. It has a dedicated product specifically built for this called Zendesk Guide.Zendesk Guide acts as a content management system (CMS) that lets you create, organize, and publish self-service content for your customers or internal employees.
