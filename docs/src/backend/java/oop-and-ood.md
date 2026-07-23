# OOP, OOD and SOLID

## Object Oriented Programming (OOP)

```txt
PROGRAMMING PARADIGM :   Computer Program = code + data.
```

<ImageComponent image-path='/java/oop-and-ood/oops-concept.jpg' />

- **Class**
  - Templates for creating objects. (Logical Entity)
  - Define custom data types and its methods.
- **Object**
  - Entity with state and behaviour.
  - Memory is allocated.
  - example: chair, pen, table etc. (physical or logical).
- **Inheritance**
  - Parent Child concept, child acquires properties and behaviour of parent object.
  - Used for runtime polymorphism.
- **Abstraction**
  - Concept of hiding internal details and describing in simple terms.
  - Achieved by encapsulation and inheritance.
- **Encapsulation**
  - Wrapping code and data into single unit just like a capsule.
  - access restriction to class members and methods.
  - Achieved by access-modifiers (private, protected, public).
- **Polymorphism**
  - Concept where an object behaves differently in different situations.
  - ***Compile time polymorphism***
    - Method overloading (same name but different arguments)
    - when we have `“IS-A” relationship` between objects.
    - Working in terms of superclass, actual implementation class decided at runtime.
  - ***Runtime polymorphism***
    - Method overriding or dynamic method dispatch (subclass override superclass method)
- **Association**
  - Defines the multiplicity between independent objects. (One-To-Many)
  - **Aggregation**
    - `HAS-A relationship` with ownership, employee has an address.
    - Exist on its own.
  - **Composition**
    - More restrictive form of aggregation, `HAS-A relationship` but can’t exist on its own.
    - Example - House has-a Room. Here room can’t exist without house.

### Object-oriented vs Object-based programming language?

* Object based programming language --> OOP except Inheritance.
* Example = JavaScript and VBScript.

### Object-oriented vs Process-oriented

|Object-oriented programming                        |Process-oriented model|
|---|---|
|Program around “who is being affected” (data).     |Program around “what is happening” (code).|
|Data controlling access to code.                   |Characterizes program as a series of linear steps (code).|
|easier development and maintenance                 |Problems when programs grow larger and more complex.|
|can simulate real-world event more effectively.    |Such emulation not easy.|
|Eg. Java, .Net etc.                                |Procedural languages such as C (code acting on data)|

### Why Java is not a purely Object-Oriented Language?
No, Java is not purely Object Oriented due to following points :
- ***static keyword*** :  When we declare a class as static then it can be used without the use of an object in Java.
- **Primitive Data Type** : Even wrapper uses primitives for operations via autoboxing and unboxing.

Pure Object-Oriented Language has *strictly* all of the following features :
- Abstraction
- Encapsulation/Data Hiding
- Inheritance
- Polymorphism
- All predefined types are objects
- All user defined types are objects
- All operations on objects by exposed methods only.

```java
public class OuterClass {
    private static String outerStaticMsg = "Hello from Outer!";
    private static int outerStaticInt = 1;
    private String outerInstanceMsg = "Instance Data";

    // Static nested class
    public static class StaticNestedClass {
        public void display() {
            // Can access static members of the outer class
            outerStaticInt++;
            System.out.println(outerStaticMsg); 
            
            // ERROR: Cannot access non-static fields directly
            // System.out.println(outerInstanceMsg); 
        }
    }
}
```
