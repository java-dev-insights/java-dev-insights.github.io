# STAR 28

Also add 3 user stories for VIES, VAT ID and MySQL 5.7 to 8.0 (I remember working on ticket to add index for DB column after migration) - add these 3 new user stories in STAR-L format


Let me research these three topics before writing the stories.

Good — I found the VAT ID ticket reference (TICKET-15546) and some Slack threads. Let me dig deeper.

Excellent — this is gold. I now have the exact technical details for all three stories. Let me get a bit more depth on the MySQL migration and the VIES work.

I now have all the technical detail I need. The three stories are clearly defined:

1. **VIES/VAT ID** — Two-phase work: TICKET-15546 (Phase 1: VIES FeignClient integration, validation statuses) + TICKET-16117 (Phase 2: BSS/vAccount integration, show validation status on postpaid My Address page) + TICKET-17132 (bug fix: validation status lost after page redesign)
2. **MySQL 5.7 → 8.0 migration** — TICKET-16623 (maintenance banner), TICKET-16232 (QA schema/Flyway fix), TICKET-16386 (scheduler job 10hrs→2hrs due to MySQL8 query cache removal), TICKET-17174 (missing index on `d_topup_transaction.paymentId` causing full table scans + RDS CPU alerts)

I have everything I need. Now let me append the three new stories to the existing document.

Now update the summary table to include the three new rows and fix the title:

Wait — you asked for 3 new stories (VIES, VAT ID, MySQL). Let me check: VIES and VAT ID are closely related (same ticket chain) — I combined them into one story (Story 26). Let me re-read your request and split them properly, then add Story 28 for the standalone MySQL missing-index story.

All 28 stories are confirmed. Let me also update the artifact title to reflect the new count.

The document is updated and will render with the new content. Here's a summary of the 3 new stories added:

---

## 3 New Stories Added (26, 27, 28)

### Story 26 — VIES FeignClient: EU VAT ID Validation (Phase 1)
**LP: Insist on the Highest Standards | Customer Obsession**
Built from [TICKET-15546](https://jira.vonage.com/browse/TICKET-15546) — the full backend integration with the EU Commission's VIES API. Key technical details captured:
* New `ViesClient` FeignClient with retry logic, metrics, and graceful degradation (never breaks existing flow)
* Four-state `vatIdValidationStatus` enum: `NOT_APPLICABLE`, `SAME_AS_EXISTING`, `VALID_VAT_ID`, `INVALID_VAT_ID`
* Static list of 26 applicable EU countries; QA bypass to avoid hitting live VIES in nightlies
* Confirmed by GitHub release commit [b422ef3](https://github.com/vonage-technology/dashboard/commit/b422ef39f73cc5cf8ed6f9d16e)

### Story 27 — VAT ID Validation Status Display: BSS Integration & Regression Fix (Phase 2)
**LP: Customer Obsession | Dive Deep**
Built from [TICKET-16117](https://jira.vonage.com/browse/TICKET-16117) + [TICKET-17132](https://jira.vonage.com/browse/TICKET-17132) — surfacing the validation status on the postpaid My Address page, plus diagnosing a regression where a page redesign silently dropped the status display. The root-cause analysis is verbatim from the ticket: *"vatStatusLabel lived in the wrong branch of the template — edit form instead of summary view. That's all it was."*

### Story 28 — MySQL 5.7 → 8.0 Migration: Schema, Missing Index & Performance Recovery
**LP: Dive Deep | Deliver Results**
Built from [TICKET-16623](https://jira.vonage.com/browse/TICKET-16623) + [TICKET-16232](https://jira.vonage.com/browse/TICKET-16232) + [TICKET-16386](https://jira.vonage.com/browse/TICKET-16386) + [TICKET-17174](https://jira.vonage.com/browse/TICKET-17174) — four interconnected problems from the same migration:
* **Maintenance banner** — customer communication for the migration window
* **QA schema fix** — Flyway migrations to resolve `GenericJDBCException` in nightly tests
* **Scheduler 10hrs→2hrs** — MySQL 8.0 removed query cache; fixed N+1 pattern with `accountOwnerCache`
* **Missing index / 97% RDS CPU** — `d_topup_transaction.paymentId` and `requestId` had no indexes, causing full table scans on every Braintree webhook and payment summary page load
