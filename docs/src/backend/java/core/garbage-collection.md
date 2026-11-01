# Garbage Collection

* Java provides automatic deallocation via *garbage collection*. 
* **Objects with no references are eligible for collection by GC which occurs sporadically (if at all)**.
* De-referenced objects will **not be immediately garbage collected, remains on heap until next garbage collector cycle**.
* JVM runs garbage collector based on several predefined algorithms.
* *Advantage* - makes java **memory efficient** and done by the garbage collector (JVM) with **no extra coding efforts**.
 
**How can an object be unreferenced?**

```java
employee = null;
e1 = e2;                // object referred earlier by e1 is available for garbage collection
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
* **GC collects objects created by new keyword only**.

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
**`Memory Leaks => Memory Shortage => Out of memory Error`**
