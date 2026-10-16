# Security: Removing Hardcoded Credentials from Dashboard Repository

<-- [Back](./..)  
::: info About
**Security: Removing Hardcoded Credentials from Dashboard Repository**   
Amazon LP: <Badge type="warning" text="Earn Trust" /> <Badge type="tip" text="Dive Deep" />  
**Ticket:** TICKET-13735, TICKET-13852, TICKET-13944, TICKET-14078
:::

## Situation

A secret security scan identified 15 places in the dashboard repository where credentials were being leaked — hardcoded in source code and, critically, in git history. This was a serious security vulnerability that could expose production credentials if the repository was ever compromised.

## Task

I was responsible for remediating all 15 secret scan violations, which required not only removing credentials from the current codebase but also rewriting git history to eliminate them from all historical commits.

## Action

I worked through each violation systematically. For credentials that were still valid, I invalidated them first, then moved them to AWS Secrets Manager. For credentials only in git history, I used `git filter-branch` / BFG Repo Cleaner to rewrite history and force-pushed the cleaned branches. I raised GitHub issues for each violation (tagged "Secret Scan: violation") and tracked them to closure. I also coordinated with the VRR (Vulnerability Risk Register) team to formally close the security findings.

## Result

All 15 secret scan violations were remediated. The VRR findings were closed. The dashboard repository was clean of hardcoded credentials, and the team adopted AWS Secrets Manager as the standard for credential storage going forward.

## Learning

I learned that security remediation in git repositories is significantly harder than in live code — rewriting history requires careful coordination to avoid breaking other developers' branches. I now advocate for secret scanning as a pre-commit hook rather than a post-hoc scan.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The GitHub PR 3710 addressed Part 1 of the secret scan violations.
* TICKET-13944 specifically addressed fixing the git history — the most technically complex part of the remediation.
* TICKET-14078 was a reopened issue for GitHub-specific violations that required a second pass.
* The work was done in two phases: first fixing the current codebase (Part 1), then cleaning git history (Part 2), to minimise disruption to the team.
