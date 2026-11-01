# Interfaces

* Specifies the set of methods to be implemented, it defines what a class must do, but not how it does it.
* class can implement more than 1 interface, but ***can only inherit a single superclass due to Diamond Problem***.
* designed to support dynamic method resolution at run time. 
* `class classname [extends superclass] [implements interface [,interface...]] { // class-body }`
* declared methods have no bodies, **essentially abstract methods**.
* All variables are implicitly ***public static final*** (cannot be changed and must be initialized). 
* All methods are implicitly ***public***.
* method signature must remain same in implementing class as in ***interface***.

```java
access interface name {
  return-type method-name1(parameter-list);
  return-type method-name2(parameter-list);
  type final-varname1 = value;
  type final-varname2 = value;
  //...
  return-type method-nameN(parameter-list);
  type final-varnameN = value;
}
```

## Accessing Implementations via Interface References

* interface references for any instance of implementation, method to be executed is looked up dynamically at run time.
* interface reference variable knows only about methods declared by **interface** declaration.
* class must be declared as **abstract** if all methods of interface are not implemented. 

## Nested Interfaces

* as a member of class or another interface, a member interface or a nested interface. 
* A nested interface can be declared as **public**, **private**, or **protected**.
* differs from a top-level interface, which must either be **public** or **default**.
* Outside defining parent class/interface, its name must be fully qualified.

```java
class A {
    public interface NestedIF {
        boolean isNotNegative(int x);
    }
}

// B implements the nested interface.
class B implements A.NestedIF {
    public boolean isNotNegative(int x) {
        return x < 0 ? false : true;
    }
}

class NestedIFDemo {
    public static void main(String args[]) {
        A.NestedIF nif = new B();
        if (nif.isNotNegative(10))
            sysout("10 is not negative");
    }
}
```

## Practical Example

* Stack interface, **push()** and **pop()**, implementation can be fixed size or growable using array, linked list, binary tree etc.

## Variables in Interfaces

* to import shared constants into multiple implementation classes.
* Interface with no methods, class are importing constant fields as **final** variables. 

## Default Methods in Interface 

* From JDK 8, default methods **enabled interfaces to expand without breaking the existing code**.
* to specify methods that are optional, depending on how the interface is used.
* Example - Interface of sequence may support both modifiable and non-modifiable, then **remove()** is optional.
* does not change a key aspect of **interface**: its inability to maintain state information via instance variable.
* **difference** - a class can maintain state information, but an interface cannot.

```java
interface IntStack {
 void push(int item); // store an item
 int pop(); // retrieve an item
 default void clear() {  sysout("clear() not implemented.");   }
}
```

- The default method gives you
  * a way to gracefully evolve interfaces over time, and
  * a way to provide optional functionality without placeholder implementation.

## Diamond Problem

* Multiple Inheritance Issues - Diamond Problem. For example,
  * Interfaces - Alpha and Beta 
  * class - MyClass.
  * Default Method- reset().

::: details Diamond Problem - Interfaces
![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3-ODBpizPI_QK6DpZVhkP_bUtlQfi1WW2D-zjWCxB1w&s=10)
:::

::: details Diamond Problem - Classes
![](https://media.licdn.com/dms/image/v2/D5622AQG17_TIzcqoMw/feedshare-shrink_800/B56Zi0JAJrHcAk-/0/1755368919113?e=2147483647&v=beta&t=JQ7sgfc_MEBuTe6TCrGueirRNqBA9IrYZ3_pnBmx7uA)
:::

## Rules that resolves conflicts

* class implementation takes priority over an interface default implementation. 
* two interfaces with same default method but no override, then an error will result.
* one interface inherits another, child’s implementation takes precedence. 
  * Beta extends Alpha, then Beta’s version of reset() will be used.
* super - to explicitly refer default implementation of parent interface in child.
  * `InterfaceName.super.methodName()` - `Alpha.super.reset()`;
* class/interface can invoke a default method of an interface that is explicitly mentioned in implements/extends clause.
* cannot invoke a default method provided by an interface that is not directly implemented (or extended) by the caller.

Q. Java does not support the multiple inheritance of classes. Now that an interface can include default methods, you might be wondering if an interface can provide a way around this restriction?  **No**

## Use static Methods in an Interface

* From JDK 8, interface can define one or more static methods.
* `InterfaceName.staticMethodName`
* static interface methods are not inherited by either an implementing class or a sub-interface.

```java
interface NewInterface {
    // static method
    static void hello() { 
        System.out.println("Hello, New Static Method Here");
    }
    // Public and abstract method of Interface
    void overrideMethod(String str); 
}
```

## Abstract Class vs Interface

| Interface                                                                                            | Abstract Class                                                                                                         |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Variables - public static final.                                                                     | Variables - private, protected etc.                                                                                    |
| Can’t store state                                                                                    | Can store state                                                                                                        |
| methods - public or public static                                                                    | methods – can be private and protected too                                                                             |
| establishes relation for unrelated classes.                                                          | establishes relation for interrelated objects.                                                                         |
| Use interfaces when full implementation required                                                     | when you want partial pieces for your design (for reusability)                                                         |
| i.e. to define the role that classes can play, regardless of their position in the inheritance tree. | i.e. a template for a group of sub-classes, with some implementation code.                                             |
| implements keyword – multiple                                                                        | extends keyword - only  one                                                                                            |
| set of methods without concrete implementations.                                                     | Subclasses provide implementations, or become  abstract.                                                               |
| provides IS-A relationship.                                                                          | purpose is to provide superclass that can be inherited to share a common design.                                       |
| Example : Comparable, Serializable or Cloneable.                                                     | Example- AbstractMap ==> HashMap, TreeMap, ConcurrentHashMap (Methods - get, put, isEmpty, containsKey, containsValue) |

- Interface : `Map<K, V>`
- Abstract Class : `AbstractMap<K, V> implements Map<K, V>`
- Implementation Class
  - HashMap extends AbstractMap and builds an internal array hash-bucket system.
  - LinkedHashMap extends AbstractMap and builds an internal Linked List hash-bucket system.
  - TreeMap extends AbstractMap and builds an internal Red-Black balanced tree structure.



```java
public interface Map<K, V> {
    void put(K key, V value);
    V get(Object key);
    int size();
    boolean isEmpty();
    // No code, no implementation blocks, no state fields.
}
```

```java
public abstract class AbstractMap<K, V> implements Map<K, V> {
    
    int size;

    // AbstractMap provides a universal implementation for isEmpty!
    @Override
    public boolean isEmpty() {
        return this.size() == 0; // Reusable logic for all maps
    }

    // universal implementation for get by looping over entries
    @Override
    public V get(Object key) {
        // ... generic fallback loop over entries to find the key ...
        return null;
    }

    // It deliberately leaves structural data management abstract!
    // The concrete subclass must figure out how to track entry sets.
    public abstract Set<Entry<K,V>> entrySet();
}
```
