# Microservices

- [Inter-Service Communication](communications)

## Inter-Service Communication

- Synchronous Communication : Blocking
  - HttpMethods
  - RestTemplate : Spring RestTemplate introduced High level methods
  - OpenFeign : Declarative Clients, Java interfaces annotated with mapping annotations
  - RestClient : Alternate to RestTemplate with Fluent API
  - HTTP interfaces : Similar to OpenFeign without requiring SpringCloud, Declarative `@HttpExchange`
- Asynchronous Communication
  - WebClient : Reactive Programming with Mono and Flux


::: warning
`Spring` recommends moving from OpneFeign to Http Interfaces [here](https://docs.spring.io/spring-cloud-openfeign/reference/){target="_blank"}
:::

::: tip
Create a `caller-service` and `target-service` to show all 5 synch comunication options
:::

Client-Side Load Balancing and Service Discovery
- Eureka
- Ribbon