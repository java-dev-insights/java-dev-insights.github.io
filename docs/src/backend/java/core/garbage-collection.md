# Garbage Collection

* Java provides automatic deallocation via *garbage collection*. 
* **Objects with no references are eligible for collection by GC which occurs sporadically (if at all)**.
* De-referenced objects will **not be immediately garbage collected, remains on heap until next garbage collector cycle**.
* JVM runs garbage collector based on several predefined algorithms.
* *Advantage* 
  * makes java **memory efficient** 
  * Done by the garbage collector (JVM) with **no extra coding efforts**.
 
**How can an object be unreferenced?**

```java
employee = null;
e1 = e2;                // earlier referred object by e1 now unused
new Employee();         // anonymous object
Object being out of scope
```

## finalize() method

* Invoked each time **before the object is garbage collected**. 
* Can be used **to perform cleanup processing** ex. release resources, close DB connection, close sockets etc. 
* It is not called immediately when an object goes out-of-scope.
	- you cannot know when or even if **finalize( )** will be executed.
	- program should not rely on finalize( ) for normal program operation like realeasing resource etc. 
* class java.lang.Object : `protected void finalize(){}`

## gc() method

* used to invoke the garbage collector forcefully to perform cleanup processing. 
* Doesn’t guarantee that Garbage Collector will run immediately. 
* gc() is found in **System** and **Runtime** classes.
* **public static void gc(){}**

**Note:**

* Garbage collection is performed **by a daemon thread called Garbage Collector (GC)**.
* Neither finalization nor garbage collection is guaranteed. 
* GC collects any object in heap memory that is no longer reachable, regardless of how it was created.


```java
public class TestGC {
    public void finalize() {
        System.out.println("object is garbage collected");
    }
    public static void main(String args[]) {
        TestGC s1 = new TestGC();
        TestGC s2 = new TestGC();
        s1 = null;
        s2 = null;
        System.gc();
    }
}
// Output :
object is garbage collected
object is garbage collected
```

![](https://blogger.googleusercontent.com/img/a/AVvXsEgP1-7SRdiW9ByBXkdUp6QqFLRXhcMPkJtGyt90BWo5-X4FSbdG4YH4kxeGQyyo7PT8njJhOGzLnTgKZNB_ZgRz5PCK0ZFqY5syvEzpBqBrAjTkmB_Mdc3lvcU1u00KeLx9ktELPHKB4fappVa4ysXUrPz-9SHUU4LfUUEVCJCznFXP6__THttTqzdy=w635-h430)

![](https://miro.medium.com/v2/1*n6Akb6QcO4aS4Qw2H29P7w.png)

## Memory Leaks

**`Memory Leaks => Memory Shortage => Out of memory Error`**

![](https://stackify.com/wp-content/uploads/2017/07/how-memory-leaks-happen-java.jpeg)

![](https://www.browserless.io/blog/memory-leak-how-to-find-fix-prevent-them/690d11627852ccb404b25665_1.%20What%20Is%20a%20Memory%20Leak%20A%20Visual%20Breakdown.webp)

### Example Code

```java
public class CacheLeakExample {
    // This map lives for the entire lifecycle of the app
    private static Map<String, UserSession> userSessions = new HashMap<>();

    public void loginUser(String id) {
        // Object created
        UserSession session = new UserSession();
        // Pointer stored in global map
        userSessions.put(id, session);
    }

    public void logoutUser(String id) {
        // BUG: If we forget to do userSessions.remove(id) here, 
        // the UserSession object is leaked forever,
        // even if the user closes their browser.
    }
}
```
