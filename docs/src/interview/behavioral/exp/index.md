# Summary of Past 5 years at work

- [My User Stories](html) using STAR-L method for ticket I have worked on
- [Roles](roles)
- [Linked In](linkedin) - summary
- [Appraisals](appraisals) Tech stack updated
- [To Do list](todo)

## Summary: Amazon Leadership Principles Coverage

::: details How to use this document {close}
Each story follows the **STAR-L** format:
* **S**ituation — Context and background
* **T**ask — Your specific responsibility
* **A**ction — What YOU did (use "I", not "we")
* **R**esult — Measurable outcome
* **L**earning — What you took away / how you grew

An additional **"Deeper Dive"** section follows each story with the actual technical detail found in Jira, GitHub, Confluence, and Slack — use these to enrich your verbal answers in real interviews.
:::

| #          | Story                                                                                             | Primary LP                      | Secondary LP                                             |
| ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------- |
|            | [Lifecycle Events Platform (Event-Driven Architecture)](star/lifecycle-events)                    | Think Big                       | Invent & Simplify, Dive Deep                             |
| Fraud      | [Fraud Prevention: PayPal Auth-Only Flow + SIFT Fraud Gate](star/paypal-auth-only-and-sift)       | Dive Deep                       | Customer Obsession, Ownership                            |
|            | [Secondary user Invite Fraud Checks Flow fix](star/secondary-user-fraud-check)                    | Deliver Results                 | Invent and Simplify, Deliver Results                     |
|            | [SIFT Missing Fields & Backfill for 60,000+ Users](star/sift-backfilling)                         | Dive Deep                       | Insist on Highest Standards, Deliver Results             |
| Payments   | [Prepaid USD Multi-Currency: Zoho + Email Templates](star/prepaid-usd-zoho)                       | Deliver Results                 | Think Big                                                |
|            | [Braintree 3D Secure Configurable Flag (USD Launch)](star/bt-3ds-with-flag)                       | Customer Obsession              | Invent and Simplify, Deliver Results                     |
| Automation | [Negative Balance Automation (Replacing Manual Finance Process)](star/negative-balance-scheduler) | Invent and Simplify             | Bias for Action                                          |
|            | [KYC Payment Failure Self-Service](star/payment-kyc)                                              | Customer Obsession              | Invent and Simplify                                      |
|            | [Deploy Ticket Automation via GitHub Actions](star/deploy-tickets-creation-automation)            | Invent and Simplify             | Frugality, Deliver Results                               |
| Prod Bug   | [CD Signup Race Condition (Multi-Service Async Bug)](star/cd-signup-race-condition)               | Dive Deep                       | Are Right A Lot, Customer Obsession                      |
|            | [Kafka Consumer Group UUID Bug Fix (False Production Alerts)](star/kafka-group-id)                | Dive Deep                       | Bias for Action, Operational Excellence, Are Right A Lot |
|            | [Production Log File Size Crisis](star/prod-logs-file-size)                                       | Bias for Action                 | Dive Deep, Operational Excellence                        |
|            | [Grafana Observability (DashboardHttpClient)](star/grafana-oldhttpclient)                         | Operational Excellence          | Dive Deep, Deliver Results                               |
| Security   | [Security Hardening: Hardcoded Credentials Remediation](star/hardcoded-creds)                     | Earn Trust                      | Dive Deep                                                |
|            | [Sanctioned Countries Compliance](star/sanctioned-countries)                                      | Insist on Highest Standards     | Earn Trust                                               |
|            | [Security Hardening: XSS Vulnerability Remediation](star/xss-fixing)                              | Insist on Highest Standards     | Earn Trust                                               |
|            | [Mend/Prisma Vulnerability Programme](star/mend-scan)                                             | Insist on Highest Standards     | Deliver Results                                          |
| 13         | [User Service PATCH Endpoint](star/user-service-patch)                                            | Invent and Simplify             | Dive Deep                                                |
| 15         | [Multi-Region CD Failover Design & Validation Resilience](star/cd-failover)                       | Dive Deep                       | Bias for Action, Ownership, Think Big                    |
| 16         | [Sigma Prime Internal APIs](star/sigma-prime-internal-apis)                                       | Customer Obsession              | Invent and Simplify, Deliver Results                     |
| 19         | [DevRel Pricing API vPricing](star/devrel-pricing)                                                | Think Big                       | Customer Obsession                                       |
| 21         | [OneTrust Cookie Banner GDPR](star/onetrust-cookie-banner)                                        | Insist on Highest Standards     | Customer Obsession                                       |
| 22         | [10DLC Campaign Management](star/tendlc-campaign)                                                 | Customer Obsession              | Deliver Results                                          |
| 23         | [SSM Port-Forward Infrastructure](star/ssm-port-forwarding)                                       | Invent and Simplify             | Dive Deep                                                |
| 24         | [Verify Logs Page](star/verify-logs)                                                              | Customer Obsession              | Deliver Results                                          |
| 26         | [VIES FeignClient: EU VAT ID Validation (Phase 1)](star/vies-integration)                         | Insist on the Highest Standards | Customer Obsession                                       |
| 27         | [VAT ID Status Display: BSS Integration & Regression Fix (Phase 2)](star/vat-id)                  | Customer Obsession              | Dive Deep                                                |
| 31         | [Optus Co-Branded Dashboard Feature Removal](star/cobranded-customer-feature-removal)             | Customer Obsession              | Earn Trust, Deliver Results                              |
| 32         | [Dashboard Cache Resilience + Jenkins Pipeline](star/dashboard-cache)                             | Operational Excellence          | Dive Deep, Customer Obsession                            |
| 25         | [Organisation Config Migration](star/org-config-migration)                                        | Think Big                       | Invent and Simplify                                      |
| Migration  | [MySQL 5.7→8.0 Migration: Schema, Missing Index & Performance](star/mysql-migration)              | Dive Deep                       | Deliver Results                                          |
|            | [Kafka Hermes Migration (Zero Downtime)](star/kafka-hermes-migration)                             | Dive Deep                       | Deliver Results, Frugality, Operational Excellence       |
|            | [Artifactory Migration](star/artifactory-migration)                                               | Deliver Results                 | Ownership, Bias for Action                               |
|            | [AWS Migration: Scheduler + Customer Dashboard](star/migrate-aws-scheduler-app)                   | Bias for Action                 | Deliver Results                                          |
|            | [Deutsche Telekom SSO (CSP Domain Migration)](star/dt-sso)                                        | Customer Obsession              | Earn Trust                                               |

