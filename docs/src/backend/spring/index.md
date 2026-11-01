# Spring Framework Page

Spring is a java framework that makes programming Java quicker, easier, and safer for everybody. Spring’s focus on speed, simplicity, and productivity.  
  
Official site [here](https://spring.io/why-spring){target="_blank"} with available [projects](https://spring.io/projects){target="_blank"}


Spring is a java framework that makes programming Java quicker, easier, and safer for everybody. Spring’s focus on speed, simplicity, and productivity.  
  
Official site [here](https://spring.io/why-spring){target="_blank"} with available [projects](https://spring.io/projects){target="_blank"}

- [Spring Core](./core)
- [Spring data](./data)
- [Spring Security](./security)
- [Spring AI](./ai)


## Questions
- How gradle puts things in the classpath for spring application?


## servlet vs reactive

- Servlet is a traditional, blocking I/O model where a thread handles each request, while reactive is a non-blocking, event-driven model that uses an event loop to handle many concurrent requests with fewer threads. 
- The reactive stack is more efficient for high-concurrency applications and I/O-bound tasks, whereas the servlet stack is simpler and still widely used for many applications, especially those with blocking dependencies.

## How @Transactional works

`@Transactional` declaratively manages transactions. When applied, Spring creates a proxy around the bean that handles transaction lifecycle (begin, commit, rollback).
 
How It Works
- Spring wraps the bean in a proxy
- Before method execution → begins/joins a transaction
- After successful execution → commits
- On exception → rolls back (based on rules)

```java
@Transactional(
    propogation = Propagation.SUPPORTS, 
    isolationa = Isolation.READ_COMMITTED,
    timeout = 30, // rolls back after 30 seconds
    readOnly = false,
    rollbackFor = {IOException.class, SQLException.class},
    rollbackForClassName = {"java.io.IOException"},
    noRollbackFor = IllegalArgumentException.class,
    transactionManager = "secondaryTransactionManager",
    label = {"autoreload", "payment"},
)
```

### propagation

Controls how transactions relate to each other.

|Value              | Behavior  |
|-----              |-----      |
|REQUIRED (default) | Join existing tx or create new one    |
|SUPPORTS           | Join existing tx; run without tx if none exists   |
|MANDATORY          | Must join existing tx; throws if none exists      |
|REQUIRES_NEW       | Always create new tx; suspend existing one        |
|NOT_SUPPORTED      | Always run without tx; suspend existing one       |
|NEVER              | Must run without tx; throws if one exists         |
|NESTED             | Run in nested tx (savepoint); falls back to REQUIRED if unsupported   |

In your code: SUPPORTS means the autoreload processor joins a tx if one exists, but works fine without one — suitable for a background job.

### isolation
Controls visibility of data between concurrent transactions.

|Value              | Behavior                      |
|-----              |------                         |
|DEFAULT (default)  | Use DB default                |
|READ_UNCOMMITTED   | Can read uncommitted changes (dirty reads allowed)    |
|READ_COMMITTED     | Only reads committed changes                          |
|REPEATABLE_READ    | Same row reads return same data within tx             |
|SERIALIZABLE       | Full isolation; transactions execute serially         |

### timeout
- Max seconds before transaction is rolled back automatically.
- Default is `-1` (no timeout, uses DB/infra default).

### readOnly
- Hints to the provider that no writes will occur — enables optimizations.
- Default is `false`

### rollbackFor / rollbackForClassName
Specifies which exceptions trigger rollback (by default only RuntimeException and Error).

### noRollbackFor / noRollbackForClassName
Specifies exceptions that should NOT trigger rollback.

### transactionManager (alias: value)
Specifies which PlatformTransactionManager bean to use (useful in multi-datasource setups).

 
Built-in PlatformTransactionManager Implementations

|Transaction Manager                | Use Case                                              |
|------                             |------                                                 |
|DataSourceTransactionManager       |Plain JDBC / MyBatis                                   |
|JpaTransactionManager              |JPA / Hibernate                                        |
|JtaTransactionManager              |Distributed/XA transactions (multiple datasources)     |
|HibernateTransactionManager        |Native Hibernate (without JPA)                         |
|R2dbcTransactionManager            |Reactive R2DBC                                         |
|KafkaTransactionManager            |Kafka transactions                                     |
|MongoTransactionManager            |MongoDB transactions                                   |

#### Default Transaction Manager
Spring Boot auto-configures the transaction manager based on what's on the classpath:
- JPA present → JpaTransactionManager (most common in Spring Boot)
- Only JDBC → DataSourceTransactionManager
- JTA present → JtaTransactionManager

In your project (Spring Boot + likely JPA), the default is JpaTransactionManager, auto-wired to the primary DataSource.
When @Transactional has no transactionManager attribute, Spring uses the primary/default one.

```java
@Configuration
public class TransactionConfig {
    @Bean
    @Primary
    public PlatformTransactionManager primaryTransactionManager(
            @Qualifier("primaryEntityManagerFactory") EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }
}
```

### label (Spring 5.3+)
Adds descriptive labels for monitoring/tracing purposes.

### Important Caveats
- Only works on public methods
- Self-invocation bypasses the proxy (calling this.method() internally won't apply @Transactional)
- Class-level annotation applies as default to all methods; method-level overrides it

