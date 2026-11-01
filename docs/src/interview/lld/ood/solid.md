# SOLID Principles

<ImageComponent image-path='/java/oop-and-ood/solid.png' />

- **Single Responsibility Principle**
  - A class should always have only one reasonability.
- **Open Closed Principle**
  - Software components should be open for extension, but closed for modification.
  - Goal - Adding new functionality only than your code should be tested.
- **Liskov Substitution Principle**
  - Derived types must be completely substitutable for their base types.
  - Derived class or subclass must enhance functionality, but not reduce them.
  - Example - Square is a Rectangle.
- **Interface Segregation Principle**
  - Clients should not be forced to implement unnecessary methods which they will not use.
- **Dependency Injection or Inversion**
  - Depends on Abstraction, not on concretion.
  - Don't ask for dependency it will be provided to you by the framework. (Spring framework)
  - Makes it easy to test with mock objects as object creation code is centralized  in the framework.