- SIFT - Payment Protection - 
- SIFT - Account Protection - Primary User
- SIFT - Account Protection - Secondary User
- Multi currency Invoicing using ZOHO
  - what service used for conversion
- [ ] Auto reload Payment and Backup - turn off fter failure
  - [ ] Secondary Payment Instrument
- [ ] Negative Balance
- [ ] SIFT Primary User
  - [ ] Important for free credit giving
- [ ] SIFT Secondary User : Account Fraud Protection
  - [ ] Process Improve to sync all 3 options ad cd async
  - [ ] Cleaner Data
  - [ ] Backfilling Missing data
  - [ ] optimize cleaning up data fed to SIFT fraud detection ML
  - [ ] succes and failure metrics
- [ ] SIFT Payment Protection
- [ ] ATO Protection
- [ ] Why SIFT - any other options explored?
- [ ] Architecture and flow diagram fo SIFT
- [ ] Notification template and SES
- [ ] VAT ID validation and VIES implementation
  - [ ] what about counries not covered
- [ ] Payments blocked as per sanctioned countries example china hong kong etc
- [ ] My SQL upgrade
  - [ ] 5.x to 8.x
  - [ ] Prod query caching
  - [ ] Additional Indexing
  - [ ] Slow query identification in AWS console and fixing it using index creation
- [ ] Async Fraud Decision Handling
- [ ] IP Whitelisting in APIGW
- [ ] Domain whitelisting for k8s
- Adding metrics and Grafana for all the DashboardHttpClient which earlier was a blind spot
- Security and Vulnerability KTLO annual goal for team - Prisma (platform issues) and Mend issues
- Prepaid USD : Braintree 3D secure flag

## Interview Tips

(UK Senior Software Engineer Market)

**For Amazon specifically:**
* Always open with the LP name before your story: *"This is a great example of Dive Deep for me..."*
* Keep Situation + Task to ~60 seconds; spend 60% of your time on Action (what YOU did).
* Quantify wherever possible: "~190K accounts", "15 security violations", "6 Kafka topics", "zero downtime".
* The "Deeper Dive" sections in each story give you the technical ammunition to answer follow-up questions like *"Tell me more about how you implemented that"* or *"What was the hardest technical challenge?"*

**For other UK tech companies (FAANG, scale-ups, fintechs):**
* Stories 1, 3, 11 are strong for **fintech/payments** roles (fraud, compliance, KYC).
* Stories 4, 5, 15 are strong for **platform/infrastructure** roles (AWS, Kafka, resilience).
* Stories 7, 14, 17 are strong for **security-conscious** organisations.
* Stories 12, 13, 25 are strong for **architecture/design** discussions.
* Stories 2, 6, 18 are strong for **operational excellence** discussions.

**Redundancy framing (UK context):**
* You are being made redundant due to organisational restructuring — this is a neutral, common event in the UK tech market.
* Frame it positively: *"Vonage/Ericsson is going through a strategic restructuring, and my role is being made redundant. I'm now looking for my next challenge where I can bring this depth of experience in Java/Spring, payments, and distributed systems."*
* Under UK employment law, you are entitled to a redundancy payment and a reference — ensure you have both before your last day.

