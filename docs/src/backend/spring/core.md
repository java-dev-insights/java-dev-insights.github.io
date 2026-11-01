# Spring Core

## Dependency Injection 

> Process where objects use their dependent objects without a need to define or create them is called `Dependency injection`.

We can inject dependent objects in three ways, using:
- Constructor injection
- Setter injection
- Field injection : involves injecting dependencies directly into the class using the @Autowired annotation.

[Dependency Injection in Spring official doc](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html){target="_blank"}

### Field injection is not recommended
- Null safety
- Immutability
- Design Problems
  - Single Responsibility Violation
  - Circular Dependencies
- Testing

#### Null-Safety
- Field injection creates a risk of NullPointerException if dependencies aren’t correctly initialized.
  - Using the field injection, we didn’t provide a direct way of instantiating the EmailService with required dependencies.
- We are able to create the EmailService instance using the default constructor.
  - we can reduce the risk of NullPointerException using the constructor injection as it exposes the required dependencies publicly.

```java
@Service
public class EmailService {
    @Autowired
    private EmailValidator emailValidator;
}
```

#### Immutability
- Using the field injection, we are unable to create immutable classes.
  - We need to instantiate the final fields when they’re declared or through the constructor.
- Spring performs autowiring once the constructors have been called. Therefore, it’s impossible to autowire the final fields using field injection.
  - Since the dependencies are mutable, there’s no way we can ensure they will remain unchanged once they’re initialized.
  - reassigning non-final fields can cause unexpected side effects when running the application.
- Alternatively, we can ***use constructor injection for mandatory dependencies and setter injection for optional ones***. This ensure the required dependencies will remain unchanged.

#### Design Problem - Single Responsibility
- One class should be responsible for only one action and, thus, have only one reason to change.
  - We can easily add more dependencies than necessary and create a class that’s doing more than one job.
- Using constructor injection, we’d notice we might have a design problem if a constructor has more than a few dependencies.
  - Furthermore, even the IDE would issue a warning if there are more than seven parameters in the constructor.

#### Design Problem Circular Dependencies
- When two or more classes depend on each other, and it’s impossible to construct objects, and the execution can end up with runtime errors or infinite loops.
- With Field Injection, dependencies are injected when needed and not on the context load, Spring won’t throw BeanCurrentlyInCreationException.
- With constructor injection, it’s possible to detect circular dependencies at compile time since they would create unresolvable errors.
  - circular dependencies in our code are a sign something is wrong with our design. Therefore, we should consider redesigning our application if possible.
- Since Spring Boot 2.6. version circular dependencies are no longer allowed by default.

#### Testing Field Injection
- We can’t directly replace the field injected dependency with a mocked version.
  - We can instantiate our class through reflection.
- Mockito will try to inject mocks using the @InjectMocks annotation. However, if the field injection strategy fails, Mockito won’t report the failure.

## @Component used as syncronized

- Using @Component in combination with synchronized in Spring indicates a desire to make a bean thread-safe, ensuring that only one thread can execute specific methods or code blocks at a time. 
- By default, Spring beans are singletons, meaning the same instance is shared across threads, making manual synchronization necessary for thread safety.

**Key Approaches to Synchronization in Spring Components**

- Synchronized Methods : You can mark methods within your @Component class as synchronized. Since the bean is a singleton, this locks the entire object instance.
- Synchronized Blocks (Fine-Grained) : Instead of locking the entire method, you can use synchronized(this) or a dedicated lock object for better performance, allowing other parts of the component to remain accessible.

```java
@Component
public class MyComponent {
    private int count = 0;
    private final Object lock = new Object();

    // Only one thread can enter this method per instance
    public synchronized void increment() {
        count++;
    }

    public void doTask() {
        // Specific critical section
        synchronized(lock) {
            // ... thread-safe code ...
        }
    }
}
```

**Considerations and Best Practices**
- Performance: Excessive use of synchronized can lead to bottlenecks, as other threads will be blocked until the lock is released.
- Deadlocks: Avoid nesting synchronized blocks or locking multiple objects in different orders, as this can cause deadlocks.
- Alternative (Concurrent Classes): For managing shared data, consider using java.util.concurrent classes (e.g., AtomicInteger, ConcurrentHashMap) instead of synchronized for better scalability.
- Lock Scope: A synchronized method locks the specific Bean instance. 
  - If you have multiple instances of the same @Component (e.g., using @Scope("prototype")), they will not block each other.
  - If you need to lock across multiple instances, consider static synchronization, which locks the class object.

> Note: In many scenarios, if the component is stateless, no synchronization is required at all. 

**ReentrantLock instead of synchronized**

```java
import org.springframework.stereotype.Component;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class SmartInventoryComponent {
    private final ReentrantLock lock = new ReentrantLock(); // Add 'true' for fairness
    private int stock = 100;

    public void updateStockWithTimeout() throws InterruptedException {
        // Try to get the lock within 2 seconds instead of waiting forever
        if (lock.tryLock(2, TimeUnit.SECONDS)) {
            try {
                stock--; 
            } finally {
                lock.unlock(); // Always unlock in finally
            }
        } else {
            // Handle failure to acquire lock (e.g., log a warning or return an error)
            System.out.println("Could not acquire lock, system busy");
        }
    }
}
```

While synchronized is simpler and often optimized by the JVM for low-contention scenarios, ReentrantLock offers specific advantages: 
- TryLock: Attempt to acquire the lock immediately or within a specific timeframe (tryLock()), allowing the thread to perform other tasks if the lock is held.
- Fairness: You can initialize it with new ReentrantLock(true) to ensure the longest-waiting thread gets the lock next, preventing "starvation".
- Interruption: Threads waiting for a lock via lockInterruptibly() can be interrupted, which is useful for clean shutdowns.
- Advanced Conditions: You can create multiple Condition variables from a single lock, providing more flexibility than basic wait() and notify(). 