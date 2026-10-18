---
outline: [2,3]
---

# Study Plan - System Design

## 12 Weeks Plan


System Design — 12-Week Study Schedule
> 📅 3-Month Plan | ⏱ 3–5 hrs/week | 🎯 Deep Learning + Interview Prep.  
> Weekly rhythm from your learning plan:  
> **Mon** Read (30 min) · **Tue** Study (60 min) · **Thu** Practice (60 min)  
> **Fri** Reflect (20 min) · **Weekend** Explore (30–60 min, optional)

---

### Month 1 — Foundations & Core Concepts (Phases 1 & 2)

#### Week 1 — Software Architecture Foundations
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | What is Software Architecture? Architecture vs. Design | 30 min |
| Tue | Study | Key Quality Attributes — Scalability, Reliability, Availability, Maintainability | 60 min |
| Thu | Practice | Sketch the high-level architecture of a system you work on at Vonage | 60 min |
| Fri | Reflect | Log: What quality attributes does your current system prioritise? | 20 min |
| Weekend | Explore | Watch: "Software Architecture Monday" by Mark Richards (YouTube) | 30–60 min |

#### Week 2 — Monolithic Architecture
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | What is a Monolith? Types of Monoliths | 30 min |
| Tue | Study | Monolith vs. Microservices trade-offs; When to choose a Monolith | 60 min |
| Thu | Practice | Map out a Vonage service — is it a monolith or microservice? What would migration look like? | 60 min |
| Fri | Reflect | Log: What are the biggest risks of migrating a monolith you've seen at work? | 20 min |
| Weekend | Explore | Read: Strangler Fig Pattern — Martin Fowler's blog | 30–60 min |

#### Week 3 — Scalability & Performance
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Horizontal vs. Vertical Scaling; Load Balancing strategies | 30 min |
| Tue | Study | Caching strategies (Write-through, Write-back, Cache-aside); CDNs | 60 min |
| Thu | Practice | Design a caching layer for a Vonage API endpoint you own | 60 min |
| Fri | Reflect | Log: Where could caching reduce latency in your current work? | 20 min |
| Weekend | Explore | Read: Redis documentation — caching patterns | 30–60 min |

#### Week 4 — Database Design
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | SQL vs. NoSQL trade-offs; Indexing basics | 30 min |
| Tue | Study | Replication, Sharding, ACID vs. BASE, Data Consistency & Transactions | 60 min |
| Thu | Practice | Design a database schema for a URL shortener — choose SQL or NoSQL and justify | 60 min |
| Fri | Reflect | Log: What database decisions in your current project could be improved? | 20 min |
| Weekend | Explore | Read: Chapter 1–2 of *Designing Data-Intensive Applications* — Kleppmann | 30–60 min |

---

### 📊 Month 1 Review Checklist
- [ ] Can I explain the difference between monolith and microservices confidently?
- [ ] Can I describe at least 3 caching strategies and when to use each?
- [ ] Can I justify a SQL vs. NoSQL choice for a given use case?
- [ ] Have I applied any learning directly to my Vonage work?

---

### Month 2 — Distributed Systems & Architecture Patterns (Phases 3 & 4)

#### Week 5 — Distributed Systems Fundamentals
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | What is a Distributed System? CAP Theorem | 30 min |
| Tue | Study | PACELC Theorem; Consistency Models (Strong, Eventual, Causal) | 60 min |
| Thu | Practice | Draw a diagram showing how CAP theorem applies to a Vonage API service | 60 min |
| Fri | Reflect | Log: What consistency model does your current system use? Is it the right one? | 20 min |
| Weekend | Explore | Read: system-design-primer — Distributed Systems section (GitHub) | 30–60 min |

#### Week 6 — Distributed Infrastructure
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Fault Tolerance & Failover; Consensus Algorithms (Raft, Paxos) overview | 30 min |
| Tue | Study | Message Queues & Event Streaming (Kafka, RabbitMQ); Distributed Transactions & Saga Pattern | 60 min |
| Thu | Practice | Design a notification service using an event-driven approach with a message queue | 60 min |
| Fri | Reflect | Log: Where could async messaging improve a system you work on? | 20 min |
| Weekend | Explore | Watch: "Apache Kafka in 100 Seconds" + Kafka architecture deep-dive | 30–60 min |

