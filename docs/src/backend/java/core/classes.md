# Classes

* Defines a new data type, works as a template.
* class is logical construct while object has physical reality.
  * object occupies space in memory.
* **instance variables** : variables defined within a class.
* ***constructor*** : used for initialization on creation.

```java
class Car {
    // Instance variables (Attributes)
    String model;
    int year;

    // 1. No-Argument Constructor (Sets default values)
    public Car() {
        this.model = "Unknown Model";
        this.year = 2000;
        System.out.println("No-argument constructor called!");
    }

    // 2. Parameterized Constructor (Sets custom values)
    public Car(String model, int modelYear) {
        this.model = model; // 'this' resolves conflict if names match
        this.year = modelYear;
        System.out.println("Parameterized constructor called!");
    }

    // Helper method to display car details
    public void displayDetails() {
        System.out.println("Car Model: " + model + ", Year: " + year);
    }
}
```

## Assigning Object reference variables

<ImageComponent image-path='/java/core-java/assign-object.png' />

## Constructors

* Constructors has no return type, not even **void**, because implicit return type is the class type itself.
* default constructor initializes all instance variables to their default values. (0, null, false).

**Why Java Static Constructor is not allowed?**

- ***Static Belongs to Class, Constructor to Object.***
  - Constructor is not class property, it makes sense that it’s not allowed to be static.
- ***Static Block/Method can’t access non-static variables***
  - while constructors are used to initialize instance variables and it can use `this`.
  - Static Block/Method cannot use `this` in a static context.
- ***Static Constructor will break inheritance***
  - In java class hierarchy, subclass constructor calls superclass constructor using super() method (JVM calls implicitly).
  - super() method is not static. So if the constructor becomes static, we won’t be able to use it and that will break inheritance in java.

**Java Static Constructor Alternative**

- To initialize some static variables in the class, you can use static block.
  - Static Blocks run once: A static block executes exactly once when the class is first loaded into memory by the Java Virtual Machine (JVM). This happens before any objects are created.
- We can’t pass arguments to the static block, so if you want to initialize static variables then you can do that in the normal constructor too.

```java
class RoleManager {
    // Static variable shared across the entire class
    public static List<String> systemRoles = new ArrayList<>();

    // Static Initialization Block
    static {
        System.out.println("-> Static block, Initializing system roles.");
        systemRoles.add("Admin");
        systemRoles.add("Editor");
        systemRoles.add("Viewer");
    }

    // Normal Constructor
    public RoleManager() {
        System.out.println("-> new RoleManager object was created.");
    }
}
```

## Variables and scopes

* **Variables**
	- basic unit of storage. (type+Identifier+optional initializer).
	- Have scope(visibility) and a lifetime.
* **Scope** - section of code where var is acessible. 
* **Lifetime** - time duration till var in a valid state, even if out of scope.

| variable scopes |                                                                |
| --------------- | -------------------------------------------------------------- |
| protected       | when inheritance is involved.                                  |
| public          | accessible by any other code.                                  |
| private         | accessed by other members of its class.                        |
| default         | no access modifier, cannot be accessed outside of its package. |

