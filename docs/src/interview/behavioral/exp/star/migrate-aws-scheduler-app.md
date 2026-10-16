# AWS Migration: Scheduler Service (Softlayer → Atmos/AWS)

<-- [Back](./..)  
::: info About
**AWS Migration: Scheduler Service (Softlayer → Atmos/AWS)**   
Amazon LP: <Badge type="warning" text="Bias for Action" /> <Badge type="tip" text="Deliver Results" />  
**Ticket:** EPIC-268, TICKET-8239, TICKET-8459, TICKET-8810, TICKET-8847
:::

## Situation

Vonage's Scheduler service — responsible for critical background jobs including fraud score upgrades, balance checks, and billing notifications — was running on legacy Softlayer infrastructure. The company had mandated a full migration to AWS (Atmos), but the Scheduler was a singleton service with no redundancy, making the migration high-risk.

## Task

I was responsible for the end-to-end migration of the Scheduler service to AWS, including deploying to atmos-dev, running regression tests, migrating to atmos-prod with tasks disabled, enabling tasks, and deprecating the Softlayer instance.

## Action

I followed a phased migration plan: first deployed to atmos-dev (TICKET-8239), ran smoke tests, then deployed to atmos-prod with all cron jobs disabled (TICKET-8459) to validate the deployment without risk. After monitoring, I enabled tasks in production (TICKET-8810), set up monitoring and Grafana alerts (TICKET-8770), updated smoke tests to point to atmos-prod (TICKET-8467), and finally deprecated the Softlayer QA instance (TICKET-8464). I coordinated with the Admin Dashboard team who also depended on the Scheduler.

## Result

The Scheduler was successfully migrated to AWS with zero downtime and no job failures. The Softlayer instance was decommissioned, reducing infrastructure costs and aligning with the company's cloud-first strategy.

## Learning

I learned the importance of phased migrations with clear rollback points. Deploying with tasks disabled first was a key risk-mitigation strategy that I now apply to any stateful service migration.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The Scheduler ran as a single instance — there was no active-active setup — so the migration window had to be carefully planned around scheduled job times.
* Smoke tests (`scheduler_atmos_smokes.Jenkinsfile`) were updated to target the new atmos-prod endpoint.
* Post-migration cleanup (TICKET-8847) included removing Softlayer-specific configuration from Puppet and Jenkins pipelines.
* The Admin Dashboard team was notified in advance of the migration date to coordinate any dependent job schedules.

## Context

Atmos by Cloud Posse (Infrastructure & Terraform Orchestration).  
Atmos is an open-source framework by Cloud Posse used to manage Terraform, OpenTofu, Kubernetes, and Helm at scale across complex multi-account environments, including AWS.

- What it does: It organizes sprawling cloud infrastructure into declarative systems using stacks (environment configurations) and components (reusable root modules) with deep inheritance and DRY (Don't Repeat Yourself) YAML configurations.
- AWS Integration: It includes built-in CLI commands (atmos aws) to manage AWS ECR authentication, EKS clusters, compliance, and security, as well as handling ambient credentials via IAM roles for Service Accounts (IRSA) or instance profiles