#### Week 7 — Structural Architecture Patterns
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Layered Architecture; Hexagonal Architecture (Ports & Adapters) | 30 min |
| Tue | Study | Clean Architecture; Microservices Architecture; Backends for Frontends (BFF) | 60 min |
| Thu | Practice | Refactor a small service you own to follow Clean Architecture principles | 60 min |
| Fri | Reflect | Log: Which architecture pattern best describes your current codebase? | 20 min |
| Weekend | Explore | Read: *Clean Architecture* — Robert C. Martin (Chapters 1–5) | 30–60 min |

#### Week 8 — Behavioural & Resilience Patterns
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Event-Driven Architecture; CQRS; Event Sourcing | 30 min |
| Tue | Study | Circuit Breaker Pattern; Sidecar & Service Mesh; API Gateway Pattern | 60 min |
| Thu | Practice | Design a resilient checkout/payment flow using Circuit Breaker + Saga patterns | 60 min |
| Fri | Reflect | Log: Which resilience patterns are missing from a system you own? | 20 min |
| Weekend | Explore | Read: Martin Fowler's blog on CQRS and Event Sourcing | 30–60 min |

---

### 📊 Month 2 Review Checklist
- [ ] Can I explain CAP theorem with a real-world example?
- [ ] Can I design an event-driven system using Kafka or RabbitMQ?
- [ ] Can I name and describe at least 5 architecture patterns fluently?
- [ ] Have I whiteboarded at least 2 systems end-to-end this month?

---

### Month 3 — Anti-Patterns, Security & Interview Practice (Phases 5, 6 & 7)

#### Week 9 — Architecture Anti-Patterns
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Big Ball of Mud; God Object / God Service; Distributed Monolith | 30 min |
| Tue | Study | Chatty I/O; Tight Coupling; Shared Database Anti-Pattern; Over-Engineering | 60 min |
| Thu | Practice | Review a real codebase or PR at Vonage — identify any anti-patterns present | 60 min |
| Fri | Reflect | Log: What anti-pattern have you encountered most at work? How was it resolved? | 20 min |
| Weekend | Explore | Read: "Anti-Patterns" chapter in system-design-primer | 30–60 min |

#### Week 10 — Cryptography & Security
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Encryption at rest vs. in transit; TLS / HTTPS; Hashing (SHA, bcrypt) | 30 min |
| Tue | Study | JWT, OAuth 2.0, API Keys; Zero-Trust Architecture; Secrets Management | 60 min |
| Thu | Practice | Audit a Vonage API integration for security — check auth, encryption, and key management | 60 min |
| Fri | Reflect | Log: What security improvements could you make to a system you own? | 20 min |
| Weekend | Explore | Read: OWASP Top 10 — focus on API Security Top 10 | 30–60 min |

#### Week 11 — Interview Framework & Technique
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | How to approach a system design problem; Clarifying requirements (Functional vs. Non-Functional) | 30 min |
| Tue | Study | Back-of-the-envelope estimation; Drawing & communicating architecture diagrams | 60 min |
| Thu | Practice | Mock interview: Design a URL Shortener end-to-end (timed, 45 min) | 60 min |
| Fri | Reflect | Log: What parts of the mock interview felt weak? What to improve? | 20 min |
| Weekend | Explore | Watch: ByteByteGo system design interview walkthroughs | 30–60 min |

#### Week 12 — Case Studies & Final Review
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Review your weakest phase from Months 1–2 | 30 min |
| Tue | Study | Case Study: Design a Chat / Messaging System or Video Streaming Service | 60 min |
| Thu | Practice | Mock interview: Design a Vonage Voice API System end-to-end (timed, 45 min) | 60 min |
| Fri | Reflect | Full 3-month review — complete the monthly review checklist for all phases | 20 min |
| Weekend | Explore | Share one key learning with your team (TIL post or lightning talk) | 30–60 min |

---

