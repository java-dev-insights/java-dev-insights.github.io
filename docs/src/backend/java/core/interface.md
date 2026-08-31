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
* example, interface of sequence may support both modifiable and nonmodifiable, then **remove()** is optional.
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

## Diamond Problem - Multiple Inheritance Issues
* Diamond Problem. For example,
  * Interfaces - Alpha and Beta 
  * class - MyClass.
  * Default Method- reset().

## Rules that resolves conflicts:
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
    static void hello() { // static method
        System.out.println("Hello, New Static Method Here");
    }
    void overrideMethod(String str); // Public and abstract method of Interface
}
```

## Abstract Class vs Interface

| Interface                                                                                                                                             | Abstract Class                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Variables - public static final.                                                                                                                      | Variables - private, protected etc.                                                                                                       |
| Can’t store state                                                                                                                                     | Can store state                                                                                                                           |
| methods - public or public static                                                                                                                     | methods – can be private and protected too                                                                                                |
| establishes relation for unrelated classes.                                                                                                           | establishes relation for interrelated objects.                                                                                            |
| Use interfaces when full implementation required i.e. to define the role that classes can play, regardless of their position in the inheritance tree. | when you want partial pieces for your design (for reusability) i.e. a template for a group of sub-classes, with some implementation code. |
| implements keyword – multiple                                                                                                                         | extends keyword - only one                                                                                                                |
| set of methods without concrete implementations.                                                                                                      | Subclasses provide implementations, or become  abstract.                                                                                  |
| provides IS-A relationship.                                                                                                                           | purpose is to provide superclass that can be inherited to share a common design.                                                          |
| Example-Comparable or Cloneable.                                                                                                                      | Example- AbstractMap ==> HashMap, TreeMap, ConcurrentHashMap (Methods - get, put, isEmpty, containsKey, containsValue)                    |
