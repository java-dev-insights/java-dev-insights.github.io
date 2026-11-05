# LLD Interview

<YouTubeEmbed video-id="uq58YNrxV5E" /><br/>

- OOP - Object-Oriented Programming
  - The 4 Pillars of OOP
- OOD - Object-Oriented Design
  - SOLID Principles : Structures class relationships to prevent rigid and fragile architectures.
  - Design Philosophies (KISS, DRY, YAGNI) : Keeps class designs clean, minimal, and free of redundant logic.
  - Delegation Principles : Promotes loose coupling by passing work to specialized objects.
  - GRASP Patterns : Mentally guides the architect on how to assign attributes and methods to specific classes.
  - Requirements & Quality Models (FURPS / FURPS+) : Defines the architectural requirements and quality metrics the design must meet.
- Both OOD and OOP rely on the same fundamental pillars of OOP.
- Design Patterns - Creational, Structural, Behavioral
- Example Questions
  - Elevator, Parking Lot
- Concurrency Control in LLD (ThreadLocks, ReadWriteLock, ThreadPool, ExecutorService, Producer-Consumer, Task Scheduler)

::: details SDLC (Software Development Life Cycle)
![SDLC](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4esh7KOdS5FdE2qmwOmpKg.png)
:::

::: details Core Phases of SDLC
Most frameworks break the development process down into these standard stages:

- Planning / Requirements: Define project goals, scope, and stakeholder needs.
- Design: Create architectural blueprints, system specifications, and design documents.
- Implementation / Development: Write and integrate the actual source code.
- Testing: Run manual and automated checks to identify and fix bugs.
- Deployment: Release the software into a live production environment.
- Maintenance: Monitor system performance, apply updates, and resolve ongoing issues.
:::

::: details SDLC Models
Different teams choose different methodologies to manage these phases:

- Waterfall: A linear, sequential approach where each stage must finish before the next begins.
- Agile: An iterative, sprint-based approach that delivers work in rapid, flexible increments.
- DevOps / CI/CD: A collaborative model that tightly integrates development and operations with automated testing and deployment.
- Spiral / Iterative: Focuses heavily on risk assessment, prototyping, and gradual enhancement.
:::

## LLD Topics to cover

- Class & Object
- OOPs - Encapsulation, Abstraction, Inheritance, Polymorphism
- Interface & Abstract Class
- Association/Aggregation/Composition
- Overloading & Overriding
- SOLID Principles
- Design Patterns
  - Strategy, Factory, Abstract Factory, Builder, Singleton
  - Adapter, Decorator, Observer, State, Command
  - Proxy, Chain of Responsibility, Composite, Facade
- LLD Design Questions
  - Parking Lot, Vending Machine, Elevator System
  - Movie Ticket Booking, Splitwise, Rate Limiter, LRU Cache
  - Notification System, Payment Gateway, Task Scheduler

## HLD Topics to cover

- Scalability, Availability & Reliability, CAP Theorem
- Consistency Models
- Load Balancing
- Caching
- DB Sharding and Replication
- Tradeoffs : SQL vs NoSQL
- Message Queues / Kafka
- CDN
- Rate Limiting
- Consistent Hashing
- API Design
- Service Discovery
- Leader Election
- Distributed Locks
- Websockets / SSE
- Object Storage
- Monitoring & Logging
- Fault Tolerance and Retry / 
- Design Questions
  - URL Shortner, Youtube, Whatsapp, Twitter X, Instagram, Uber, Food Delivery System, URL Shortner, Netflix
  - Google Drive, Maps
  - Notification System, Rate Limiter, Search Autocomplete
  - Ticket Booking System
  - Distributed Logging System
- Edge Cases
  - cache : goes down? stampede?
  - kafka/message queue : unavailable
  - duplicate messages
  - idempotency
  - Primary DB goes down? add new column with zero down time?
  - handle replication lag
  - avoid hot partitions/shards
  - one key/user becomes extremely hot - famous person posts / celebrity problem
  - retries without duplicate writes
  - maintain ordering in distributes systems
  - partial failure across services
  - migrate data while system is live
  - handle millions of websocket connections
  - what changes when traffic suddenly becomes 10x - Black friday sale scenario

## Top 15 Low-Level Design (LLD) Problems

For these, focus deeply on Java-specific implementations: thread safety, concurrency primitives (java.util.concurrent), generic interfaces, clean decoupling, and memory management.

1. Distributed Rate Limiter: Implement Token Bucket or Leaky Bucket using Redis/Java concurrency.
2. In-Memory Cache (LRU/LFU): Build with eviction policies, ensuring thread-safe access without global locks.
3. Custom Thread Pool Executors: Re-implement a lightweight version of Java’s ThreadPoolExecutor.
4. Pub-Sub Messaging Event Bus: Support concurrent producers, asynchronous consumer groups, and backpressure.
5. Splitwise / Expense Sharing Application: Structure complex financial balance models using clean SOLID interfaces.
6. Parking Lot System: Handle multiple vehicle types, spot allocation algorithms, and concurrent ticketing.
7. Movie Booking System (BookMyShow): Solve the concurrency challenge of preventing double-booking during high-traffic checkout.
8. Elevator Control System: Design scheduling algorithms optimized for traffic throughput across multiple elevators.
9. Snake and Ladder / Chess Game Engine: Focus on clean state machines and separation of game logic from presentation.
10. Distributed Cron Job Scheduler: Schedule and execute tasks dynamically across multiple worker threads.
11. E-Commerce Checkout & Inventory Allocator: Handle stock reservations, item expiration, and thread-safe lock-free inventory updates.
12. Vending Machine: Implement using the State Pattern to transition seamlessly between payment, product selection, and dispensing.
13. Logging Framework: Design an asynchronous logger like Log4j, supporting multiple appenders (Console, File) and custom formatting.
14. File Storage & Indexing System: Model a basic in-memory file structure (Directories, Files) with permissions.
15. Ride-Sharing Service (Uber/Lyft matching engine): Structure proximity-based matching algorithms handling real-time driver updates.
