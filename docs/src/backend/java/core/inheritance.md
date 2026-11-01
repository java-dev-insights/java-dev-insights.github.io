# Inheritance


<ImageComponent image-path='/java/core-java/inheritance.png' />'

* For hierarchical classifications. 	
* superclass and subclass.
* extends keyword.  class B extends A {}
* No multiple inheritance - diamond problem. 
* No class can be a superclass of itself.

## Member Access and Inheritance 
* subclass cannot access **private** members of superclass.
* superclass reference variable can point to to subclass object.
* ***type of reference variable, not the object, determines what members can be accessed.***
* Can access only those member var of object that are defined by the superclass.

## super Keyword
* To refer immediate superclass. 
* To access superclass member vars hidden in subclass.
* Call superclass’ constructor - **super() must always be the first statement in subclass constructor**.
* ***In a class hierarchy, constructors execute in order of derivation, from superclass to subclass***. 
* If super() is not used, then the default or parameterless constructor of each superclass will be executed.

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
