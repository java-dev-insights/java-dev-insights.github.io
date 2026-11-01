# 10DLC Campaign Management: Full Feature Delivery

<-- [Back](./..)  
::: info About
**10DLC Campaign Management: Full Feature Delivery**   
Amazon LP: <Badge type="warning" text="Customer Obsession" /> <Badge type="tip" text="Deliver Results" />  
**Ticket:** TICKET-10220, TICKET-10160, TICKET-10309, TICKET-9424, TICKET-9999, TICKET-10083, TICKET-10225, TICKET-10050
:::

## Situation

The US 10DLC (10-Digit Long Code) campaign registration system was a new regulatory requirement for SMS messaging in the US. Vonage needed to implement a full campaign management UI in the Customer Dashboard, including campaign creation, editing, deactivation, and compliance with TCR (The Campaign Registry) requirements.

## Task

I was responsible for implementing multiple features and bug fixes across the 10DLC campaign management UI, including terms and conditions, subscriber opt-out handling, campaign filtering, and various bug fixes.

## Action

I implemented the Campaign Terms and Conditions acceptance flow (TICKET-9424), ensuring the `tc_agree` boolean was correctly populated in the POST API call to TenDLC (TICKET-9999). I fixed the subscriber opt-out attribute for 2FA campaigns (TICKET-10160, TICKET-10309), which was mandatory but not being set. I implemented campaign filtering for expired 10DLC campaigns (TICKET-10220). I fixed the campaign description validation (TICKET-10225), the TCR alphanumeric field validation (TICKET-10083), and the numbers list refresh bug (TICKET-10050). I also added a note on the brands page about vetting requirements (TICKET-8267).

## Result

The 10DLC campaign management feature was delivered with full compliance with TCR requirements. The subscriber opt-out fix ensured Vonage's customers were compliant with US SMS regulations. The UI bugs were resolved, improving the campaign creation success rate.

## Learning

Regulatory compliance features (10DLC, GDPR) require close collaboration with legal and compliance teams to understand the exact requirements. I learned that "mandatory field" in a regulatory context means zero tolerance for omission — the fix had to be retroactive for existing campaigns.

## Deeper Dive (Technical Detail from Jira/GitHub)

* The `tc_agree` field (TICKET-9999) was a boolean that had to be `true` for the TCR API to accept the campaign creation request.
* The subscriber opt-out fix (TICKET-10309) required updating existing 2FA campaigns in the database to set the opt-out attribute retroactively.
* The campaign filtering (TICKET-10220) used the campaign status and expiry date to hide expired campaigns from the active list.
* A stuck campaign (TICKET-10467) at `CARRIERS_REVIEW` status was investigated and resolved by triggering a manual status refresh via the TenDLC API.
