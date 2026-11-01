# Spring Data

## Spring Data JPA
`spring-data-jpa`

```conf
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=DEBUG
```

### saveAll

- Looking into the implementation of the two methods, we can see that `saveAll()` iterates over each element and uses the `save()` method in each iteration. This implies that it shouldn’t be such a big performance difference.
- Both use `@Transactional` with default transaction propagation type is REQUIRED, which means that, if not provided, a new transaction is created each time the methods are called.
- Each time we call the save() method, a new transaction is created, whereas when we call saveAll(), only one transaction is created, and it’s reused later by save().
- This overhead translates into the performance difference that we noticed earlier. 
  - Finally, the overhead is bigger when batching is enabled due to the fact that it’s done at the transaction level.

```conf
# HIBERNATE BATCHING PROPERTIES
spring.jpa.properties.hibernate.jdbc.batch_size=250
spring.jpa.properties.hibernate.order_inserts=true
```

