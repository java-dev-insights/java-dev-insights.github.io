# AWS Migration: Scheduler Service (Softlayer → Atmos/AWS)

<-- [Back](./..)  
::: info About
**AWS Migration: Scheduler & Customer Dashboard to Atmos Production**.  
**AWS Migration: Scheduler Service (Softlayer → Atmos/AWS)**   
Amazon LP: <Badge type="warning" text="Bias for Action" /> <Badge type="tip" text="Deliver Results" />  
:::

## Situation

Vonage's Scheduler service — responsible for critical background jobs including fraud score upgrades, balance checks, and billing notifications — was running on legacy Softlayer infrastructure. The company had mandated a full migration to AWS (Atmos), but the Scheduler was a singleton service with no redundancy, making the migration high-risk.

The Scheduler service — responsible for critical background jobs (fraud score upgrades, balance checks, email notifications) — was running on Softlayer (legacy on-premise infrastructure). Vonage had a strategic initiative to migrate all services to AWS (Atmos). The Scheduler was a high-risk migration target because it ran time-sensitive cron jobs and any downtime would directly impact customers and Finance operations (EPIC EPIC-268).

Vonage's Scheduler service and Customer Dashboard were running on legacy Softlayer (SL) infrastructure. The company had committed to a full AWS migration (Atmos platform). The Scheduler ran critical financial jobs (auto-fraud score upgrades, balance checks, pricing notifications) — any migration failure would directly impact revenue and customer billing.

## Task

I was responsible for the end-to-end migration of the Scheduler service to AWS, including deploying to atmos-dev, running regression tests, migrating to atmos-prod with tasks disabled, enabling tasks, and deprecating the Softlayer instance.

Lead the end-to-end migration of the Scheduler service from Softlayer to AWS Atmos, including deployment, testing, monitoring, and deprecation of the old environment.

Lead the end-to-end migration of the Scheduler (EPIC-268 Epic) and Customer Dashboard (EPIC-200 Epic) to AWS Atmos production, including deployment, smoke testing, monitoring setup, and legacy deprecation.

## Action

I followed a phased migration plan: first deployed to atmos-dev (TICKET-8239), ran smoke tests, then deployed to atmos-prod with all cron jobs disabled (TICKET-8459) to validate the deployment without risk. After monitoring, I enabled tasks in production (TICKET-8810), set up monitoring and Grafana alerts (TICKET-8770), updated smoke tests to point to atmos-prod (TICKET-8467), and finally deprecated the Softlayer QA instance (TICKET-8464). I coordinated with the Admin Dashboard team who also depended on the Scheduler.

* Deployed Scheduler to `atmos-dev` (TICKET-8239) and ran full regression tests with all cron jobs disabled to validate the environment.
* Updated smoke tests to target atmos-dev (TICKET-8467) and validated all job configurations.
* Deployed to Atmos production with tasks disabled first (TICKET-8459), monitored for 48 hours, then enabled all tasks (TICKET-8810).
* Set up Grafana monitoring and OpsGenie alerts for the Atmos production instance (TICKET-8770).
* Coordinated with the Admin Dashboard team (a dependent consumer) to align on the migration date.
* Deprecated the Softlayer QA instance (TICKET-8464) and performed post-migration cleanup (TICKET-8847).
* Documented the full migration in Confluence: "[DONE] AWS Migration — Scheduler".
* **Scheduler Migration (EPIC-268):** Deployed Scheduler to Atmos-dev (TICKET-8239), ran smoke tests with disabled crons (TICKET-8460), deployed to Atmos production with tasks disabled (TICKET-8459), enabled tasks in production (TICKET-8810), set up monitoring and alerts (TICKET-8770), updated smoke tests for Atmos prod (TICKET-8467), deprecated Scheduler in Softlayer QA (TICKET-8464), and completed post-migration cleanup (TICKET-8847).
* **Customer Dashboard Migration (EPIC-200):** Deployed CD to atmos-dev (TICKET-9017), updated PHub URL for atmos-dev (TICKET-9433), ran CD regression tests (TICKET-9193), moved 100% QA traffic to atmos-dev (TICKET-9493), switched off Kafka for SL (TICKET-9547), deprecated CD in Softlayer QA (TICKET-9194).
* Set up Grafana monitoring and OpsGenie alerts for both services in Atmos prod.
* Documented migration steps in Confluence: "[DONE] AWS Migration - Scheduler".

## Result

The Scheduler was successfully migrated to AWS with zero downtime and no job failures. The Softlayer instance was decommissioned, reducing infrastructure costs and aligning with the company's cloud-first strategy.

* Scheduler successfully migrated to AWS with zero job failures during or after migration.
* All cron jobs ran on schedule from day one in production.
* The Softlayer instance was cleanly decommissioned, reducing infrastructure costs.
* The migration playbook I created was reused by other teams for similar migrations.
* Both Scheduler and Customer Dashboard successfully migrated to AWS Atmos production.
* Legacy Softlayer infrastructure decommissioned, reducing infrastructure costs.
* Monitoring and alerting established from day one in the new environment.

## Learning

I learned the importance of phased migrations with clear rollback points. Deploying with tasks disabled first was a key risk-mitigation strategy that I now apply to any stateful service migration.

I learned that the key to a safe infrastructure migration is the "deploy disabled, then enable" pattern — it gives you a production-validated environment before any real workload runs. I also learned the importance of communicating migration timelines to dependent teams early.

Learned the value of a phased migration approach: dev → QA → prod with disabled tasks → prod with enabled tasks. Each phase is a checkpoint that reduces risk. Also learned that migration is never "done" until the legacy environment is fully decommissioned and cleaned up.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The Scheduler ran as a single instance — there was no active-active setup — so the migration window had to be carefully planned around scheduled job times.
* Smoke tests (`scheduler_atmos_smokes.Jenkinsfile`) were updated to target the new atmos-prod endpoint.
* Post-migration cleanup (TICKET-8847) included removing Softlayer-specific configuration from Puppet and Jenkins pipelines.
* The Admin Dashboard team was notified in advance of the migration date to coordinate any dependent job schedules.
* **JIRA Epics:** EPIC-268 (Scheduler to AWS), EPIC-200 (CD to AWS)
* **JIRA sub-tasks:** TICKET-8239, 8459, 8460, 8464, 8467, 8770, 8810, 8847 (Scheduler); TICKET-9017, 9193, 9194, 9433, 9493, 9547 (CD)
* **Confluence:** "[DONE] AWS Migration - Scheduler"
* **GitHub:** `deployScheduler.Jenkinsfile`, `deployCustomerDashboard.Jenkinsfile`


## Context

Atmos by Cloud Posse (Infrastructure & Terraform Orchestration).  
Atmos is an open-source framework by Cloud Posse used to manage Terraform, OpenTofu, Kubernetes, and Helm at scale across complex multi-account environments, including AWS.

- What it does: It organizes sprawling cloud infrastructure into declarative systems using stacks (environment configurations) and components (reusable root modules) with deep inheritance and DRY (Don't Repeat Yourself) YAML configurations.
- AWS Integration: It includes built-in CLI commands (atmos aws) to manage AWS ECR authentication, EKS clusters, compliance, and security, as well as handling ambient credentials via IAM roles for Service Accounts (IRSA) or instance profiles