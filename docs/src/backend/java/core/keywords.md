# Keywords

## this

```java
Box(double w, double h, double d) {
    this.width = w;
    this.height = h;
    this.depth = d;
}
```

* **this** - refer to the object that invoked it.
* **Instance Variable Hiding** - local variable hides the instance variable with same name.

## static

* static (methods and variable), are **class level** and **can be accessed without reference to any object**. ex. main()
* **main()** is declared as **static** because it **must be called before any objects exist**.
* static variables are **shared among all instances of the class**.
* When objects of its class are declared, **no copy of a static variable is made**.

### static methods restrictions

* Can call only other static methods.
* Can only access static data. 
* cannot refer to this or super in any way.

### static block

* executed before the main() at class load time, 
* used to do computation for initializing your static variables.
* **Static initialization blocks** are executed when the class is loaded, and you can initialize static variables in those blocks.
* A class can have any number of static initialization blocks, and they can appear anywhere in the class body.  
* The runtime system guarantees that static initialization blocks are called in the order that they appear in the source code.

```java
static {
    // whatever code is needed for initialization goes here
}
```

Alternative to static blocks
- you can write a **private static method**.
- **Advantage** : can be reused later if you need to reinitialize the class variable.
  - example : loadSettingsFromDisk() at start and again called by refreshConfiguration()

```java
class ConfigurationManager {
    private static Map<String, String> appSettings;
    // Initialized automatically when the class loads using the helper
    static {
        appSettings = loadSettingsFromDisk();
    }
    private static Map<String, String> loadSettingsFromDisk() {
        // initialization code goes here
    }
    public static void refreshConfiguration() { 
        loadSettingsFromDisk();
    }
}
```

### Static class

* can use only with inner class. 
* nested class which is a static member of the outer class.
* Accessed as OuterClass.* - `Computer.Builder`
* static nested class does not have access to the instance variables and methods of the outer class.

## final

* final in java are by **default read-only**.
* Used with class, method, and variables.
* static final constant.
* **Cannot change reference after assigning (compile error)**.
* final member variable must be **initialized on declaration or via constructor**.
* Only final variable is accessible inside anonymous class in Java. (Anonymous Inner Class without a name)
* Variables in an Interface are **implicitly final**.

### final variables in Java

```java
public static final String LOAN = "loan";
LOAN = new String("loan")                   //invalid compilation error
```

* final reference variable of collection means **only reference can not be changed but you can update** the same collection.

```java
private final List loans = new ArrayList();
loans.add("home loan");                     //valid
loans.add("personal loan");                 //valid
loans = new ArrayList();                    //not valid
```

### final method in Java

* These can not be overridden.
* Used when method is complete and its behavior should remain constant in sub-classes.

```java
class PersonalLoan{
    public final String getName(){return "personal loan";}
}
```

```java
class CheapPersonalLoan extends PersonalLoan{
    @Override
    public final String getName(){ return "cheap personal loan";}
    //compilation error: overridden method is final
}     
```

#### final methods Inlining

* Normally, **methods calls are dynamically resolved at run time**, called **late binding** or **dynamic binding**.
* As final methods cannot be overridden, method call can be **resolved at compile time**, called **early binding** or **static binding**, hence faster than usual methods.
* Here, Compiler is free to inline calls to final methods as they cannot be overridden by a subclass.
* When a small final method is called, often the **Java compiler can copy the bytecode for the subroutine directly inline with the compiled code of the calling method**, thus eliminating the costly overhead associated with a method call.

### final Class in Java

* **cannot be inherited**.
* example: **String, Integer and other wrapper classes**.
* **methods of final class are implicitly final**. 

```java
final class PersonalLoan {}
class CheapPersonalLoan extends PersonalLoan {
    //compilation error: cannot inherit from final class
}
```

### Benefits of final keyword

* final keyword improves performance.
* JVM and application can cache final variable.
* **Safe to share in [multi-threading](https://javarevisited.blogspot.com/2011/02/how-to-implement-thread-in-java.html) environment without additional synchronization overhead** in certain conditions only.
  * If a final method only reads data, works with local variables, or modifies completely immutable state, it is perfectly thread-safe.

```java
public class Calculator {
    private final int baseline = 10;
    // A standard, non-thread-safe shared map
    private final Map<String, Integer> sharedMap = new HashMap<>();

    // 100% THREAD-SAFE
    public final int compute(int input) {
        // 'input' lives on the thread's private stack.
        // 'baseline' is an immutable final primitive.
        int result = input * 2 + baseline; 
        return result;
    }

    // ❌ NOT THREAD-SAFE!
    // Multiple threads executing this concurrently corrupt the HashMap
    public final void addCalculation(String key, int value) {
        sharedMap.put(key, value); 
    }
}
```

### final and Immutable Class in Java

* It can not be modified once created. Example – **String**.
* required to **make a class immutable** in java.
* Immutable classes are read-only and safely shared in between multiple threads without any synchronization overhead.

### Summary Rule

- final on a variable means: The pointer cannot point to a different object.
- final on a method means: A subclass cannot override the logic.
- final on a class means: No other class can extend it.
