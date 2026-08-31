# Classes

* Defines a new data type, works as a template.
* class is logical construct while object has physical reality.
  * object occupies space in memory.
* variables defined within a class are called ***instance variables***.
* ***constructor*** used for initialization on creation.

```java
ClassName(){ }
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
  - while constructors are used to initialize instance variables.
  - this - Cannot use this in a static context.
- ***Static Constructor will break inheritance***
  - In java class hierarchy, subclass constructor calls superclass constructor using super() method (JVM calls implicitly).
  - super() method, it’s not static. So if the constructor becomes static, we won’t be able to use it and that will break inheritance in java.

**Java Static Constructor Alternative**
- To initialize some static variables in the class, you can use static block.
- We can’t pass arguments to the static block, so if you want to initialize static variables then you can do that in the normal constructor too.

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

* Now you can understand why **main( )** has always been preceded by the **public** modifier.
  * It is called by code that is outside the program—that is, by the Java run-time system.
* In most real-world classes, you will need to allow operations on data only through methods (getX and setX).

## Object Class

* Object - superclass of all classes.
* reference variable of type Object can refer to any object, even to an array.
* getClass(), notify(), notifyAll(), and wait() are declared as final. You may override the others.

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
2. Using Class.newInstance() from class Class, It calls the no-arg constructor to create the object.
3. newInstance() method of Constructor class
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
ObjectInputStream in = new ObjectInputStream(new FileInputStream("data.obj")); 
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
  * To use clone() method on an object we need to implements Cloneable and define clone() method in it.
* Whenever we serialize and then deserialize an object JVM creates a separate object for us.
  * In deserialization, JVM doesn’t use any constructor to create the object.
  * To deserialize an object we need to implement the Serializable interface in our class.

## Math class - Math.pow

## Inner class

* define class within a class, ***nested classes***. 
* It is a member of its enclosing class.
  * scope is bounded by the scope of its enclosing class. 
* B defined within A, then B ***does not exist independently*** of A.
* **nested class can access even private members of the container class but not vice-versa**. 
* They are **particularly helpful when handling events**.

### Static nested class
* cannot refer to non-static members of its enclosing class directly, so they are seldom used.

### Inner class
* inner class is a **non-static nested class**.
* has access to all of the variables and methods of its outer class, including private also.
* instance of **Inner** created only in context of **Outer** class otherwise compile-time error.
* can define a nested class within a method block or even in the body of a **for loop**.

## Anonymous Inner class

- Inner class without a name.
   - for which only a single object is created.
- Useful when making an instance of an object with certain “extras” such as overloading methods of a class or interface, without having to actually subclass a class.
- Application - In writing implementation classes for listener interfaces in graphics programming.

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
  - Cant write any constructor

## Immutable Class

### Create Immutable
* Declare the class as **final** so it can’t be extended.
* Make all **fields private** so that direct access is not allowed.
* **Don’t provide setter** methods for variables
* Make **all mutable fields final** so that it’s value can be assigned only once.
* **Initialize all the fields via a constructor performing deep copy**.
* Perform **cloning** of objects **in the getter methods to return a copy** rather than returning the actual object reference.

### Types of Immutabilty

- **Technically Immutable**
  * state doesn't change after construction, includes primitive wrapper classes.
  * only inlined compile time constants are effectively immutable in true sense.
  * ***even this immutable object can be changed using reflection, however that is usually ignored for the purposes of discussing immutability***.

```java
public class Integer {
    private final int value;
}
```

- **Logically Immutable**
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
For a Date Field,
```java
public Date getDate() {
    return this.date;                       // This will make your class mutable.
    return new Date(this.date.getTime());   // date field cannot be changed.
}
```

### String Class (final)
```java
public final class String {
    /*Cache the hash code for the string */
    private int hash;          // Default to 0
    public int hashCode() {
        int h = hash;
        int len = count;
        if (h == 0 && len > 0) {
            int off = offset;
            char val[] = value;
            for (int i = 0; i < len; i++)
                h = 31*h + val[off++];
            hash = h;
        }
        return h;
    }
}
```
