# Java Memory Model

## JMM

The Java Memory Model (JMM) is a specification that defines how threads interact through memory and outlines the rules for visibility, ordering, and synchronization.

![](https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F723oakphakimggw5g54g.png)

### JVM vs JMM

- JVM Architecture is the physical and logical blueprint of the Java Virtual Machine (including class loaders, memory areas, and execution engines).
- JMM (Java Memory Model) is a specification that defines how threads interact through computer memory, guaranteeing visibility and ordering of data.

### Core Concepts

- `Visibility`: Ensures that changes made to variables by one thread become visible to other threads.
- `Happens-Before Relationship`: A set of rules (using synchronized, volatile, or Thread.start()) that order operations across threads.
- `Instruction Reordering`: Restricts how the CPU or JIT compiler can shuffle instructions to maintain program correctness in concurrent execution.

### JMM vs. JVM Memory Structure

A common point of confusion is mixing up the Java Memory Model with Java Memory Management (the structural layout of Heap, Stack, and Metaspace).

- Memory Management defines where data lives (e.g., local variables live on the Stack; objects live on the Heap).
- The JMM defines how data moves and synchronization guarantees across threads.

![](https://training.xceptance.com/java/images/jmm-vs-computer.svg)
![](https://jenkov.com/images/java-concurrency/java-memory-model-5.png)

