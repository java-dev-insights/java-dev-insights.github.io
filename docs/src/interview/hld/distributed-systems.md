# Distributed Systems

- [Distributed Transactions](distributed-transactions)

## Distributed Transactions

::: tip Scenario
Independent services owning the spearate DB don't know about each other, and hence we don't have complete rollback possible as opposed to single DB commiting related transactions as `either ALL or NONE`.
:::

- Definition : A single logical operation spanning accross multiple independent services and DB, where all the steps need to succeed together or rollbacked.
- Solutions:
  - 2-Phase Commit
  - Saga Pattern

### 2-Phase Commit

::: info Strong Consistency
This gives `Strong Consistency`, same gaurantee as single DB.  
No window of inconsitency or partial consistency state.
:::

- Coordinator component : makes sure all participants in a transaction agree on the outcome before commiting the changes.
- PHASE 1 : Prepare Phase
  - Coordinator asks the parcipants to prepare
  - Participants process the request
  - Durably records the changes so that nothing is lost if it crashes 
  - locks the affected rows so no other transaction can modify them in the meantime
  - Responds to coordinator with yes or no
  - If any participant responds no, coordinator instructs all participants to abort and release their locks.
  - If all participants respond yes, move to phase 2.
- PHASE 2 : 
  - Coordinator sends commit message to all participants
  - Participants commit their transactions and release the locks

#### Issue with 2-phase commit
- Needs multiple machines to be healthy all at the same time.
- Example: Coordinator crashes after getting yes from all participants, but before sending a commit message.
  - all participants are stuck with locked rows and don't know what to do next (commit or abort)
  - locked rows now impact other transactions waiting on that row which are now blocked
- Single slow participant holds up the entire transaction.
- Participant can go offline before responding yes/no and coordinator is left waiting (timeout can solve it)

### Saga Patterns

::: info Eventual Consistency
This gives strong Consistency, same gaurantee as single DB.  
No window of inconsitency or partial consistency state.
:::

- Options
  - Choreography
  - Orchestration

![Distributed Transactions Explained: 2 Phase Commit vs Saga Pattern](https://www.youtube.com/watch?v=DOFflggE_0Q){target="_blank"}
