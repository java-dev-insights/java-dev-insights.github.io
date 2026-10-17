# KYC Payment Failure Self-Service

<-- [Back](./..)  
::: info About
**KYC on Payment Failure: Self-Service Support Ticket Flow**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Invent and Simplify" />  
**Ticket:** [TICKET-15778](https://jira.vonage.com/browse/TICKET-15778), [TICKET-15757](https://jira.vonage.com/browse/TICKET-15757), [TICKET-15944](https://jira.vonage.com/browse/TICKET-15944)
:::

## Situation

When a customer's payment was blocked by SIFT's fraud engine, the only recourse was to manually contact Vonage support and submit KYC (Know Your Customer) documents via email. This was a poor customer experience and created a high volume of manual support tickets for the operations team.

When a customer's payment was blocked by Sift's fraud engine, the only recourse was to open a Zendesk support ticket manually and submit KYC (Know Your Customer) documents by email. This was a frustrating, opaque experience for customers and created a backlog for the support team. There was no self-service path.

## Task

I was responsible for implementing a self-service KYC form directly within the Customer Dashboard's payment failure flow, allowing customers to submit their KYC details and automatically create a Zendesk support ticket without leaving the dashboard.

Design and implement a KYC form directly within the Customer Dashboard's payment summary screen, allowing customers to submit KYC details inline — automatically creating a Zendesk ticket in the background (TICKET-15778).

## Action

I modified the payment summary screen to add a new KYC tab, visible only when a payment was blocked due to a SIFT fraud decision. The tab contained a structured form collecting the required KYC fields. On submission, the backend called the Zendesk API to create a support ticket pre-populated with the customer's account details and KYC data. I implemented the feature behind a feature flag for controlled rollout, and later removed the flag (TICKET-15944) once validated in production.

* Analysed the existing Zendesk integration and the payment failure flow to identify the correct injection point for the KYC form.
* Implemented backend changes to accept KYC form submissions and programmatically create Zendesk tickets with the correct metadata (TICKET-15778).
* Built the frontend KYC form on the payment summary screen, including field validation and a clear post-submission confirmation state (TICKET-15757).
* Added a feature flag to control rollout; later removed the flag once the feature was stable in production (TICKET-15944).
* Coordinated with the Support team to validate the Zendesk ticket format and ensure agents could action them efficiently.

## Result

Customers could now self-serve their KYC submission without contacting support manually. The support team saw a reduction in unstructured KYC emails, and customers received a faster, more transparent resolution path.

* Customers can now self-serve their KYC submission without contacting support directly.
* Support ticket creation time reduced from days (manual) to seconds (automated).
* The feature was delivered across three incremental tickets, demonstrating disciplined iterative delivery.
* Positive feedback from the Support team on ticket quality and completeness.

## Learning

This project reinforced the value of closing the loop for customers at the point of failure rather than redirecting them elsewhere. I also learned the importance of feature flags for gradual rollout of customer-facing changes.

I learned that the best customer experience improvements often come from removing friction in failure paths, not just optimising happy paths. Instrumenting the feature with a feature flag also taught me the value of controlled rollouts for payment-adjacent features.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The KYC form was added to the payment summary screen as a new Angular tab component.
* The backend created a new endpoint that accepted KYC form data and called the Zendesk ticket creation API.
* The feature was initially hidden behind a feature flag (`kyc-payment-failure`) and validated in QA before production rollout.
* TICKET-15944 removed the feature flag after successful production validation.
* The Zendesk NPA (TICKET-16331) was also updated as part of the broader KYC initiative.

## Context

### What is Zendesk

Zendesk is a cloud-based customer service and sales software platform that helps businesses manage customer support, communication, and relationships in one central place.

It was by the Support team to manage our Knowledgebase Articles, as well as manage support tickets from our customers.  
Yes, Zendesk can absolutely be used for knowledge base articles. It has a dedicated product specifically built for this called Zendesk Guide.Zendesk Guide acts as a content management system (CMS) that lets you create, organize, and publish self-service content for your customers or internal employees.
