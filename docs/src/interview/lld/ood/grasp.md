# GRASP

General Responsibility Assignment Software Patterns

- GRASP tends to take a responsibility focus, like who creates this object, who is in charge of how these objects talk to each other, who takes care of passing all messages received from a user interface?  etc.
- Now SOLID and GRASP don’t conflict with each other, they are not competing sets, you might choose to use one or both or neither.

|GRASP                  |           |   |
|---                    |---        |---|
|Information Expert     |Problem    |What is a basic principle by which to assign responsibilities to objects?|
|                       |Solution   |Assign responsibility to the class that has the information needed to fulfill it.|
|                       |Example    |Cutomer and Order class, Order should get list of all the orders placed by the customer|
|Creator                |Problem    |Who creates object A?|
|                       |Solution   |class B, if it has the initializing information (4 questions)|
|                       |Example    |Factory Design Pattern|
|Controller             |Problem    |Who should be responsible for handling an input system event?|
|                       |Solution   |use case controller to deal with all system events of a use case. Create/Delete User can have  UserController, instead of two separate use case controllers.|
|                       |Example    |Model View Controller (MVC)|
|Indirection            |Problem    |Where to assign responsibility, to avoid direct coupling between two (or more) things? How to de-couple objects so that low coupling is supported and reuse potential remains higher?|
|                       |Solution   |Assign the responsibility to an intermediate object to mediate between other components or services so that they are not directly coupled.|
|                       |Example    |Introduction of a controller component for mediation between data (model) and its representation (view) in the model-view control pattern. This ensures that coupling between them remains low.|
|Low Coupling           |           |lower dependency between the classes, change in one class having a lower impact on other classes.|
|High Cohesion          |           |Have a class that has relevant and focused responsibilities|
|Polymorphism           |Problem    |How to handle alternatives based on type? How to create pluggable software components?|
|                       |Solution   |When related alternatives or behaviors vary by type (class), assign responsibility for the behavior—using polymorphic operations—to the types for which the behavior varies.|
|Protected Variations   |Problem    |How to design objects, subsystems, and systems so that the variations or instability in these elements does not have an undesirable impact on other elements?|
|                       |Solution   |Identify points of predicted variation or instability; assign responsibilities to create a stable interface around them.|
|Pure Fabrication       |           |A class that does not represent a concept in the problem domain, specially made up to achieve low coupling, high cohesion|

***Creator***

You try to answer these 4 question:
- Who is responsible for creating the objects?, or, how those objects are created in the first place?
- Does one object contain another (composition relationship)?
- Does one object very closely use another, 
- Will one object know enough to make another object?

***Low Coupling***

- Coupling is a measure of how strongly one element is connected to, has knowledge of, or relies on other elements.
- lower dependency between the classes,
- change in one class having a lower impact on other classes,
- higher reuse potential.
- Now low coupling does not mean no coupling. Objects do need to know about each other, but as much as possible they should do what they can with the minimum of dependencies.

***High Cohesion***

- The more you have a class that has relevant and focused responsibilities, the higher cohesion you will have.
- You try to make the responsibilities of your classes relevant, related as much as you can.
- You may need to break a class into some classes and distribute the responsibilities, instead of having a single class that does everything.

***Polymorphism***

- Having an object that can take the shape of several different objects. This allows us to trigger the correct behavior.
- If, for example, we have an interface that’s implemented by several classes, you can assign or pass an instance of any of the sub classes to a reference variable that has the interface as it’s type. This will allow you to trigger the right methods, for the implementing class.

***Protected Variations***

- How to design a system so that changes and variations have the minimum impact on what already exists.
- Identify the parts of the system that are more likely to change, separate them from what stays the same, and then, encapsulate every part that vary in the system.
- Most of the concepts we have been exploring are simply way of doing this, things like encapsulation and data-hiding, making your attributes private.
- Interfaces are another area where we can wrap the unstable parts with an interface, and using polymorphism to create various implementations of this interface.
- The Liskov substitution principle, where the child classes should always work when treated as their parent classes is another way.
- The open/closed principle that we can add, but we try not to change code that works already is yet another.

***Pure Fabrication***

- What if there’s something that needs to exist in the application that doesn’t announce itself as an obvious class or real-world object?. What if you have behavior that doesn’t naturally fit in existing classes?
- Well, rather than force that behavior into an existing class where it doesn’t belong, which means we are decreasing cohesion, we instead invent, we fabricate a new class.
- That class might not have existed in our conceptual model, but it needs to exist now. And there’s nothing wrong with creating a class that represents pure functionality as long as you know why you’re doing it.
- A pure fabrication is a class that does not represent a concept in the problem domain, specially made up to achieve low coupling, high cohesion, and the reuse potential thereof derived (when a solution presented by the information expert pattern does not). This kind of class is called a "service" in domain-driven design.
