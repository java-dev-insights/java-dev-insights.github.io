# KYC Payment Failure Self-Service

<-- [Back](./..)  
::: info About
**KYC on Payment Failure: Self-Service Support Ticket Flow**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Invent and Simplify" />  
**Ticket:** [TICKET-15778](https://jira.vonage.com/browse/TICKET-15778), [TICKET-15757](https://jira.vonage.com/browse/TICKET-15757), [TICKET-15944](https://jira.vonage.com/browse/TICKET-15944)
:::

## Situation

When a customer's payment was blocked by SIFT's fraud engine, the only recourse was to manually contact Vonage support and submit KYC (Know Your Customer) documents via email. This was a poor customer experience and created a high volume of manual support tickets for the operations team.

## Task

I was responsible for implementing a self-service KYC form directly within the Customer Dashboard's payment failure flow, allowing customers to submit their KYC details and automatically create a Zendesk support ticket without leaving the dashboard.

## Action

I modified the payment summary screen to add a new KYC tab, visible only when a payment was blocked due to a SIFT fraud decision. The tab contained a structured form collecting the required KYC fields. On submission, the backend called the Zendesk API to create a support ticket pre-populated with the customer's account details and KYC data. I implemented the feature behind a feature flag for controlled rollout, and later removed the flag (TICKET-15944) once validated in production.

## Result

Customers could now self-serve their KYC submission without contacting support manually. The support team saw a reduction in unstructured KYC emails, and customers received a faster, more transparent resolution path.

## Learning

This project reinforced the value of closing the loop for customers at the point of failure rather than redirecting them elsewhere. I also learned the importance of feature flags for gradual rollout of customer-facing changes.

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
