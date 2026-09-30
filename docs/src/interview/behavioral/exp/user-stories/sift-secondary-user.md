# SIFT Fraud Check for Secondary User Invite

QA Acceptance Criteria 
- No SIFT update immediately on inviting the secondary user
- Secondary user to be checked for fraud in SIFT similar to primary user on accepting invite
- Once Fraud check passed, sent sift event for create account
- SIFT to have all fields - user type, account ref, fraud score (same as primary), primary id
- Users invited via AD will also have a SIFT event sent.
- Does it behave the same for CPAAS users, for example DT?
- Primary user, on signup currency screen - submit will suspend the fraud user
- Is it the same for secondary user?


What and How?
- Defining a secondary user invite workflow in SIFT console UI (workflow and trigger event)
- Triggerring it as part of Secondary user invite flow
- Identify First login after accepting invite to check for fraud by triggering new workflow
- Lower the data to SIFT for users that didn't accept the invite, better data quality for ML
- immediate user suspension based on FRAUD decision, lesser number of reviews for fraud operation team
- designed to protect the primary user from getting banned incase of secondary user is highlighted as fraud

sum(increase(metric_name{filter="secondary_user_invite_flow"})[5m]) by (sift_decision, user_type)

Admin system and fraud_ops system in sync behavior
