# Software Architecture Concepts

## References
- [Software Architecture Guide](https://www.martinfowler.com/architecture/){target="_blank"}
- [The Twelve Factors](https://12factor.net/){target="_blank"}
- [APIGW - Gloo Gateway Failover](https://docs.solo.io/gloo-edge/main/guides/gloo_federation/service_failover/){target="_blank"}
  - [Istio Virtual Service](https://istio.io/latest/docs/reference/config/networking/virtual-service/){target="_blank"}

## Event-Driven Architecture

|Entity     |Description                                            |
|---        |---                                                    |
|Events     |Notification of an action                              |
|Producers  |Components/Services that generate or publish messages  |
|Consumers  |Components/Services that subscribe or consume messages |
|Event Bus  |Central hub that facilitates communication             |

|PROS                   |CONS   |
|---                    |---    |
|Loose Coupling         |Higher Complexity                  |
|Easier Scalability     |Harder Testing and Debugging       |
|Service Resilience     |Possible eventual Inconsistency    |
|Retriable Process      |Challenging Obersavability         |
|Real-time data flow    |Need mindset shift                 |

### Use Cases 
- e-commerce : order place, inventory update, trigger shipping, log analytics
- social media : 

### Best Practices
- Define clear event schemas
- Make consumer idempotent - receive same event more than once, In distributed systems - duplicate can and will happen
  - if consumer processes order event twice and ships 2 packages then its a costly bug
- Implement Robust Error Handling - use retries, dead-letter queue or fallback logic to prevent cascading failures
- Monitor and log your events - track flow of events, how long things take and capture failures
  - helps indebugging, performance tuning and even security monitoring

