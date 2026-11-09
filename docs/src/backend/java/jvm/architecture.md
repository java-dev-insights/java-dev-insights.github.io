---
outline: [2,4]
---

# JVM Architecture

![JVM Architecture](https://miro.medium.com/v2/1*K2AmthJxslFa2-NwnT6zHw.png)

<OldImageComponent image-path='/java/jvm-architecture/jvm-architecture.png' />

![JVM architecture](https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2020/06/JVM-Model.jpg)

![JVM architecture](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bSYQtrFC2fiqybMszGhgow.png)

![How JVM works - bytebytego](https://substackcdn.com/image/fetch/$s_!S4We!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff4d477b4-f73d-47e6-a8f5-14c0fe4e8095_2484x3002.png)

![Runtime Memory Allocation](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*HWkfCG1q4DFsFfoF)

## JVM Components

| JVM Components           |                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Classloader              | used to load class files.                                                                                              |
| Class (Method) Area      | stores per-class structure. (runtime constant pool, field and method data, code for methods)                           |
| Heap                     | runtime data area where objects are allocated.                                                                         |
| Stack                    | stores call frames (local variables, partial results, method invocation and return).                                   |
| Program Counter Register | PC (program counter) register, Address of JVM instruction currently being executed.                                    |
| Native Method Stack      | contains all the native methods used in the application                                                                |
| Execution Engine.        | A virtual processor<br>Interpreter: Read bytecode stream then execute the instructions.<br>Just-In-Time (JIT) compiler |

![](https://miro.medium.com/v2/1*4bA0XMDs9x_3haGRwcUyyQ.png)


| Memory Area  | Shared or Per-Thread?  | What Lives There?                                                                                  |
| ------------ | ---------------------- | -------------------------------------------------------------------------------------------------- |
| Stack Memory | 👤 Per-Thread (Private) | Local primitive variables (int, boolean), method arguments, and reference pointers.                |
| Heap Memory  | 🌐 Shared (All Threads) | Actual instantiated objects (e.g., new Person()), instance variables, arrays, and the String Pool. |

## ClassLoader Subsystem

Responsible for locating and importing the binary data for classes.  
Activities are performed in a strict order:
1. **Loading**: finding and importing the binary data for a type.
2. **Linking**: performing verification, preparation, and (optionally) resolution
   - ***Verification***: ensuring the correctness of the imported type
   - ***Preparation***: allocating memory for class variables and initializing the memory to default values
   - ***Resolution***: transforming symbolic references from the type into direct references.
3. **Initialization**: invoking Java code that initializes class variables to their proper starting values.

<OldImageComponent image-path='/java/jvm-architecture/classloader-subsystem.png' />

### Loading

- Java run time system are independent of file systems because of classloaders.
- Java classes aren’t loaded into memory all at once, but when required by an application.
- Java ClassLoader is called by the JRE and these ClassLoaders load classes into memory dynamically.
- **A Java Classloader is of three types:**
  1. **BootStrap ClassLoader** : Primodial ClassLoader as native code for loading runtime classes.
  2. **Extension ClassLoader**
  3. **Application ClassLoader**

#### BootStrap ClassLoader

- Also know as **Primodial ClassLoader**, root of the JVM's class loader hierarchy.
- responsible for loading the core Java API and runtime classes (java.lang.*, java.util.*).
- Implemented in native code (such as C/C++) as part of the JVM core rather than as a Java object.
- Doesn’t have any parent ClassLoaders unlike standard Java class loaders (java.lang.ClassLoader subclasses).
- A Bootstrap Classloader is a Machine code which kickstarts the operation when the JVM calls it.
- Its job is to load the first pure Java ClassLoader.

**From where runtime classes are loaded for example java.lang.*, java.util.*?**

- These were from rt.jar till java 8
- From java 9, rt.jar was completely removed from the JDK. Core classes are now highly modularised.
- Now these reside inside the `java.base` module in `jimage` file.
- `${JAVA_HOME}/libs` --> `${JAVA_HOME}/lib/modules`

#### Extension ClassLoader

- Child of Bootstrap ClassLoader.
- Loads the extensions of core java classes from the respective JDK Extension library.
- It loads files from jre/lib/ext directory or any other directory pointed by the system property java.ext.dirs.

#### Application ClassLoader

- ***System ClassLoader***.
- child class of Extension ClassLoader.
- loads the Application type classes found in the environment variable CLASSPATH, -classpath or -cp command line option.

#### Classloader principles

- **Delegation**
  - ***ClassLoader Delegation Hierarchy Model*** `Application ClassLoader --> Extension ClassLoader --> Bootstrap ClassLoader`.
  - Bootstrap ClassLoader is always given the higher priority.
- **Visibility**
  - Application classloader can see the classes loaded by the parent classloaders but not vice-versa.
  - ClassNotFoundException at runtime.
- **Uniqueness**
  - Class loaded by the parent classloader should not be again loaded by the child classloader.

#### Static vs Dynamic Class Loading

- **Static class loading**
  - classes are statically loaded via the new operator.
  - initializes the object after loading it.
- **Dynamic class loading**
  - classes are programmatically loaded by using the Class.forName() or the loadClass() method.
  - only loads the class but doesn’t initialize the object.

<OldImageComponent image-path='/java/jvm-architecture/classloader-subsystem-loading.png' />

![](https://intexsoft.com/app/uploads/2019/10/jdk-2.jpg.webp)

![Clas Loader Delegation](https://miro.medium.com/v2/resize:fit:1400/1*IPT2B3l0va_NW-9MQEZEWg.png)

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTDVDJ4sJo1HkeebqzEGufZPKei1-xj9vTaVt0w3g5Q&s=10)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuojc8rPxAl3hAc9RK5fH01oWOg4U_LKHrTkS0T9q87vDgK-OtEmQzAEBXSFcPG6vDsywQlZPcG1QCgq4NDzLT0L_s5YbazDP4ZU6gDCVyhym2lUUewr78XDkC_fCxDCmrOgolHpoScA_X/w1200-h630-p-k-no-nu/java_classloader_hierarchy.PNG)

### Linking

- performs the linking of a class or an interface.
- Involves the allocation of new data structures, it may throw the ***OutOfMemoryError***.
- Performs the three important activities:
  - **Verification**
  - **Preparation**
  - **Resolution**

#### Verification

- process of checking the binary representation of a class
- verification performed by the Bytecode verifier
  - validating whether the generated .class file is valid or not.
  - throws **VerifyError**, if the generated .class file is not valid.

#### Preparation

- Process of assigning the memory for the class itself
- JVM allocates memory for class variables (static fields)
- initializes them to their default data type values (e.g., 0 for integers, false for booleans, null for object references).
- Your actual code-defined initial values (like public static int x = 42;) are not assigned yet.
  - At this stage, x is simply allocated memory and set to 0.
  - The assignment of 42 happens later during the Initialisation phase.

#### Resolution

Process of changing the **symbolic references** with the direct references (actual direct pointers or offsets to memory locations in method area).

### Initialization

- performs the final phase of the class loading.
- all the static variables are assigned the original values and the static blocks are executed in heirarchy starting from the parent to the child class.
- requires careful synchronization as JVM is multithreaded and some threads may try to initialize the same class or interface at the same time.

## JIT Compiler


> Read full article on [JIT Compiler](http://cavermartin.blogspot.com/2017/10/jit-compiler.html){target="_blank"}

- To improve the performance. 
- Compiles parts of byte code having similar functionality at same time reducing compilation-time.
- Compiler here refers to translator for instruction sets of JVM to that of a specific CPU.

<OldImageComponent image-path='/java/jvm-architecture/jit-compilation.jpg' />

> Above diagram is over simplified, JIT happens based on Profiler decision.

### How JIT Compilation Actually Triggers

Modern JVMs use Tiered Compilation to balance fast application startup times with peak runtime performance:

- ⏱️ **First Call (Interpretation)**: When a method is called for the first time, it is executed line-by-line by the JVM Interpreter. This allows the program to start running immediately without waiting for compilation.
- 📊 **Profiling via Counters**: As the interpreter runs the bytecode, the JVM maintains execution statistics using two main mechanisms:
  - Invocation Counter: Tracks how many times a specific method has been called.
  - Backedge Counter: Tracks how many times loops inside a method have iterated.
- 🔥 **Becoming a "Hot Spot"**: A method is only passed to the JIT compiler when the sum of these counters crosses a pre-defined threshold (often thousands of executions). Only when code is identified as a "hot spot" does the JIT compiler translate it into optimized native machine code.
- 🔄 **On-Stack Replacement (OSR)**: There is one exception where JIT kicks in during a method's very first execution. If a method is called once but contains a massive loop that runs millions of times, the JVM recognizes the loop as hot. The JIT compiler optimizes that loop on-the-fly and swaps it into memory mid-execution.

**Why the Diagram is Misleading?**

While the statement "and only if it's called" is true (the JVM will never waste resources compiling dead code that is never reached), the idea that it happens on the first call is a textbook myth.

Compiling everything on the first call would severely slow down application startup times and waste memory caching native code for methods that are only executed once.

## JNI (Java Native Interface)

The Java Native Interface (JNI) is a powerful framework in the JVM architecture that acts as a bridge between Java bytecode and native code written in languages like C, C++, or Assembly.

It allows Java programs to call native system-level libraries, and conversely, allows native applications to embed a JVM and interact with Java classes.

![JNI - Java Native Interface](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*wOxO2Yc_WAUu5N3F.png)

**Why is JNI Needed?**

Java is designed to be cross-platform and sandboxed via the JVM ("Write Once, Run Anywhere"). However, JNI is used when Java needs to break out of this sandbox for specific use cases:

- Hardware Access & OS Features: Interacting with underlying OS APIs, registry keys, file locks, or hardware drivers that Java's standard libraries don't expose.
- Legacy Code Integration: Reusing existing, battle-tested C/C++ libraries or native systems without completely rewriting them in Java.
- Performance Optimization: Offloading heavy, mathematically intensive computations (like graphics rendering, video processing, or cryptography) to low-level machine code.
