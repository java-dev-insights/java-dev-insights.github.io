# Delegation principles

- Don't do all stuff by yourself,  delegate it to the respective class.
- Example - [equals() and hashCode() method in Java](http://javarevisited.blogspot.com/2011/02/how-to-write-equals-method-in-java.html).
  - To compare two objects for equality, we ask the class itself to do comparison instead of Client class doing that check.
  - The key benefit of this design principle is no duplication of code and pretty easy to modify behavior.


## Encapsulate What Changes

- encapsulate the code you expect or suspect to be changed in future.
- It's easy to test and maintain proper encapsulated code.
- Making variable and methods private by default and increase access step by step e.g. from private to protected and not public.
- Example - Factory design pattern encapsulates object creation code and provides flexibility to introduce a new product later with no impact on existing code.

## Composition over Inheritance

- Always favor composition over inheritance, if possible. Composition is a lot more flexible than Inheritance.
- Composition allows changing the behavior of a class at run-time by setting property during run-time and by using Interfaces to compose a class.
  - We use polymorphism which provides flexibility to replace with better implementation any time.

<ImageComponent image-path='/java/oop-and-ood/composition-vs-inheritance.png' />

## Programming for Interface not implementation

* Always ***program for the interface and not for implementation*** this will lead to flexible code which can work with any new implementation of the interface.
* So use interface type on variables, return types of method or argument type of methods in Java.

<ImageComponent image-path='/java/oop-and-ood/intercepting-filter-pattern.png' />

<ImageComponent image-path='/java/oop-and-ood/intercepting-filter-pattern-class-diagram.png' />

## Code Smell

- Code Smells are a great term for when reading code, the code may be valid, it may work, but there is something about it that just doesn’t smell right.
- It’s often a clue, a warning sign of a deeper problem, that there is a part in the code indicates violation of fundamental design principles and negatively impact design quality.

And here are just a few examples of what we mean by a code smell.

- **Long Method** - One would be the idea of a long method. We open up a method to read it, it has got many lines. This is the kind of thing that really needs to be split up into much smaller methods.
- **Identifiers** - Working with very short or very long identifiers. Aside from using letters like ‘i’ for indexes and iteration, we shouldn’t be expecting to see variables called A and B and C in real code.
- **Comments** - Another clue would be pointless comments. Yes, code should be commented and code should be well-written so that it’s readable and the code comments itself. We do want comments, but we don’t want comments where the comment is actually longer than the code that it’s describing.
- **The God Object** - This is where you have one master object that tries to do everything in the program, or at least one object that seems to be doing very different responsibilities that have nothing to do with each other.It’s a clue that this needs to be revisited and broken apart into the right kind of objects.
- **Feature Envy** - And then there’s feature envy. If a class seems to do very little except it uses all the methods of one other class, it’s another sign that you need to rethink the roles of one or the other.
