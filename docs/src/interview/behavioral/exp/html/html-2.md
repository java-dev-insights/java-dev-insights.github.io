# HTML 2

Now I'll build a comprehensive, visually polished AWS architecture diagram for a Dashboard Platform.

Here's your **AWS Architecture Diagram for the Dashboard Platform** — designed to the level a senior software engineer would present in an interview.

---

## What's covered in the diagram

### 7 Architecture Layers
| Layer | Services |
|-------|----------|
| **Client** | React/Next.js SPA, Mobile/PWA, Embedded Widgets (SDK) |
| **Edge** | CloudFront CDN, AWS WAF + Shield, Route 53, S3 Static |
| **API** | Amazon Cognito (AuthN/AuthZ), API Gateway (REST + WebSocket), HTTP API |
| **Compute** | ECS Fargate (Dashboard, Widget, User/Tenant services), Lambda (Notifications, Export), SNS/SQS/EventBridge, VPC w/ subnets |
| **Data** | RDS PostgreSQL (Multi-AZ), ElastiCache Redis, DynamoDB, S3 Data Lake, Secrets Manager |
| **Pipeline** | Kinesis Data Streams, Kinesis Firehose, AWS Glue, Athena, Stream Processor Lambda |
| **Ops** | CloudWatch, X-Ray, CodePipeline, ECR, IAM + KMS, Terraform/CDK |

### 4 Request Flows (interview-ready narratives)
- **Dashboard Page Load** — CloudFront → API GW → ElastiCache/RDS
- **Real-time Widget Data** — Kinesis → Lambda → ElastiCache → WebSocket push
- **Dashboard Export** — Lambda (headless Chrome) → S3 → SES email
- **CI/CD Deploy Pipeline** — GitHub → CodeBuild → ECR → ECS Blue/Green

### 6 Senior Engineering Design Decisions
Multi-tenancy (row-level security), cache-aside pattern, auto-scaling strategy, 3-AZ high availability, zero-trust security, and Athena-based cost optimisation.

> **Tip:** Hover over any service box to see implementation details — these are perfect talking points for your interview!
