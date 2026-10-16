# VIES Integration: EU VAT ID Validation FeignClient (Phase 1)

<-- [Back](./..)  
::: info About
**VIES Integration: EU VAT ID Validation FeignClient (Phase 1)**   
Amazon LP: <Badge type="warning" text="Insist on the Highest Standards" /> <Badge type="tip" text="Customer Obsession" />  
**Ticket:** TICKET-15546, TICKET-15464
:::

## Situation

Vonage's Customer Dashboard allowed users to enter any VAT ID on the My Service Address page with no validation whatsoever. For EU businesses, an incorrect or fraudulent VAT ID directly affects whether VAT is charged — a valid EU VAT ID triggers tax exemption under EU reverse-charge rules. This was a compliance and revenue risk: customers could enter invalid VAT IDs to avoid paying VAT, and Vonage had no audit trail. The VIES (VAT Information Exchange System) — the EU's official VAT validation service — was available as a public API but had not been integrated.

## Task

I was responsible for the full backend integration of VIES into the dashboard's company profile edit flow (Phase 1), and then for surfacing the VAT ID validation status on the postpaid My Address page via BSS/vAccount integration (Phase 2).

## Action

For Phase 1 (TICKET-15546), I built a new `ViesClient` FeignClient against the EU Commission's public VAT validation API (`https://ec.europa.eu/taxation_customs/vies/`), with proper metrics integration, retry logic, and graceful degradation (any API error must not break the existing company edit flow — the endpoint still returns HTTP 200). I implemented a static list of the 26 applicable EU countries and a four-state `vatIdValidationStatus` enum: `NOT_APPLICABLE` (country not in list), `SAME_AS_EXISTING` (VAT ID unchanged — skip the API call), `VALID_VAT_ID`, and `INVALID_VAT_ID`. I added a QA bypass so nightlies would not call the live VIES API. I added the `vatIdValidationStatus` field to the `edit-company` API response (`/api/v1/edit-profile/company`). For Phase 2 (TICKET-16117), I integrated with the BSS endpoint `GET /NEXMO/account/{account_id}/v1/detail` to read the `taxInfo.exemptStatus` field and display the validated/unvalidated status on the postpaid read-only My Address page, gated behind the `vies-validation` feature flag. When a regression in the page redesign dropped the validation status display (TICKET-17132), I diagnosed the root cause — the `vatStatusLabel` component was placed in the edit-form branch of the Angular template, which never mounted for users with a saved address (who always see the summary/read-only view) — and fixed the misplaced template code.

## Result

Vonage's dashboard now validates EU VAT IDs against the official VIES registry at the point of entry, providing an audit trail of validation status for compliance and finance teams. Postpaid customers can see their VAT ID validation status directly on their My Address page. The graceful degradation design ensured zero customer-facing disruption even when the VIES API was intermittently unavailable.

## Learning

Integrating with a third-party government API taught me to design for unreliability from the start — the VIES API documentation explicitly warns of downtime, so the "never break the existing flow" requirement was non-negotiable. I also learned that feature flags are essential for compliance features that affect billing, as they allow controlled rollout and instant rollback.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The `ViesClient` FeignClient used the EU Commission's Swagger-documented API (`swagger_publicVAT.yaml`) with a configurable timeout and retry policy (3 retries with exponential backoff).
* The 26 applicable EU countries were stored as a static `Set<String>` in a configuration class, making it easy to update without a code change.
* The `SAME_AS_EXISTING` status was a key optimisation — if the user submits the same VAT ID they already have on file, the VIES API call is skipped entirely, reducing unnecessary external API calls.
* Metrics were added to track VIES API call success/failure rates in Grafana, enabling monitoring of VIES availability.
* The Phase 2 bug fix (TICKET-17132) was diagnosed by Arpit: "The root cause was simply misplaced code. `vatStatusLabel` was in the edit form branch of the template — edit form instead of summary view. That's all it was." — a clean, precise root-cause analysis under pressure.
* The GitHub release commit b422ef3 — "Release 1477: TICKET-15546 Add VATID validation of specific EU countries" — confirms the production deployment.
