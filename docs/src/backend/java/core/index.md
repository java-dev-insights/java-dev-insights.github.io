# Core Java

## Java Buzzwords

* ***Object-Oriented*** - Object model is easy to extend, while primitive types are kept as high-performance non-objects.
* ***Multithreaded*** - supports multithreaded programming.
* ***Architecture-Neutral*** – portability. OS/Processor/Core upgrades don’t affect the code. (“Write once; run anywhere, forever”.)
* ***Robust*** - Strictly typed language (compile and run-time checks). 
* ***Interpreted, High Performance and cross-platform*** - compiled to bytecode, JVM implementation executes it.
* ***Distributed*** - designed for distributed env as it handles TCP/IP protocols, supports Remote Method Invocation (RMI).

::: details What are the main reasons for Program Failure?
* **Memory Management** - Java manages memory allocation/deallocation (deallocation fully automatic, by garbage collector).
* **Exception Handling** - such as division by zero, “file not found,”. These run-time errors should be managed by program.
:::

::: details Why Java Doesn’t Support Pointers?
* They provide illegal access of data (exact address of the data) and arithmetic operation can be done on it.
* Due to leading lack of security pointers concept was removed from java.
* reference variables are used to avoid illegal access. It prints **packagename.classname@hexadecimal** rather than address.
* JVM implicitly does all pointer related manipulations and only references are used by the program.
* Pointers would have made garbage collection impossible.
* **main()** - simply a starting place for your program, in some cases not needed. For example – web apps.
:::
