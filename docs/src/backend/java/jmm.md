# Java Memory Model

## JVM vs JMM

JVM Architecture is the physical and logical blueprint of the Java Virtual Machine (including class loaders, memory areas, and execution engines),  
while the JMM (Java Memory Model) is a specification that defines how threads interact through computer memory, guaranteeing visibility and ordering of data.

### Core Concepts
- Visibility: Ensures that changes made to variables by one thread become visible to other threads.
- Happens-Before Relationship: A set of rules (using synchronized, volatile, or Thread.start()) that order operations across threads.
- Instruction Reordering: Restricts how the CPU or JIT compiler can shuffle instructions to maintain program correctness in concurrent execution.
