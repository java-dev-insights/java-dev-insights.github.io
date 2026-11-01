# SSM Port-Forward & RDS Connectivity Infrastructure

<-- [Back](./..)  
::: info About
**SSM Port-Forward & RDS Connectivity Infrastructure**   
Amazon LP: <Badge type="warning" text="Invent and Simplify" /> <Badge type="tip" text="Dive Deep" />  
**Ticket:** TICKET-16150, TICKET-16152, TICKET-16182, TICKET-16181, TICKET-16180
:::

## Situation

After Vonage's migration to AWS, developers and QA tests needed to connect to RDS databases in the private VPC. The existing approach used direct localhost connections that no longer worked in the new AWS environment, breaking local development and QA test runs.

## Task

I was responsible for implementing SSM (AWS Systems Manager) port-forwarding scripts and updating all services to use the new connectivity approach.

## Action

I created `connect_cd_rds_proxy.sh` and `connect_user_rds_proxy.sh` scripts that used AWS SSM Session Manager to establish port-forward tunnels to the RDS instances. I updated the `dashboard-developer-gateway` (TICKET-16150), `dashboard` (TICKET-16152), `qatests_dashboard` (TICKET-16182), `admin-dashboard` (TICKET-16181), and `user-service` (TICKET-16180) to use the new SSM port-forward approach instead of direct localhost connections. I also updated the Admin Dashboard README with instructions for running locally with the new setup.

## Result

All services could connect to RDS in the AWS environment. QA tests ran successfully with the new connectivity approach. The SSM port-forward scripts became the standard tool for local development database access across the team.

## Learning

Infrastructure changes (like moving to AWS private VPCs) have a long tail of developer tooling impacts. I learned to proactively audit all localhost/direct connection references when migrating to a new network topology.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The `connect_cd_rds_proxy.sh` script used `aws ssm start-session --target <instance-id> --document-name AWS-StartPortForwardingSessionToRemoteHost` to tunnel RDS traffic through SSM.
* The `port-forward.sh` script was also created as a general-purpose port-forwarding utility.
* The `db_user` tickets (TICKET-8010, TICKET-8012, TICKET-8014, TICKET-8429) from 2022 were the earlier phase of this work — creating dedicated DB users for each service.
* Arpit's 2025 objectives noted "ssm-port-forward" as a key infrastructure improvement delivered.