### 📊 Month 3 Review Checklist
- [ ] Can I spot and name anti-patterns in a real codebase?
- [ ] Can I explain OAuth 2.0 and JWT in a system design context?
- [ ] Can I complete a full system design interview in 45 minutes confidently?
- [ ] Have I done at least 2 timed mock interviews?
- [ ] Have I shared at least one learning with my team this month?

---

### 🏆 End-of-Plan Milestone
> ✅ **You're ready when:** You can whiteboard a scalable, secure, distributed system confidently — clarify requirements, estimate scale, choose the right patterns, and explain your trade-offs clearly.

---

### 📚 Key Resources Quick Reference
| Resource | Best For | Link |
|----------|----------|------|
| *Designing Data-Intensive Applications* | Distributed systems depth | Book |
| *Clean Architecture* — Robert C. Martin | Architecture patterns | Book |
| *Building Microservices* — Sam Newman | Microservices | Book |
| system-design-primer | Interview prep overview | [GitHub](https://github.com/donnemartin/system-design-primer) |
| ByteByteGo | Visual interview walkthroughs | bytebytego.com |
| Excalidraw / Whimsical | Whiteboarding practice | excalidraw.com |
| Vonage API Docs | Vonage-relevant practice | developer.vonage.com |


## 6 Weeks Plan

System Design — 6-Week Study Schedule
> 📅 6-Week Accelerated Plan | ⏱ 3–5 hrs/week | 🎯 Deep Learning + Interview Prep
> Weekly rhythm from your learning plan: **Mon** Read (30 min) · **Tue** Study (60 min) · **Thu** Practice (60 min) · **Fri** Reflect (20 min) · **Weekend** Explore (30–60 min, optional)
> ⚡ Condensed from 12 weeks — each week covers 2 phases. Priority is given to 🔥 interview-critical topics. Cryptography is threaded into Week 5 alongside security-relevant patterns.

---

### Weeks 1–2 — Foundations (Phases 1 & 2)
*Software Architecture + Monolithic Architecture + Scalability & Database Design*

#### Week 1 — Architecture Foundations & Monoliths 🔥
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | What is Software Architecture? Architecture vs. Design; Key Quality Attributes | 30 min |
| Tue | Study | Monolith types & trade-offs; Monolith vs. Microservices; When to choose a Monolith | 60 min |
| Thu | Practice | Sketch the high-level architecture of a Vonage system you work on — label quality attributes | 60 min |
| Fri | Reflect | Log: What quality attributes does your current system prioritise? Any monolith risks? | 20 min |
| Weekend | Explore | Watch: "Software Architecture Monday" by Mark Richards (YouTube) | 30–60 min |

#### Week 2 — Scalability, Performance & Database Design 🔥
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Horizontal vs. Vertical Scaling; Load Balancing; Caching strategies (Write-through, Write-back, Cache-aside) | 30 min |
| Tue | Study | SQL vs. NoSQL trade-offs; Indexing; Sharding; ACID vs. BASE; Data Consistency & Transactions | 60 min |
| Thu | Practice | Design a database + caching layer for a URL shortener — justify every choice | 60 min |
| Fri | Reflect | Log: Where could caching or better indexing improve a system you own at Vonage? | 20 min |
| Weekend | Explore | Read: Chapters 1–2 of *Designing Data-Intensive Applications* — Kleppmann | 30–60 min |

---

### 📊 Weeks 1–2 Checkpoint
- [ ] Can I explain monolith vs. microservices trade-offs confidently?
- [ ] Can I describe at least 3 caching strategies and when to use each?
- [ ] Can I justify a SQL vs. NoSQL choice for a given use case?

---

### Weeks 3–4 — Distributed Systems & Architecture Patterns (Phases 3 & 4)
*The most interview-critical deep topics*

#### Week 3 — Distributed Systems 🔥
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | What is a Distributed System? CAP Theorem; PACELC Theorem | 30 min |
| Tue | Study | Consistency Models; Fault Tolerance & Failover; Message Queues & Event Streaming (Kafka, RabbitMQ); Saga Pattern | 60 min |
| Thu | Practice | Design a notification service using an event-driven approach with a message queue | 60 min |
| Fri | Reflect | Log: What consistency model does your current system use? Is it the right one? | 20 min |
| Weekend | Explore | Read: system-design-primer — Distributed Systems section (GitHub) | 30–60 min |

#### Week 4 — Architecture Patterns 🔥
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Layered, Hexagonal & Clean Architecture; Microservices; BFF; API Design (REST vs. gRPC vs. GraphQL) | 30 min |
| Tue | Study | Event-Driven Architecture; CQRS; Event Sourcing; Circuit Breaker; Sidecar & Service Mesh | 60 min |
| Thu | Practice | Design a resilient Vonage Voice API system using at least 3 patterns from this week | 60 min |
| Fri | Reflect | Log: Which architecture pattern best describes your current codebase? What would you change? | 20 min |
| Weekend | Explore | Read: Martin Fowler's blog on CQRS + *Clean Architecture* Chapters 1–5 | 30–60 min |

---

### 📊 Weeks 3–4 Checkpoint
- [ ] Can I explain CAP theorem with a real-world example?
- [ ] Can I name and describe at least 5 architecture patterns fluently?
- [ ] Can I design an event-driven system using Kafka or RabbitMQ?

---

### Weeks 5–6 — Anti-Patterns, Security & Interview Practice (Phases 5, 6 & 7)
*Convert knowledge into interview performance*

#### Week 5 — Anti-Patterns & Cryptography / Security 🔥
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | Anti-Patterns: Big Ball of Mud, God Service, Distributed Monolith, Chatty I/O, Shared DB, Over-Engineering | 30 min |
| Tue | Study | Encryption (at rest vs. in transit); TLS/HTTPS; Hashing; JWT, OAuth 2.0, API Keys; Zero-Trust; Secrets Management | 60 min |
| Thu | Practice | Review a Vonage codebase or PR — identify anti-patterns; audit an API integration for security gaps | 60 min |
| Fri | Reflect | Log: What anti-pattern have you encountered most at work? What security improvements could you make? | 20 min |
| Weekend | Explore | Read: OWASP API Security Top 10 | 30–60 min |

#### Week 6 — Interview Framework & Case Studies 🔥
| Day | Activity | Topic | Time |
|-----|----------|-------|------|
| Mon | Read | How to approach a system design problem; Clarifying requirements (Functional vs. Non-Functional); Back-of-the-envelope estimation | 30 min |
| Tue | Study | Mock interview: Design a URL Shortener end-to-end (timed, 45 min) — then review gaps | 60 min |
| Thu | Practice | Mock interview: Design a Vonage Voice API / Branded Calling System end-to-end (timed, 45 min) | 60 min |
| Fri | Reflect | Full 6-week review — complete all checkpoints; note weakest areas for continued study | 20 min |
| Weekend | Explore | Share one key learning with your team (TIL post or lightning talk) | 30–60 min |

---

### 📊 Weeks 5–6 Checkpoint
- [ ] Can I spot and name anti-patterns in a real codebase?
- [ ] Can I explain OAuth 2.0 and JWT in a system design context?
- [ ] Can I complete a full system design interview in 45 minutes confidently?
- [ ] Have I done at least 2 timed mock interviews?
- [ ] Have I shared at least one learning with my team?

---

### 🏆 End-of-Plan Milestone
> ✅ **You're ready when:** You can whiteboard a scalable, secure, distributed system confidently — clarify requirements, estimate scale, choose the right patterns, and explain your trade-offs clearly.

---

### 📚 Key Resources Quick Reference
| Resource | Best For | Link |
|----------|----------|------|
| *Designing Data-Intensive Applications* | Distributed systems depth | Book |
| *Clean Architecture* — Robert C. Martin | Architecture patterns | Book |
| *Building Microservices* — Sam Newman | Microservices | Book |
| system-design-primer | Interview prep overview | [GitHub](https://github.com/donnemartin/system-design-primer) |
| ByteByteGo | Visual interview walkthroughs | bytebytego.com |
| Excalidraw / Whimsical | Whiteboarding practice | excalidraw.com |
| Vonage API Docs | Vonage-relevant practice | developer.vonage.com |
