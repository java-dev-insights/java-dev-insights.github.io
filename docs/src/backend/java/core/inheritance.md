# Inheritance

<ImageComponent image-path='/java/core-java/inheritance.png' />

* For hierarchical classifications - superclass and subclass.
* `class B extends A {}`
* Diamond problem - No multiple class inheritance.
* No class can be a superclass of itself.

## Member Access and Inheritance

* subclass cannot access **private** members of superclass - only public or protected
* superclass reference variable can point to subclass object.
* The type of the reference variable (not the runtime object) determines what members (variables and methods) the compiler will let you access.
  * Variables are resolved at compile-time based on the reference type.
  * Overridden Methods are resolved at runtime based on the actual object type (Dynamic Method Dispatch).

```java
class ParentClass {
    public String name = "Parent Variable";
    private int secretCode = 1234; // Subclass cannot see this directly

    public void printMessage() {
        System.out.println("Hello from Parent class");
    }
}

class ChildClass extends ParentClass {
    // Hides parent variable (Shadowing)
    public String name = "Child Variable"; 
    public String specificChildField = "Unique to Child";

    @Override
    public void printMessage() {
        System.out.println("Hello from Child class");
    }

    public void childOnlyMethod() {
        System.out.println("This is unique to the Child.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Superclass reference pointing to Subclass object
        ParentClass variable = new ChildClass();

        // 1. Variable access 
        // (Determined by reference type -> ParentClass)
        System.out.println(variable.name); 
        // Output: Parent Variable

        // System.out.println(variable.specificChildField); 
        // COMPILER ERROR: ParentClass doesn't know specificChildField

        // 2. Method access 
        // (Polymorphism -> determined by runtime object -> ChildClass)
        variable.printMessage(); 
        // Output: Hello from Child class

        // variable.childOnlyMethod(); 
        // COMPILER ERROR: ParentClass reference
    }
}
```

## super Keyword

* To refer immediate superclass.
* To access superclass member vars hidden in subclass.
* Call superclass’ constructor
  * **super() must always be the first statement in subclass constructor**.
* Hierarchy constructors execute in order of derivation, from superclass to subclass.
* If super() is not used, then NoArgsConstructor of each superclass will be executed.

## Method Overriding

* subclass method with same name and type signature as in superclass.
* method called from subclass refers to subclass’s implementation.
* super – to call hidden superclass method.
* “one interface, multiple methods” aspect of polymorphism.

## Dynamic Method Dispatch

* mechanism for run-time polymorphism, resolve overridden method. 
* superclass reference var for subclass object is used to resolve calls to overridden methods at run time.
* ***type of object being referred, not reference variable, determines the overridden version to be executed.***

```java
A a = new B();      // r refers to a B object
a.callme();         // calls B's version of callme
```

## Using Abstract Classes

* defines only a generalized form to be shared by all of its subclasses, where each subclass takes care of details.
* Has 1 or more **abstract method**. Hence cannot be instantiated with **new** keyword.
* Subclass must implement the abstract method or declare itself as abstract.
* abstract classes can not be used to create object references.
* Member variables are inherited by subclasses.

## Types of Inheritance

<ImageComponent image-path='/java/core-java/inheritance-types.png'/>
