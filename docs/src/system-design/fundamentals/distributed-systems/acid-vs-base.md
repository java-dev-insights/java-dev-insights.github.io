# ACID vs BASE Transactions

- [ACID vs BASE article](https://designgurus.substack.com/p/acid-vs-base-the-system-design-interview)

![ACID vs BASE bytebytego](https://substackcdn.com/image/fetch/$s_!x_AK!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F732e86b8-f57e-4e0a-941f-5c6e15c2a53d_1591x1600.png)

## ACID Properties

ACID for Relational Databases
- Atomicity
- Consistency - Rules for Data Consistent example - foreign keys
- Isolation
- Durability

Monolithic Services had ACID provided by Relational Databases, but distributed systems we no longer have single DB.

- Order, Payment, Inventory db table owned by different microservices on different DB servers
- Isolation : As soon as one service finish, taht data is visible irrespective of other service finished or not.
- Durability : At service level, not at workflow level.

We can't have proper ACID in distributed systems but only certain bits.

![](https://substackcdn.com/image/fetch/$s_!nWmn!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa3a30848-227d-44d0-a074-397e15ab0daf_2816x1536.png)

## BASE

![](https://substackcdn.com/image/fetch/$s_!fe0T!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe030f46b-d6ef-49ff-a8f8-999a02f331e9_2816x1536.png)

## Comparision

![](https://phoenixnap.com/kb/wp-content/uploads/2025/03/transaction-replication-synchronous-vs-asynchronous.png)

![](https://media.licdn.com/dms/image/v2/D5622AQGtYvtJWuvNBg/feedshare-shrink_800/B56Zf32vsJHQAo-/0/1752210031848?e=1791417600&v=beta&t=kqs99xRfJ6NGtKiCenGkdkqXWrSFHO8L7dn6IX-E61A)

## Atomicity in Distributed Systems

Individual Microservices being called by orchestrator
- Success : Service A, B and C all passes
- Failure 1 : Service A an B passes but C fails, we do a compensating update
- Failure 2 : Service A an B passes but C fails, we do a compensating update that itself fails

One option is that once we know we are in the error state, orchestrator resturn to user that we are in failed state and doing compensating updates soon.
The mandate is Microservices is Eventual consitency with out of sync for short period of time, this time duration is defined ny problem domain

Eventual Consistency in Prod in most systems is few milliseconds dependending on problem domain.

## Eventual Consistency Patterns

::: details {open}
![eventual](https://assets.bytebytego.com/diagrams/0100-eventual-consistency-patterns-you-must-know.png)
:::