![](https://upload.wikimedia.org/wikipedia/commons/2/20/JavaAccessSpecifier.jpg)
![](https://storage.googleapis.com/algodailyrandomassets/curriculum/object_oriented_programming/advanced_oop_class_access_modifiers_overloading/visibility-as-boundaries-65949821.png)

* Now you can understand why **main( )** has always been preceded by the **public** modifier.
  * It is called by code that is outside the program—that is, by the Java run-time system.
* In most real-world classes, you will need to allow operations on data only through methods (getX and setX).

## Object Class

* Object - superclass of all classes.
* A reference variable of type Object can refer to any object, even to an array.
* Object class has 4 methods declared as final : getClass(), notify(), notifyAll(), and wait().
* You may override the others, for example hashCode(), equals(), toString(), clone()

```java
// 1. Pointing to a primitive int array
int[] numbers = {1, 2, 3};
Object obj1 = numbers; 

// 2. Pointing to a String array (Object array)
String[] words = {"Hello", "World"};
Object obj2 = words; 

// 3. Pointing to a standard class instance
String singleWord = "Java";
Object obj3 = singleWord;
```

### Methods for class : Object

| Object Class Methods       |                                                     |
| -------------------------- | --------------------------------------------------- |
| Object clone( )            | final void notify( )                                |
| int hashCode( )            | final void notifyAll( )                             |
| boolean equals(Object obj) | final void wait( ), void wait(long milliseconds)    |
| void finalize( )           | final void wait(long milliseconds, int nanoseconds) |
| String toString( )         | final Class<?> getClass()                           |

### Ways to create Object

1. Using the new keyword
2. Using newInstance() method of `Class` class, It calls the no-arg constructor to create the object.
3. newInstance() method of `Constructor` class
4. Using clone() method
5. Using deserialization

```java
Employee.class.newInstance(); OR
(Employee) Class.forName("org.package.Emp").newInstance();
```

```java
Constructor<Emp> constructor = Emp.class.getConstructor(); 
Emp emp3 = constructor.newInstance();
```

```java
(Employee) emp3.clone();
```

```java
FileInputStream fis = new FileInputStream("data.obj");
ObjectInputStream in = new ObjectInputStream(fis); 
Employee emp5 = (Employee) in.readObject();
```

In above bytecodes all 4 methods call get converted to invokevirtual (object creation is directly handled by these methods) except the first one which got converted to two calls one is new and other is invokespecial (call to the constructor).

| Class.newInstance()                                                   | java.lang.reflect.Constructor.newInstance()                          |
| --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| can only invoke the no-arg constructor                                | Can invoke any constructor, regardless of the number of parameters.  |
| requires that the constructor should be visible                       | Can also invoke private constructors under certain circumstances.    |
| throws any exception (checked or unchecked) thrown by the constructor | Always wraps the thrown exception with an InvocationTargetException. |

* Due to above reasons **Constructor.newInstance() is preferred over Class.newInstance()**, that’s why used by various frameworks and APIs like Spring, Hibernate, Struts, Guava, Zookeeper, Jackson, Servlet etc.
  * Both newInstance() methods are known as reflective ways to create objects.
  * In fact newInstance() method of Class class internally uses newInstance() method of Constructor class.
* Whenever we call clone() on any object JVM actually creates a new object for us and copy all content of the previous object into it. 
  * Creating an object using clone method does not invoke any constructor.
  * To use clone() method on an object we need to implements `Cloneable` interface and define clone() method in it.
* Whenever we serialize and then deserialize an object JVM creates a separate object for us.
  * In deserialization, JVM doesn’t use any constructor to create the object.
  * To deserialize an object we need to implement the `Serializable` interface in our class.

## Math class - Math.pow

- Defined in  `java.lang.Math` class as a static method, you do not need to create an object to use it; you call it directly using the class name.
- `public static double pow(double base, double exponent)`

## Nested classes

* **Nested Classes** : A class define within another enclosing class.
* It is a member of its enclosing class.
  * scope is bounded by the scope of its enclosing class. 
* B defined within A, then B ***does not exist independently*** of A.
* **nested class can access even private members of the container class but not vice-versa**.
* They are **particularly helpful when handling events**.
* Nested classes are split into two main categories:
  * Static Nested Classes
  * Non-Static Nested Classes (commonly called Inner Classes)


| Type                     | Relationship to Outer Class                                                                    | Requires Outer Instance? | Can Access Outer's Private Members?            |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------- |
| Static Nested Class      | Associated with the outer class itself, not an instance. <br/> Behaves like a top-level class. | No                       | Only static members.                           |
| Inner Class (Non-Static) | Tied to a specific instance of the outer class.                                                | Yes                      | Both static and instance (non-static) members. |

### Static nested class

* cannot refer to non-static members of its enclosing class directly, so they are seldom used.
* Common Use Cases:
  * The Builder Pattern: builder is written as a static class inside the main object class (e.g., User.Builder)
  * Data Holders / Node Structures: Implementing internal data structures like a Node inside a LinkedList or an Entry inside a HashMap. Since the node only holds its own data, pointers, or generic values, it doesn't need to know about the overarching list's properties.
  * Grouping Constants or Helper Enums: If you have an enum or a small class that only makes sense in the context of the outer class, making it static keeps the packaging clean without incurring memory overhead.
* Why choose it? 
  * It is highly efficient because it does not maintain an implicit reference to an outer object, saving memory and avoiding potential memory leaks.

::: details Computer.Builder
```java
public class Computer {
    private final String hdd;
    private final String ram;
    
    // Private constructor ensures objects are only made via the Builder
    private Computer(Builder builder) {
        this.hdd = builder.hdd;
        this.ram = builder.ram;
    }

    // Static Nested Class: Operates independently of a Computer instance
    public static class Builder {
        private String hdd;
        private String ram;

        public Builder setHDD(String hdd) { this.hdd = hdd; return this; }
        public Builder setRAM(String ram) { this.ram = ram; return this; }
        public Computer build() { return new Computer(this); }
    }

    public void showSpecs() {
        System.out.println("Specs: HDD=" + hdd + ", RAM=" + ram);
    }
}

// How to use it:
class Main {
    public static void main(String[] args) {
        // No outer 'Computer' instance is required to create the static Builder
        Computer.Builder builder = new Computer.Builder(); 
        Computer comp = builder.setHDD("1TB SSD").setRAM("16GB").build();
        comp.showSpecs();
    }
}
```
:::

### Inner class

* inner class is a **non-static nested class**.
* has access to all of the variables and methods of its outer class, including private also.
* instance of **Inner** created only in context of **Outer** class otherwise compile-time error.
* can define a nested class within a method block or even in the body of a **for loop**.
* Common Use Cases:
  * Backing Store Helpers: Defining a component that tightly coordinates with a specific parent state. For example, a BankAccount object might have an inner Transaction class that directly alters the account's private balance.
* Why choose it?
  * It allows for clean, seamless code when two objects are inseparable conceptually, mimicking a "has-a" relationship where the child needs direct line-of-sight into the parent's current state.

::: details BankAccount
```java
public class BankAccount {
    private final String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    // Inner Class: Strictly tied to a specific BankAccount instance
    public class Transaction {
        private final double amount;

        public Transaction(double amount) {
            this.amount = amount;
        }

        public void execute() {
            // Direct access to the outer class's private field 'balance'
            balance += amount; 
            System.out.println("Account " + accountNumber + " processed transaction: £" + amount);
            System.out.println("New Balance: £" + balance);
        }
    }
}

// How to use it:
class Main {
    public static void main(String[] args) {
        // 1. You MUST create the outer instance first
        BankAccount myAccount = new BankAccount("GB12345", 500.00);

        // 2. Syntax to create the inner object requires the outer instance syntax (.new)
        BankAccount.Transaction deposit = myAccount.new Transaction(150.00);
        deposit.execute();
    }
}
```
:::

## Anonymous Inner class

- Inner class without a name that is declared and instantiated at the exact same time.
- Because it lacks a name, you can only instantiate it once to create a single object.
- Use Cases
  - Implementing an Interface On-the-Fly like Runnable, ActionListener, or a custom functional interface without creating a dedicated class file.
  - Extending a concrete or abstract class and override specific methods.
- Application - In writing implementation classes for listener interfaces in graphics programming.

### Constraints

1. No Constructors: Since constructors require the name of the class, you cannot write one. If you need initialization, you must use instance initializer blocks or rely on the superclass constructor parameters passed inside the parentheses.
2. One Supertype Only: An anonymous inner class can either implement one interface or extend one class. It cannot do both, and it cannot implement multiple interfaces.
3. Variable Capture (Scope Restrictions): It can access variables from its enclosing scope (like local variables in the method it's defined in), but those variables must be final or effectively final (meaning their values are never modified after assignment).
4. Static Members: It cannot declare static initializers or member interfaces. Static fields are strictly restricted to constant variables (static final).

### Types of anonymous inner class

**Anonymous Inner class that extends a class**

```java
class MyThread { 
	public static void main(String[] args){ 
		Thread t = new Thread(){ 
			public void run() { 
				System.out.println("Child Thread"); 
			} 
		}; 
		t.start(); 
		System.out.println("Main Thread"); 
	}
} 
```

**Anonymous Inner class that implements a interface**

```java
class MyThread { 
	public static void main(String[] args){ 
		Runnable r = new Runnable(){ 
			public void run(){ 
				System.out.println("Child Thread"); 
			} 
		}; 
		Thread t = new Thread(r);
		t.start(); 
		System.out.println("Main Thread"); 
	} 
} 
```

**Anonymous Inner class that defines inside method/constructor argument**
```java
class MyThread {
    public static void main(String[] args) {
        Thread t = new Thread(new Runnable() {
            public void run() {
                System.out.println("Child Thread");
            }
        });
        t.start();
        System.out.println("Main Thread");
    }
}
```

## Class vs Anonymous Inner class

- **Normal class**
  - Can extend a class and implement any number of interface simultaneously.
  - Can write any number of constructors
- **Anonymous Inner class**
  - can either extend a class or implement an interface, but not both at a time.
  - Can't write any constructor

## Immutable Class

- An immutable class in Java is a class whose instances cannot be modified after they are created.
- Once an object is instantiated, its state (the data stored inside it) remains completely unchanged for its entire lifetime.
- The most famous examples of immutable classes in Java are String, Integer, Double, and LocalDate.

### Create Immutable
* **final class** : it can’t be extended.
* **private fields** : direct access is not allowed.
* **No setter** methods for variables
* **all mutable fields final** : value can be assigned only once.
* **Initialize all the fields via a constructor performing deep copy**.
* **getter methods to return a copy** by cloning, not the actual object reference.

### Types of Immutabilty

#### Technically Immutable

* state doesn't change after construction, includes primitive wrapper classes.
* ***even this immutable object can be changed using reflection, however that is usually ignored for the purposes of discussing immutability***.
* Only inlined compile time constants are effectively immutable in true sense.
* inlined compile-time constant like `public static final int MAX_USERS = 100; or a constant String`
* Constant strings and primitives are baked directly into the .class file's constant pool metadata. They are loaded into a read-only area of JVM memory.
* You cannot use core reflection to change an inlined primitive or String constant because there is no field pointer left to manipulate at runtime; the values have already been hardcoded into the execution instructions.

```java
public class Integer {
    private final int value;
}
```

#### Logically Immutable
  
* A class is logically immutable provided the exposed interface never changes.
* internal state can change to cache calculated values but does not change the result of any combination of methods (though the timing of those methods could change).
* **field hash** - can change, but the class is logically immutable as the only change is to cache a derived result and there is no way the caller can tell the difference using normal methods calls.

```java
public final class FinalClassExample {
    private final int id;
    private final String name;
    private final HashMap<String,String> testMap;

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    /*Accessor function for mutable objects*/
    public HashMap<String,String> getTestMap() {
        return (HashMap<String,String>) testMap.clone();
    }
    /*Constructor performing Deep Copy*/
    public FinalClassExample(int i, String n, HashMap<String,String> hm) {
        System.out.println("Performing Deep Copy");
        this.id = i;
        this.name = n;
        /* Shallow Copy */
        this.testMap = hm;
        /* Deep Copy */
        this.testMap = deepcopy(hm);
    }

    private HashMap<String,String> deepcopy(HashMap<String,String> hm){
        HashMap<String,String> tempMap = new HashMap<String,String>();
        String key;
        Iterator<String> it = hm.keySet().iterator();
        while (it.hasNext()) {
            key = it.next();
            tempMap.put(key, hm.get(key));
        }
        return tempMap;
    }
}
```

### Date Field attribute

```java
public Date getDate() {
    // This will make your class mutable.
    return this.date;                       
    
    // date field cannot be changed.
    return new Date(this.date.getTime());   
}
```

### String Class (final)

- The String class is still considered completely immutable because its logical state (the characters it represents) never changes, even though its internal tracking variable (hash) does.
- This design is a classic example of lazy initialization and cached state management.
- Because changing hash from 0 to its calculated value does not alter the text content of the string, the observable behavior of the object remains perfectly identical before and after hashCode() is called.

```java
public final class String {
    /*Cache the hash code for the string */
    private int hash;          // Default to 0
    public int hashCode() {
        // 1. COPIES the shared field into a local variable
        int h = hash;
        int len = count;
        if (h == 0 && len > 0) {
            int off = offset;
            char val[] = value;
            for (int i = 0; i < len; i++)
                // 2. MODIFIES ONLY THE LOCAL COPY
                h = 31*h + val[off++];
            // 3. WRITES BACK TO THE SHARED FIELD AT THE VERY END
            hash = h;
        }
        return h;
    }
}
```


**The Magic of Stack Memory vs. Heap Memory**

- In Java, every single thread has its own private Thread Stack.
  - Any variable declared inside a method (like int h, int off, int i) lives exclusively on that thread's private stack.
  - No other thread can see, read, or modify these stack variables.
- The shared instance field, this.hash, lives on the Heap, which both threads can see.