## Extra

| Theme                     | Stories                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **Fraud & Payments**      | PayPal Auth-Only SIFT, KYC Self-Service, Negative Balance Scheduler, Sigma Prime APIs              |
| **AWS/Cloud Migration**   | Scheduler to AWS, Kafka Hermes Migration, SSM Port-Forward                                         |
| **Security & Compliance** | Hardcoded Credentials, XSS Remediation, Sanctioned Countries, Mend/Prisma Programme, OneTrust GDPR |
| **Architecture & Design** | Lifecycle Events, User Service PATCH, Org Config Migration, CD Failover                            |
| **Partner Integrations**  | Deutsche Telekom SSO, Prepaid USD/Zoho, DevRel Pricing API                                         |
| **Feature Delivery**      | 10DLC Campaigns, Verify Logs, Artifactory Migration, Kafka UUID Fix                                |


## Quick-Reference: Key Technologies Demonstrated

* **Languages & Frameworks:** Java (Spring Boot, Spring Kafka, Feign, Micrometer), TypeScript/JavaScript (Vue.js frontend), Python (deployment scripts, pytest)
* **Messaging:** Apache Kafka (Hermes AWS cluster), event-driven architecture, consumer group management
* **Payments:** Braintree (3D Secure, PayPal, card payments), Zoho CRM, SIFT fraud detection
* **Cloud & Infrastructure:** AWS (Atmos/Nomad), Jenkins CI/CD, Docker, Puppet, APIGW, VIAM routing
* **Databases:** MySQL/RDS (Flyway migrations), Redis (caching), AWS RDS Proxy
* **Observability:** Grafana, OpsGenie, Kibana, Micrometer metrics
* **Security:** Mend (SCA), Prisma (CSPM), GitHub Secret Scanning, XSS remediation, Git history rewriting
* **Collaboration:** JIRA, Confluence, GitHub, Slack, Microsoft Teams


### What I found and used:
* **450 Jira tickets** from your personal doc (2022–2026), cross-referenced with live Jira data
* **GitHub PRs** including secret scan fixes, SIFT integration, FeignClient migration, and more
* **Confluence pages** on Lifecycle Events, AWS Migration, Kafka Hermes, CD Failover, and PayPal SIFT discovery
* **Personal Objectives 2025** confirming your ownership of the Scheduler service and key metrics
* **Jira ticket details** with actual acceptance criteria, SQL queries, PR links, and stakeholder comments


## Cross-Reference: Stories by Amazon Leadership Principle

| ALP                              | Primary Stories                                   | Also Relevant |
| -------------------------------- | ------------------------------------------------- | ------------- |
| Customer Obsession               | 3, 8, 11                                          | 1, 12         |
| Ownership                        | 2, 5                                              | 9, 13, 14     |
| Invent & Simplify                | 10, 12, 15                                        | 1, 3, 9       |
| Are Right A Lot                  | 11                                                | 4, 7          |
| Learn & Be Curious               | 2, 5                                              | 10, 13        |
| Hire & Develop the Best          | *(use for mentoring/documentation contributions)* | 10            |
| Insist on Highest Standards      | 7, 11                                             | 9, 12         |
| Think Big                        | 6, 10                                             | 5             |
| Bias for Action                  | 2, 5                                              | 13, 14        |
| Frugality                        | 5, 6                                              | 13            |
| Earn Trust                       | 7, 8                                              | 11, 12        |
| Dive Deep                        | 1, 4, 9, 14                                       | 7, 15         |
| Have Backbone; Disagree & Commit | *(use Story 11 — pushed back on compliance gap)*  | 7             |
| Deliver Results                  | 2, 3, 13                                          | 5, 6, 8       |

## Quick-Reference: Key Technologies Demonstrated

| Technology / Area                         | Stories                          |
| ----------------------------------------- | -------------------------------- |
| Java / Spring Boot (backend)              | 1, 2, 3, 4, 6, 9, 10, 12, 14, 15 |
| Kafka (event streaming)                   | 4, 6, 10, 15                     |
| AWS (Atmos, RDS, Secrets Manager)         | 5, 7, 13, 14                     |
| Payment Systems (Braintree, PayPal, Sift) | 1, 3, 11, 12                     |
| Redis / Caching                           | 9, 15                            |
| Security (XSS, credentials, compliance)   | 7, 11                            |
| Frontend (React/Angular, feature flags)   | 1, 3, 8                          |
| Database / Flyway migrations              | 9, 14                            |
| CI/CD (Jenkins, Gradle, Artifactory)      | 5, 13                            |
| Observability (Grafana, OpsGenie, Kibana) | 2, 5, 6, 9, 14                   |
| SSO / Identity (DT IDP integration)       | 8                                |
| Documentation (Confluence)                | 2, 5, 10                         |
