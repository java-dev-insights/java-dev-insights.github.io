# VAT ID Validation Status

<-- [Back](./..)  
::: info About
**VAT ID Validation Status: BSS Integration & Postpaid My Address Page (Phase 2)**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Dive Deep" />  
**Ticket:** TICKET-16117, TICKET-17132
:::

## Situation

Following the Phase 1 VIES integration (Story 26), which validated VAT IDs at the point of entry for prepaid users, Phase 2 extended this to postpaid customers. Postpaid customers have a read-only My Address page (they cannot edit their address directly in the dashboard), but they needed to be able to see whether their VAT ID had been validated or not — a key transparency requirement for EU business customers who rely on VAT exemption status for their invoicing. The validation status was available in the BSS system via the `taxInfo.exemptStatus` field, but was not surfaced in the dashboard UI.

## Task

I was responsible for reading the VAT ID validation status from the BSS endpoint and displaying it on the postpaid My Address page, gated behind the `vies-validation` feature flag. I was also responsible for diagnosing and fixing a regression where a page redesign inadvertently dropped the validation status display.

## Action

I integrated with the existing BSS endpoint `GET /NEXMO/account/{account_id}/v1/detail` to read `taxInfo.exemptStatus` and mapped it to a UI-friendly validated/unvalidated label on the postpaid My Address page. The feature was gated behind the `vies-validation` feature flag to allow controlled rollout. When a subsequent page redesign (by another team member) inadvertently dropped the validation status display (TICKET-17132), I was assigned to investigate. I traced the issue to the Angular template structure: the `vatStatusLabel` component had been placed inside the edit-form branch of the template, which never mounts for users with a saved address (who always see the read-only summary view). I moved the component to the summary view branch and raised the fix PR (#2809).


## Result

Postpaid customers could now see their VAT ID validation status (validated/unvalidated) directly on their My Address page when the feature flag was enabled. The regression was diagnosed and fixed within the same day it was reported. The fix was clean and surgical — no other functionality was affected.

## Learning

Feature flags are only as good as the regression testing that covers them. The redesign regression happened because the new page design was not tested with the `vies-validation` flag enabled. I learned to add feature-flag-specific test cases to the QA checklist for any page that has flag-gated behaviour.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The BSS endpoint `GET /NEXMO/account/{account_id}/v1/detail` returned `taxInfo.exemptStatus` — Arpit mapped this to a `vatIdValidationStatus` display label in the Angular component.
* The feature flag `vies-validation` was checked in the Angular template using the existing feature flag service, ensuring the validation status was only shown to accounts in the rollout cohort.
* The regression root cause (TICKET-17132): "For a user with a saved service address, `shouldShowSummary` is always `true` (read-only summary view), so the edit form branch never mounts and `vatStatusLabel` was never in the DOM at all. The feature flag and `taxExemptStatus` data were both fine the entire time. The status label just lived in the wrong branch of the template."
* Fix PR: dashboard-frontend #2809 — confirmed by Svetlana Nazarenko (reporter): "Fixed it now."
* The GitHub release commit b3636336 — "Release cdfront 16.31.0: fix TICKET-17132 [CD - Service Address Page] New Design Lost VAT ID Validation Status" — confirms the production fix.

## Context

surfacing the validation status on the postpaid My Address page, plus diagnosing a regression where a page redesign silently dropped the status display. 
The root-cause analysis is verbatim from the ticket: *"vatStatusLabel lived in the wrong branch of the template — edit form instead of summary view. That's all it was."*
