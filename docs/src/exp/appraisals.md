# Good Things from Appraisal Comments

## 2026

```
Congratulations on your April API Engineering Rockstar nomination!

“Arpit's attention to detail is exceptional. He genuinely cares about the stability of our platform and the productivity of everyone on the team. He's always looking for ways to automate the pain points we encounter, making all our lives easier.

What really stands out is how effortlessly he embraces new technologies and ideas. He's not just open to innovation, he actively brings fresh perspectives and solutions to the table. Whether it's brainstorming sessions or just lending a hand when someone's stuck, Arpit is always there with genuine enthusiasm and support.
He's truly a role model for everyone on the team. Thanks for being such an amazing colleague, Arpit! 🙌”
```

## 2025

::: details Self
```
Summarizing my year below:

- Discovery Analysis for blocking PayPal (via Braintree) in EUR and USD
- Developer efficiency by adding scripts for Port-forwarding (localhost, RDS, DB sync) for our pytest, our backend services, our frontend, developer-gateway and dependent MFEs along with updating README to have step-by-step instruction
- also assisted with localhost setup for few members from MFE teams outside our Dashboard Squads
- EPIC for Negative Balance Notifications
- EPIC for Payments KYC
- Service ownership - Scheduler
- Adding metrics and Grafana for all the DashboardHttpClient which earlier was a blind spot
- Security and Vulnerability KTLO annual goal for team - Prisma (platform issues) and Mend issues - link to SPOG grafana
- Prepaid USD : Braintree 3D secure flag
- STORY for Multi-currency : Prepaid USD - Zoho Support and currency templates
- User Service : artifactory migration to vonagecc and gradlew upgrade
- Adding github actions on PR creation
- Block non-sanctioned countries when adding new Payment Method for CIFIUS compliance
- DevRel Pricing API Modifications
- KTLO tickets for puppet/route changes, flyway, pet-alerts etc
- Supporting team members on setup/queries
- ask-api-customer-dashboard queries
- On-call support
- Adding documentation by creating or updating javadoc comments, confluence pages and README
- Regularly supporting QA team with issues observed in nightlies run
- improve/maintain code quality and adding javadoc comments for methods in the code
```
:::

```
For this year 2025 your contribution have been very noticeable. You worked on new features while exploring new part of the system and building on top of it. You have overall good understanding of different services that comes from past experience and your constant learnings attitude. Your continuous effort to make system more reliable and structured while doing PRs, documentation, refactoring is clearly visible.  As we move forward you should also  start thinking more towards features delivery than limiting to feature development.  We should be focused more on small continuous enhancements than delivering big. You are in a good place to drive these necessary changes for your features as team has good trust in your decisions making. We should also think towards how we handle blocker, splitting the task which is blocked and delivering on what we could should be our goal,  but if that cannot happen then maintaining a backlog for those blocked items could be the solution. These action will bring more ownership in your day to day work.
```

::: details Self
```
Deliverables were aligned with the Ericsson Values of Professionalism, Respect, Perseverance and Integrity.

Example : For each JIRA ticket, followed the process
- grooming ticket with detailed description and QA acceptance criteria (with testing steps)
- Maintaining code quality (Clean code, IntelliJ plugins to validate the code complexity and sonar reports for coverage)
- Running nightlies before moving to ready for code review
- Updating pytest wherever relevant to keep regression test up-to-date
- Updating confluence page related to ticket

Addressing the review comments from previous year
- Started creating backlog tickets for any improvements found while working on a ticket to be prioritized later, keeping focus on delivering the current feature on time.
- Asking for help to get unblocked faster and also sharing the findings within team in case anyone else faces the same issue.
- Taking ownership, brainstorming and suggesting solution for review - example Payment KYC, Negative Balance Notification, ssm-port-forward (localhost using both gradle and docker) etc
- Along the way, learning better ways to breakdown the tasks at hand to have on-time delivery at sprint level not just on monthly or quarterly level - excluding external factors like code freeze, change in mandatory tools (like we had for vonage-aws and lb urls not accessible using any vpn)
```
:::

```
We have seen great communication and collaboration from you this year. You are vocal and ask good questions around your tasks and projects. It is clear that your knowledge about the system and the context of the work being done is constantly improving. As you progress to your next carrier stage which require more independence, Identifying new feature enhancements self driving them planning them and further efficiently using available resources to deliver them, try reflecting on these aspects.  As an experienced member of the team, you should think how to direct improvements to the platform and take a greater ownership of parts of the system. This will enhance your accountability and also help to further develop the trust that others have in you.
```

## 2024

```
Add Lifecycle Events to VCP Core Documentation

Refund related issue in Payment flow for PayPal when SIFT returns abuse

Move organisation configuration to config service

Investigate and reduce error logs in prod kibana

New endpoints in user-service

Kafka Cluster 

remove SL layer reference as it is deprecated and moved to atmos
move vbilling listener from kiwi cluster to Hermes
CSP DT domain name change - EPIC for 4 domains api.telekom.net to developer.telekom.com

Security and Vulnerability tickets

Hardcoded credentials and VRR
Mends Issues (ongoing)
Dashboard Cache - pipeline to clear stale groupIDs

One Trust Banner

Artifactory related tickets

Primary Domains Switch

BSS discussions - vaccounts call during signup 

Updates to Grafana, Kibana and sre-alerts

On-Call weeks

code refactoring / adding javadoc comments to code

AWS CCP
KTLO tasks
```

