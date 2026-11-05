# HLD (Interview)

<YouTubeEmbed video-id="PTJOECahJTc" /><br/>

LLD or HLD?
<YouTubeEmbed video-id="pyxsGki1epE" /><br/>

LLD or HLD?
<YouTubeEmbed video-id="_K-eupuDVEc" /><br/>

<YouTubeEmbed video-id="a5rABvMQ53U" /><br/>

::: details Ace system design
![Ace system design](https://miro.medium.com/v2/resize:fit:1400/1*T9CFIuoIO24UcNRGRpi7dQ.png)
:::

## Top 20 High-Level Design (HLD) Problems

At 15 YOE, view these through an enterprise Java lens: scaling Spring Boot microservices, optimizing JVM throughput, choosing the right databases, and engineering for resilience.

### Core Infrastructure & Platforms

1. API Gateway & Service Mesh: Design a high-throughput gateway managing routing, rate-limiting, and TLS termination.
2. Distributed ID Generator: Build a global, chronological unique ID generator (e.g., Snowflake) ensuring zero collision.
3. Notification Service: Design a multi-channel system (SMS, Push, Email) with millions of daily requests, retries, and deduplication.
4. Metrics and Monitoring System: Architect an end-to-end telemetry pipeline (similar to Prometheus/Grafana) handling massive time-series ingestion.
5. Distributed Caching Topology: High-level architecture of a multi-tier cache infrastructure (local JVM heap cache + distributed Redis cluster).

### Content & Social Media Ecosystems

6. Video Streaming Platform (Netflix/YouTube): Focus on asset ingestion, chunking, transcoding pipelines, and CDN distribution.
7. Social Media Feed (Twitter/Facebook timeline): Handle the fan-out strategy (push vs. pull models) for high-celebrity write and read paths.
8. Chat & Instant Messaging Application (WhatsApp): Architect persistent WebSocket connections, message ordering, and offline delivery queues.
9. Live Commenting/Streaming System: Build a highly concurrent system supporting real-time interactive chats under extreme scale.

### E-Commerce, Mobility & Logistics

10. Global E-Commerce Platform (Amazon): System layout handling search, inventory, shopping carts, and flash-sale checkout traffic.
11. Ride-Hailing / Geospatial System (Uber): Architect dynamic spatial indexing (Geohashes/H3) for low-latency driver matching and location updates.
12. Food Delivery Engine (DoorDash/Deliveroo): Manage the 3-sided marketplace data flows (Customer, Restaurant, Driver) and status state tracking.
13. Ticket Booking Engine: Handle sudden traffic spikes, distributed seat locks, and reliable payment callbacks.

### Productivity & Content Management

14. Collaborative Document Editor (Google Docs): Solve real-time conflicts using Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs).
15. Cloud File Storage (Dropbox/Google Drive): Address block-level file chunking, sync protocols, and bandwidth optimization.
16. Web Crawler: Scale URL discovery, politeness throttling, storage deduplication, and parsing queues.
17. URL Shortener (TinyURL): Optimize a high-read, low-write system using indexing, hashing, and aggressive edge caching.

### Financial Systems

18. Digital Wallet / Payment Gateway (Stripe/PayPal): Focus heavily on idempotency, ledger transactions, double-entry accounting, and ACID compliance.
19. Stock/Crypto Trading Exchange: Design ultra-low latency order-matching books, market data broadcast feeds, and execution engines.
20. Ad-Click Aggregator: Process massive clickstreams in real time using streaming frameworks (Kafka Streams/Flink) for financial billing.
