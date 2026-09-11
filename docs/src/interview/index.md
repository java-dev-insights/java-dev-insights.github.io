# Interview Landscape

- `Coding` : DSA and patterns
- `LLD` : OOP, OOD, SOLID, Design Patterns and Common Questions (Parking Lot, LRU Cache)
- `HLD (System Design)` : Concepts (including Distributed Systems) and Common Questions (Rate Limiter, URL Shortner, Notification System)
- `Concurrency` : Mutex
- `FAQs` : Java, Spring, AWS
- `Behavioral` : STAR format story
  - Negative Balance : Impacts
  - MySQL upgrade (5.7 to 8)
- `Salary Negotiations`

O'reilly marathon : 14 sessions x 4h each

::: details References
- https://bytebytego.com/pricing 
- https://leetcode.com/subscribe/ 
- https://neetcode.io/pro 
- https://www.hellointerview.com/premium 
- https://algomaster.io/premium 
- https://www.hackerrank.com/dashboard
- Mocks
  - https://www.tryexponent.com/upgrade 
  - https://start.interviewing.io/dashboard 
- https://www.designgurus.io/pricing 
- https://www.techinterviewhandbook.org/software-engineering-interview-guide/ 
- https://algo.monster/subscribe 
- https://www.geeksforgeeks.org/interview-prep/interview-corner/ 
:::



- DSA : 
- LLD : Low Level Design
- HLD : High Level Design

`HLD (High Level Design)` is the *architecture*: how the whole system is broken into services, how they communicate, how data flows, and how it scales. It answers "how do the pieces fit together?"  

`LLD (Low Level Design)` is the *implementation blueprint*: classes, interfaces, methods, relationships, and design patterns inside one component. It answers "how is this one piece built?"  
  
Think of building a housing complex. HLD is the site plan, where the towers, roads, water tanks, and power lines go. LLD is the detailed drawing of a single apartment, where each wall, socket, and pipe sits.

## HLD Building Blocks

When you design at the high level, you reason about:
- Load balancing to spread traffic across servers
- Caching (Redis, CDN) to cut latency and database load
- Databases: SQL vs NoSQL, sharding, replication, the CAP trade-offs
- Message queues (Kafka, RabbitMQ) for async, decoupled communication
- Non-functional requirements: throughput, availability targets, consistency model

## LLD Building Blocks

Zoom into one service and the questions flip to code quality:

- Classes and interfaces, and the relationships between them
- SOLID principles and design patterns (Strategy, Factory, Observer, Singleton)
- Encapsulation: what is public, what is hidden
- Extensibility: can you add a feature without rewriting existing code?

## Mini-Example: Notification System

HLD view: a Notification Service behind a queue; producers publish events, workers consume and fan out to email, SMS, and push providers; a retry queue handles failures; a database stores delivery status.  

LLD view: a NotificationSender interface with EmailSender, SmsSender, PushSender implementations, a NotificationFactory to pick the right one, and an Observer pattern to update status listeners. Same system, two altitudes.