```
You have worked on a wide variety of tasks this year and are delivering very well taking a detailed and thorough approach to the tasks. You are able to work independently on most tasks and show good initiative with how you are able to uncover additional tasks and general improvements that need to be made. You have a great attention to detail when it comes to documentation, comments and refactoring work. 

What I think you need to focus on now is to start taking a more pragmatic view on your tickets. Think about what in the task is adding value for the business and what is an improvement which is really technical debt. Those tasks can be put into the backlog to be prioritised and delivered in the future but don't need to block the delivery of the value you're adding in your ticket. This will help with your ability to deliver on-time. Think about shifting your focus from perfection to delivering value. 

In 2025 I would like to see you become more proactive and faster in asking for help from the team when you're stuck or struggling to get unblocked and to also think about how you can drive your tasks through to completion, taking ownership of getting answers to requirement questions, uncovering dependencies and pushing to get them resolved, and designing solutions for issues which you encounter. This will all lead to collaborating more outside of the immediate team and will help to significantly increase your knowledge.
```

```
You demonstrate Excellence in the way you strive for perfection in your work. At times this can be a detriment to delivering the tasks so you need to think about how to channel that enthusiasm to make sure that we don't lose sight of the improvements which are needed or the need to deliver value.

You collaborate well within the team and have connections outside the team as well. You take good accountability for your tasks but I would like to see more focus on solutions. Can you come up with solutions to the issues you uncover and ask for feedback on the solutions rather than asking for suggestions on how to fix a problem which you have discovered?

The team has trust in your ability to tackle a wide variety of tasks. This can grow by focussing on continuous incremental delivery for your tasks to really demonstrate the progress that you are making through the backlog
```

## 2023

```
Worked on tasks for Epics

Lifecycle Events (Can be consumed by down-stream systems to remain updated with the modifications without making frequent api calls and it will also deprecate the existing volga events listener that we have in dashboard)
Dashboard Security Vulnerabilities
Alerts Improvement
User Service Separation
Dashboard support multimaster
Migrate emails to notification service
Show/Hide pages for CSPs (frontend)
10DLC changes Q1
 

KTLO tasks and bug fixes

Deployments and checking grafana post-deploys

On Calls

Confluence page updates

Postman collection updates

Add Pipeline DeleteStaleKafkaGroupIds
```

```
Arpit has worked on a variety of projects in 2023:

Kafka refactor
Lifecycle Events introduction
Frontend improvements (10DLC, Bug fixing, etc.)
Contribution to User multi account work
Continued help with Support queries, deployments and on-call support
Training and personal development
Arpit has made a good contribution to our projects, and has shown good improvement in his development skills, both on the frontend and backend side. He is always happy to engage in complex work, and has shown that he can now work effectively in more complex environments (multiple systems , kafka, etc.). He is no longer limited to tickets involving a single system, but can work well on tasks that involve multiple components. 

 

He has also contributed to our documentation, and really well understood the need and impact of well documented code.

 

Some areas of growth for 2024, would be:

Develop fluency and speed of delivery: we now need to focus on increasing your output, and have you deliver faster. That will likely come from both more upfront analysis and preparation before starting tasks, to make sure that you are clear on the path to completion, and then also become more comfortable with our stack and language, to allow you to get to the result quicker.
Participating in team discussions and planning: I would also like to hear your voice more in meetings and discussions, and start to see some original ideas coming from you in terms of areas of code improvement, process improvement ideas, etc.
```

```
Arpit is a reliable, trustworthy colleague, and he is trusted and respected within the team. He always owns his tasks, and shows accountability in everything he does. He is very much a team player, always offering help, and his tasks are always performed to the best of his abilities.
```

## 2022

```
Objectives :

- Improve Customer Dashboard platform

- Learn a bit about different existing code repos like puppet-master etc.

- Start contributing in modules/features that I haven't worked on previously.

 

Metrics : 

- Contributions to develop new features/changes

- Fixing bugs

- Update documentation (confluence pages)


Performance :  
I contributed to the following

- AWS migration

- Reports API Integration and JSP files cleanup

- Changes for separate DB Users for Dashboard services

- Kafka Topic Migration to Hermes Cluster (AWS)

- TenDLC Campaign

- JIRA Tickets with clear objectives for product (created or modified)

- PR reviews and deployments

- Helping new team members get up to speed with our platform

- Update confluence pages

- On Call support
```

```
Arpit has had a good year in 2022, and has made a good contribution to the team. 

He has indeed contributed to our AWS migration, a lot of new features, and been involved in supporting customer queries, and in many other areas.

It's been great to see Arpit be so broadly involved in the team's work.

 

His work is always precise and well documented and tested. Arpit is always taking on feedback in a positive way, and is curious and eager to learn which is really great to see.

 

I look forward to seeing more work and growth in 2023. Arpit definitely has potential to improve, especially when it comes to velocity and in-depth language knowledge, but that will come in time no doubt.
```

```
Again, Arpit has really shown he is a true team player, often putting others before himself. He's a joy to work with, and a great individual, who is definitely working within the Vonage values.

I am very grateful to Arpit for his work.

I would also like to spend more time working out a career development plan and learning plan also for 2023, to help us unlock more of Arpit's potential
```

## 2021
