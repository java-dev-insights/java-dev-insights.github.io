# System Design

::: details Ace system design
![Ace system design](https://miro.medium.com/v2/resize:fit:1400/1*T9CFIuoIO24UcNRGRpi7dQ.png)
:::

::: details One to Million Users
![one-to-million](https://bytebytego.com/images/courses/system-design-interview/scale-from-zero-to-millions-of-users/figure-1-11-VI5Z74Q2.png)
:::

::: details Building Blocks
![Building Blocks](https://miro.medium.com/v2/resize:fit:1400/0*V-3JqfRDm9HSp_gG.png)
:::

::: details Design trade Offs
![system design trade-offs](https://substackcdn.com/image/fetch/$s_!HWMz!,w_1456,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c3e3af8-5a12-4036-8a93-ef17c5461d8b_800x998.gif)
:::

::: details How Load Balancers Work?
![how-load-balancers-work](https://substackcdn.com/image/fetch/$s_!vk6o!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03be3e59-2cf7-4276-bb2e-29125424dfc8_2360x2920.png)
:::

![Life of Redis Query](https://substackcdn.com/image/fetch/$s_!fGFd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9ffab5bc-5857-4544-8e25-2dbf795e6f85_3000x3900.png)

::: details System Design {open}
<YouTubeEmbed video-id="SE2KF-vxvS0" /><br/>

<YouTubeEmbed video-id="oYxTTirKY8M" /><br/>
:::

::: details Distributed Systems {open}
<YouTubeEmbed video-id="DOFflggE_0Q" /><br/>
:::

::: details API {open}
<YouTubeEmbed video-id="UXA8MJUWUqU" /><br/>

<YouTubeEmbed video-id="GcVtElYa17s" /><br/>

<YouTubeEmbed video-id="9JPnN1Z_iSY" /><br/>

<YouTubeEmbed video-id="zvWKqUiovAM" /><br/>
:::

::: details Networking {open}
<YouTubeEmbed video-id="bdeV_TjNfFA" /><br/>

<YouTubeEmbed video-id="4I2AZ1by_sY" /><br/>

<YouTubeEmbed video-id="Q7IxCEvXGvc" /><br/>

<YouTubeEmbed video-id="5SeEvvnYgCo" /><br/>
:::

::: details Linux {open}
<YouTubeEmbed video-id="qvjRcZcW8CY" /><br/>

<YouTubeEmbed video-id="V7Zcii8Syws" /><br/>
:::

::: details Draw io {open}
<YouTubeEmbed video-id="yrghOH_1MuM" /><br/>
:::


# System Design

This is the HLD part in interviews, Here is a [week-by-week plan](plan) spread over 6-week and 12-week for prep.

::: details references {open}
- [System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction){target="_blank"}
- algomaster : [SD Interview](https://algomaster.io/learn/system-design-interviews/introduction){target="_blank"} and [SD Fundamental](https://algomaster.io/learn/system-design/course-introduction)
- [bytebytego](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users){target="_blank"}
- [HLD mastery](https://hldmastery.com/){target="_blank"}
- [tech interview handbook](https://www.techinterviewhandbook.org/){target="_blank"}
- Design Gurus : [learn](https://www.designgurus.io/learn-system-design){target="_blank"} and [SD Interview Roadmap](https://www.designgurus.io/path/system-design-interview-playbook){target="_blank"}
:::

<YouTubeEmbed video-id="FxAom29OEKE" />

<YouTubeEmbed video-id="SE2KF-vxvS0" />

::: details what is grokking system design?
Grokking System Design is a popular pattern-based methodology and course framework used by software engineers to prepare for technical architecture interviews.  
Instead of memorizing answers to random questions, it teaches reusable building blocks like caching, sharding, and load balancing.
:::

## Phase 1 — Foundations (Start Here)
*Build the mental model before diving into specifics.*

### 1. Software Architecture Foundations 🔥
- What is Software Architecture?
- Architecture vs. Design
- Key Quality Attributes — Scalability, Reliability, Availability, Maintainability
- Domain-Driven Design (DDD)
- Architectural Decision Records (ADRs)

### 2. Monolithic Architecture 🔥
- What is a Monolith?
- Types of Monoliths (Single-tier, Modular, Layered)
- Advantages and Limitations
- When to Choose a Monolith
- Migrating from Monolith to Microservices
- The Strangler Fig Pattern

## Phase 2 — Core System Design Concepts (Interview Essentials)
*The most frequently tested topics in system design interviews.*

### 3. Scalability & Performance 🔥
- Horizontal vs. Vertical Scaling
- Load Balancing (Round Robin, Consistent Hashing)
- Caching Strategies (Write-through, Write-back, Cache-aside)
- Content Delivery Networks (CDNs)
- Rate Limiting & Throttling
- Idempotency

### 4. Database Design 🔥
- SQL vs. NoSQL Trade-offs
- Indexing & Query Optimisation
- Data Normalisation & Denormalisation
- Replication & Partitioning (Sharding)
- Data Consistency & Transactions (ACID vs. BASE)

### 5. API Design 🔥
- REST vs. gRPC vs. GraphQL
- API Gateway Pattern
- Versioning & Backward Compatibility
- Asynchronous Processing & Background Jobs
- Webhooks & Polling

## Phase 3 — Distributed Systems (Deep Learning + Advanced Interviews)
*Essential for senior-level interviews and real-world large-scale systems.*

### 6. Distributed Systems Fundamentals 🔥
- What is a Distributed System?
- CAP Theorem
- PACELC Theorem
- Consistency Models (Strong, Eventual, Causal)
- Fault Tolerance & Failover
- Consensus Algorithms (Raft, Paxos)

### 7. Distributed Infrastructure
- Distributed Caching (Redis, Memcached)
- Message Queues & Event Streaming (Kafka, RabbitMQ)
- Distributed Transactions & the Saga Pattern
- Service Discovery & Health Checks

## Phase 4 — Architecture Patterns (Design Vocabulary)
*Learn the patterns interviewers expect you to reference fluently.*

### 8. Structural Patterns 🔥
- Layered (N-Tier) Architecture
- Hexagonal Architecture (Ports & Adapters)
- Clean Architecture
- Microservices Architecture
- Service-Oriented Architecture (SOA)
- Serverless Architecture
- Backends for Frontends (BFF)

### 9. Behavioural & Resilience Patterns 🔥
- Event-Driven Architecture
- CQRS (Command Query Responsibility Segregation)
- Event Sourcing
- Circuit Breaker Pattern
- Sidecar & Service Mesh
- Strangler Fig Pattern

## Phase 5 — Architecture Anti-Patterns (What NOT to Do)
*Knowing anti-patterns signals maturity — interviewers love this.*

### 10. Common Anti-Patterns 🔥
- Big Ball of Mud
- God Object / God Service
- Distributed Monolith
- Chatty I/O
- Tight Coupling & Low Cohesion
- Premature Optimisation
- Shared Database Anti-Pattern
- Over-Engineering (Overly Generic Solutions)

## Phase 6 — Cryptography & Security (Supporting Skill)
*Not always tested directly, but expected in API-heavy and enterprise system design.*

### 11. Cryptography & Security in System Design
- Why Security is a Non-Functional Requirement
- Encryption — At Rest vs. In Transit
- Hashing & Data Integrity (SHA, bcrypt)
- TLS / HTTPS
- Authentication & Authorisation (JWT, OAuth 2.0, API Keys)
- Zero-Trust Architecture
- Secrets Management
- Common Vulnerabilities (OWASP Top 10 relevance)

## Phase 7 — Interview Practice & Real-World Application
*Apply everything — the most important phase for interview readiness.*

### 12. Interview Framework 🔥
- How to Approach a System Design Problem (Step-by-step)
- Clarifying Requirements (Functional vs. Non-Functional)
- Estimating Scale (Back-of-the-envelope calculations)
- Drawing & Communicating Architecture Diagrams
- Common Interview Mistakes to Avoid

### 13. Case Studies 🔥
- URL Shortener
- Notification Service
- API Rate Limiter
- Chat / Messaging System
- Video Streaming Service
- Vonage-Relevant: Designing a Voice API System
- Vonage-Relevant: Designing a Branded Calling Integration

## 14. Recommended Resources
14.1 Books
- *Designing Data-Intensive Applications* — Martin Kleppmann
- *Clean Architecture* — Robert C. Martin
- *Building Microservices* — Sam Newman

14.2 Online Resources
- [system-design-primer (GitHub)](https://github.com/donnemartin/system-design-primer)
- ByteByteGo
- web.dev, MDN Advanced Guides
- Vonage API Documentation & SDKs

14.3 Practice Tools
- Excalidraw / Whimsical (for whiteboarding)
- LeetCode System Design section
- ByteByteGo

::: details Images {open}

![](https://media.licdn.com/dms/image/v2/D5622AQFMaTWR4IZXmA/feedshare-image-high-res/B56ZgGq3mJG0Fs-/0/1752458697288?e=2147483647&v=beta&t=xmEfw-jhVt0kbUhQH5PgLY6ZGTYJsIpPNxzHThRJkkA)

![](https://media.licdn.com/dms/image/v2/D4E22AQHvqWSvaQR3hQ/feedshare-image-high-res/feedshare-image-high-res/0/1695138310540?e=2147483647&v=beta&t=65Rg3VfVLNYX1juJARSdeJyOLSqIOpk2gAAI70s7JHM)

:::

::: details :arrow_right: I ACED my Technical Interviews knowing these System Design Basics
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/FxAom29OEKE/0.jpg)](https://www.youtube.com/watch?v=FxAom29OEKE)
:::
