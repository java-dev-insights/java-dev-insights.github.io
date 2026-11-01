# Security: Removing Hardcoded Credentials from Dashboard Repository

<-- [Back](./..)  
::: info About
**Security Hardening: Removing Hardcoded Credentials & Fixing XSS Vulnerabilities**.  
**Security: Removing Hardcoded Credentials from Dashboard Repository**   
Amazon LP: <Badge type="warning" text="Earn Trust" /> <Badge type="tip" text="Dive Deep" />  
**Ticket:** TICKET-13735, TICKET-13852, TICKET-13944, TICKET-14078
:::

## Situation

A secret security scan identified 15 places in the dashboard repository where credentials were being leaked — hardcoded in source code and, critically, in git history. This was a serious security vulnerability that could expose production credentials if the repository was ever compromised.

A secret security scan identified **15 places** in the Customer Dashboard GitHub repository where credentials (API keys, passwords, tokens) were hardcoded in source code (TICKET-13735). This was a critical security vulnerability — any developer with repository access, or any attacker who gained access, could extract live credentials. The issue was flagged as a VRR (Vulnerability Risk Rating) finding.

A secret security scan identified 15 places in the dashboard repository where credentials were being leaked into Git history. Separately, security researchers reported XSS vulnerabilities (TICKET-11309 Reflected XSS, TICKET-13621 XSS to ATO via Password Manager, TICKET-13666 JSONP endpoint callback validation). These were not theoretical risks — an XSS-to-ATO (Account Takeover) vulnerability on `rest.nexmo.com` could allow attackers to hijack customer accounts.

## Task

I was responsible for remediating all 15 secret scan violations, which required not only removing credentials from the current codebase but also rewriting git history to eliminate them from all historical commits.

Remediate all 15 credential leaks: remove secrets from the codebase, migrate them to AWS Secrets Manager, and clean the Git history to ensure the credentials were not recoverable from past commits.

Remediate all credential leaks and XSS vulnerabilities, ensuring both current code and Git history were clean, and establish ongoing security hygiene through Mend and Prisma scanning.

## Action

I worked through each violation systematically. For credentials that were still valid, I invalidated them first, then moved them to AWS Secrets Manager. For credentials only in git history, I used `git filter-branch` / BFG Repo Cleaner to rewrite history and force-pushed the cleaned branches. I raised GitHub issues for each violation (tagged "Secret Scan: violation") and tracked them to closure. I also coordinated with the VRR (Vulnerability Risk Register) team to formally close the security findings.

* Audited all 15 GitHub issues raised by the security scan, categorising them by severity and service.
* Replaced hardcoded credentials with references to AWS Secrets Manager across the dashboard and related services (TICKET-13852 — Part 1).
* Rewrote Git history to remove the credentials from all historical commits (TICKET-13944 — Fix History Part 1), using `git filter-branch` / BFG Repo Cleaner.
* Resolved a reopened GitHub security issue that persisted after the initial fix (TICKET-14078).
* Verified all VRR findings were closed and confirmed with the security team.
* Also fixed a separate XSS vulnerability in the `devapi` JSONP endpoint callback parameter (TICKET-13666), implementing proper input validation to prevent reflected XSS and Account Takeover (ATO) attacks (TICKET-13621, TICKET-11309).
* Led the credential removal project (TICKET-13735): identified all 15 GitHub secret scan violations, removed secrets from current code (TICKET-13852), rewrote Git history to remove secrets from past commits (TICKET-13944), and resolved the reopened GitHub security issues (TICKET-14078).
* Fixed the XSS-to-ATO vulnerability (TICKET-13621) on `rest.nexmo.com` and the JSONP callback validation issue (TICKET-13666) in DevAPI.
* Addressed Reflected XSS (TICKET-11309) in the Dashboard frontend.
* Ran systematic Mend vulnerability remediation across both `user-service` and `dashboard` repos: fixed critical `spring-beans` (TICKET-15615), `kafka-clients` (TICKET-15630), `embedded-redis` (TICKET-15004), `zookeeper` (TICKET-13994), `tomcat-embed-core`, `c3p0` (TICKET-13910), `h2` (TICKET-15733), `wiremock` (TICKET-13990), `nexmo-auth-springboot` (TICKET-13993), `hibernate-core`, `spring-web`, and `spring-kafka-test`.
* Ran Prisma scan remediation for both services (TICKET-15002, TICKET-15291).
* Removed G-Cloud credentials from the CD repo (TICKET-15458).

## Result

All 15 secret scan violations were remediated. The VRR findings were closed. The dashboard repository was clean of hardcoded credentials, and the team adopted AWS Secrets Manager as the standard for credential storage going forward.

* All 15 credential leaks remediated and VRR findings closed.
* Git history cleaned — credentials no longer recoverable from repository history.
* XSS vulnerability in the pricing JSONP endpoint patched, closing a bug-bounty-reported Account Takeover vector.
* Security posture of the dashboard codebase significantly improved.
* All 15 credential leaks resolved — GitHub secret scan violations closed.
* XSS and ATO vulnerabilities patched, reducing the attack surface on customer-facing endpoints.
* Mend vulnerability count reduced to KTLO (Keep The Lights On) baseline for the team — noted in 2025 personal objectives as "Further Reduction of mend vulnerabilities (KTLO for team achieved)".
* Established a culture of proactive security scanning within the team.

## Learning

I learned that security remediation in git repositories is significantly harder than in live code — rewriting history requires careful coordination to avoid breaking other developers' branches. I now advocate for secret scanning as a pre-commit hook rather than a post-hoc scan.

Security debt compounds silently. I learned that hardcoded credentials are often a symptom of missing secrets-management infrastructure, not just developer carelessness. Fixing the symptom (removing the secret) without fixing the root cause (no secrets manager integration) just delays the next incident.

Learned that security debt compounds — each unresolved vulnerability increases the blast radius of a potential breach. I also learned the technical complexity of rewriting Git history safely (using `git filter-branch` / BFG Repo Cleaner) without disrupting active development branches.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The GitHub PR 3710 addressed Part 1 of the secret scan violations.
* TICKET-13944 specifically addressed fixing the git history — the most technically complex part of the remediation.
* TICKET-14078 was a reopened issue for GitHub-specific violations that required a second pass.
* The work was done in two phases: first fixing the current codebase (Part 1), then cleaning git history (Part 2), to minimise disruption to the team.
* **JIRA:** TICKET-13735 (parent), TICKET-13852, TICKET-13944, TICKET-14078 (credential removal); TICKET-13621 (XSS to ATO), TICKET-13666 (JSONP), TICKET-11309 (Reflected XSS)
* **JIRA Mend tickets:** TICKET-15615, 15630, 15004, 13994, 13910, 15733, 13990, 13993, 15002, 15291, 15458
* **GitHub:** `build(gradle): TICKET-15630 mend critical issue kafka clients (#456)`
* **2025 Personal Objectives:** "Security and Vulnerability — Better Mend scan and Prisma reports — Further Reduction of mend vulnerabilities (KTLO for team achieved)"
