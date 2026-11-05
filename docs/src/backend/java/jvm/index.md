# JVM Internals

## JVM Internals Includes?

What falls under "JVM Internals"?

If you are studying JVM Internals, you will look at both the structure (architecture) and the deep operational mechanics:

- The Architecture (The Structure): Understanding where memory is allocated (Heap vs. Stack) and what components exist.
- Garbage Collection Mechanics (The Behavior): How specific algorithms (like G1, ZGC, or Shenandoah) mark, sweep, and compact memory.
- JIT Compilation & Optimization (The Behavior): How the execution engine uses tiered compilation, method inlining, and escape analysis to speed up code.
- Thread Synchronization (The Behavior): How monitors, locks, and biased locking operate at the CPU and OS level.
- Bytecode Engineering (The Behavior): How instructions (like invokevirtual or invokedynamic) alter the program counter register.


## JVM - Java Virual Machine

An abstract computing machine to run a Java program.

**JVM Notions**

- Specification - documented requirement of JVM implementation to ensure inter-operability.
- Implementation - computer program that meets the requirements of the JVM specification.
- Instance - an implementation running in a process that executes a computer program compiled into bytecode.

**What JVM does?** : Loads, Verifies, execute code and Provides runtime environment.  

**JVM provides definitions for?** Memory area, Class file format, Register set, Garbage-collected heap, Fatal error report etc.

| JVM Components |                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Compiler       | Translate human readable source code in to computer-executable machine code.                       |
| Interpreter    | Translates the instructions into an intermediate form, which it then executes.                     |
| Linker         | Combines object modules to form an executable program, done by the linker. Linking function calls. |
| Loader         | Copies programs from a storage device to the main memory, where they can be executed.              |
