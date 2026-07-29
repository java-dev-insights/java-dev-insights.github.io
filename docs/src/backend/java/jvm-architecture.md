# JVM Internals

What falls under "JVM Internals"?

If you are studying JVM Internals, you will look at both the structure (architecture) and the deep operational mechanics:

- The Architecture (The Structure): Understanding where memory is allocated (Heap vs. Stack) and what components exist.
- Garbage Collection Mechanics (The Behavior): How specific algorithms (like G1, ZGC, or Shenandoah) mark, sweep, and compact memory.
- JIT Compilation & Optimization (The Behavior): How the execution engine uses tiered compilation, method inlining, and escape analysis to speed up code.
- Thread Synchronization (The Behavior): How monitors, locks, and biased locking operate at the CPU and OS level.
- Bytecode Engineering (The Behavior): How instructions (like invokevirtual or invokedynamic) alter the program counter register.

## JDK vs JRE vs JVM

- **JVM**
  - virtual machine that run the Java bytecodes.
  - **Class loader system** + **runtime data area** + **Execution Engine**
- **JRE**
  - Environment where Java programs runs.
  - [**JVM** + **Java Packages Classes (util, math, lang etc)** + **runtime libraries**]
- **JDK**
  - **JRE** + **Development/debugging tools**
  - (Java compiler javac in its /bin) and tools (ex. javaDoc, debugger)

What to use when?

- For running Java programs on browser/computer you will only install JRE.
- For development JDK is required.
- If you are deploying a WebApp with JSP, JDK is required as JSP is converted into Servlets by compilation.

<ImageComponent image-path='/java/jvm-architecture/jdk-jre-jvm.png' />

|Components |                                                                                                   |
|---        |---                                                                                                |
|Compiler   |Translate human readable source code in to computer-executable machine code.                       |
|Interpreter|Translates the instructions into an intermediate form, which it then executes.                     |
|Linker     |Combines object modules to form an executable program, done by the linker. Linking function calls. |
|Loader     |Copies programs from a storage device to the main memory, where they can be executed.              |

![](https://intexsoft.com/app/uploads/2019/10/jdk-1.jpg.webp)

## JVM - Java Virual Machine

An abstract computing machine to run a Java program.

**JVM Notions**

- Specification - documented requirement of JVM implementation to ensure inter-operability.
- Implementation - computer program that meets the requirements of the JVM specification.
- Instance - an implementation running in a process that executes a computer program compiled into bytecode.

**What JVM does?** : Loads, Verifies, execute code and Provides runtime environment.  
**JVM provides definitions for?** Memory area, Class file format, Register set, Garbage-collected heap, Fatal error report etc.

### JVM Architecture

<ImageComponent image-path='/java/jvm-architecture/jvm-architecture.png' />

![JVM architecture](https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2020/06/JVM-Model.jpg)

![JVM architecture](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bSYQtrFC2fiqybMszGhgow.png)

![How JVM works - bytebytego](https://substackcdn.com/image/fetch/$s_!S4We!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff4d477b4-f73d-47e6-a8f5-14c0fe4e8095_2484x3002.png)

### JVM Components

|JVM Components				|		                                                                                                                |
|---						|---	                                                                                                                |
|Classloader				|used to load class files.                                                                                              |
|Class (Method) Area		|stores per-class structure. (runtime constant pool, field and method data, code for methods)                           |
|Heap						|runtime data area where objects are allocated.                                                                         |
|Stack						|stores call frames (local variables, partial results, method invocation and return).                                   |
|Program Counter Register	|PC (program counter) register, Address of JVM instruction currently being executed.                                    |
|Native Method Stack		|contains all the native methods used in the application                                                                |
|Execution Engine			|A virtual processor<br>Interpreter: Read bytecode stream then execute the instructions.<br>Just-In-Time (JIT) compiler |

### ClassLoader Subsystem

Responsible for locating and importing the binary data for classes.  
Activities are performed in a strict order:
1. **Loading**: finding and importing the binary data for a type.
2. **Linking**: performing verification, preparation, and (optionally) resolution
   - ***Verification***: ensuring the correctness of the imported type
   - ***Preparation***: allocating memory for class variables and initializing the memory to default values
   - ***Resolution***: transforming symbolic references from the type into direct references.
3. **Initialization**: invoking Java code that initializes class variables to their proper starting values.

<ImageComponent image-path='/java/jvm-architecture/classloader-subsystem.png' />

#### 1. Loading
- Java run time system are independent of file systems because of classloaders.
- Java classes aren’t loaded into memory all at once, but when required by an application.
  - Java ClassLoader is called by the JRE and these ClassLoaders load classes into memory dynamically.

**A Java Classloader is of three types:**
1. **BootStrap ClassLoader**
   - **Primodial ClassLoader**.
     - loads classes from the location rt.jar.
     - doesn’t have any parent ClassLoaders.
   - A Bootstrap Classloader is a Machine code which kickstarts the operation when the JVM calls it.
   - It is not a java class.
   - Its job is to load the first pure Java ClassLoader.
2. **Extension ClassLoader**
   - Child of Bootstrap ClassLoader 
   - Loads the extensions of core java classes from the respective JDK Extension library.
   - It loads files from jre/lib/ext directory or any other directory pointed by the system property java.ext.dirs.
3. **Application ClassLoader**
   - ***System ClassLoader***.
   - child class of Extension ClassLoader.
   - loads the Application type classes found in the environment variable CLASSPATH, -classpath or -cp command line option.

**Classloader principles**
- **Delegation**
  - ***ClassLoader Delegation Hierarchy Model*** `Application ClassLoader --> Extension ClassLoader --> Bootstrap ClassLoader`.
  - Bootstrap ClassLoader is always given the higher priority.
- **Visibility**
  - Application classloader can see the classes loaded by the parent classloaders but not vice-versa.
  - ClassNotFoundException at runtime.
- **Uniqueness**
  - Class loaded by the parent classloader should not be again loaded by the child classloader.

<ImageComponent image-path='/java/jvm-architecture/classloader-subsystem-loading.png' />

![](https://intexsoft.com/app/uploads/2019/10/jdk-2.jpg.webp)

**Static vs Dynamic Class Loading**
- **Static class loading**
  - classes are statically loaded via the new operator.
  - initializes the object after loading it.
- **Dynamic class loading**
  - classes are programmatically loaded by using the Class.forName() or the loadClass() method.
  - only loads the class but doesn’t initialize the object.

#### 2. Linking

- performs the linking of a class or an interface.
- Involves the allocation of new data structures, it may throw the ***OutOfMemoryError***.
- Performs the three important activities:
  - **Verification**
    - process of checking the binary representation of a class
    - validating whether the generated .class file is valid or not.
    - performed by the Bytecode verifier and if the generated .class file is not valid, a **VerifyError** is thrown.
  - **Preparation**
    - process of assigning the memory for the class level or interface level static variables and assigns the default values.
  - **Resolution**
    - process of changing the symbolic references with the original memory references from the method area.

#### 3. Initialization

- performs the final phase of the class loading.
- all the static variables are assigned the original values and the static blocks are executed from the parent to the child class.
- requires careful synchronization as JVM is multithreaded and some threads may try to initialize the same class or interface at the same time.

### JIT Compiler

> Read full article on [JIT Compiler](http://cavermartin.blogspot.com/2017/10/jit-compiler.html){target="_blank"}

- To improve the performance. 
- Compiles parts of byte code having similar functionality at same time reducing compilation-time.
- Compiler here refers to translator for instruction sets of JVM to that of a specific CPU.

<ImageComponent image-path='/java/jvm-architecture/jit-compilation.jpg' />

### JNI (Java Native Interface)

![JNI - Java Native Interface](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*wOxO2Yc_WAUu5N3F.png)

## How Java Code Runs

<ImageComponent image-path='/java/jvm-architecture/how-java-code-runs.png' />

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*HWkfCG1q4DFsFfoF)

## JMM - Java Memory Model

JVM Heap memory is divided into two parts – Young Generation and Old Generation.

<ImageComponent image-path='/java/jvm-architecture/java-memory-model.png' />
<ImageComponent image-path='/java/jvm-architecture/jmm-diagram.png' />

### Young Generation

**Eden Memory** and **two Survivor Memory spaces (S0 and S1)**

- **Eden Memory**
  - Most of the newly created objects.
  - **Minor GC** is performed when Eden space is filled and survivor objects are moved to S0.
  - Minor GC also checks S0 and move them to S1.
  - So, at a time one of the survivor space is always empty.
- Objects that survived after many cycles of GC, are moved to the Old generation memory space.
- A threshold is set for the age of the young generation objects to become eligible for promotion to Old generation is called the `Tenuring Threshold`.
  - Default Value: 15 for most modern garbage collectors like G1 and Parallel.
  - Adaptive Nature: JVM dynamically adjusts the actual threshold at runtime based on memory usage.
  - `-XX:MaxTenuringThreshold=n` : Upper limit for the threshold (the maximum allowed value is 15 because the object age is stored using 4 bits in the object header).
  - `-XX:InitialTenuringThreshold=n`

### Old Generation

- Contains objects that are long lived and survived after many rounds of Minor GC. 
- Usually garbage collection is performed in Old Generation memory when it’s full.
- Old Generation Garbage Collection is called **Major GC** and usually takes longer time.

### Stop the World Event

- All the Garbage Collections are “Stop the World” events as all application threads are stopped until operation completes.
- Minor GC is very fast and the application doesn’t get affected by this.
- Major GC takes longer time because it checks all the live objects, hence should be minimized.
- Duration taken by garbage collector depends on the strategy used for garbage collection.
  - That’s why it’s necessary to monitor and tune the garbage collector to avoid timeouts in the highly responsive applications.

![types of GC](https://cdn-fiejl.nitrocdn.com/yNfvfiSxoeXhsQRaJFUuQCCZqugXTTRV/assets/images/optimized/rev-e8df70d/www.eginnovations.com/blog/wp-content/uploads/2023/07/types-of-garbage-collection.webp){width="400px"}

### Perm Gen or Method Area

- Not a part of Java Heap memory.
- Populated by JVM at runtime based on the classes used by the application.
  - contains Java SE library classes and methods.
  - stores class structure (runtime constants and static variables) and code for methods and constructors.
- Perm Gen objects are garbage collected in a full garbage collection.
- **Memory Pool**
  - Created by JVM memory managers to create a pool of immutable objects, if implementation supports it.
  - String Pool is a good example of this kind of memory pool.
  - Memory Pool can belong to Heap or Perm Gen, depending on the JVM memory manager implementation.
- **Runtime Constant Pool**
  - Runtime constant pool is per-class runtime representation of constant pool in a class.
  - It contains class runtime constants and static methods.
  - Runtime constant pool is the part of method area.
- **Java Stack Memory**
  - Java Stack memory is used for execution of a thread.
  - contain method specific values that are short-lived and references to other objects on the heap referred from method.

### Where static variables are stored from Java 8

- **Java 7**
  - static variables were stored in the permgen space.
  - PermGen Space is also known as Method Area
  - PermGen Space used to store 3 things
    - Class level data (meta-data)
    - interned strings(String Pool)
    - static variables
- **From Java 8 onwards**
  - ***static variables are stored in the Heap itself.***
  - PermGen Space is removed and new space, **MetaSpace** is introduced which is not the part of Heap any more.
  - MetaSpace is present on the native memory
    - memory provided by the OS to a particular Application for its own usage
  - MetaSpace - class meta-data and string pool

<ImageComponent image-path='/java/jvm-architecture/jmm-java8.png' />
![](https://intexsoft.com/app/uploads/2019/10/jdk-4.jpg.webp)

### Java Heap Memory Switches

- Java provides a lot of memory switches that we can use to set the memory sizes and their ratios.
- Some of the commonly used memory switches are:

|VM SWITCH            |VM SWITCH DESCRIPTION |
|---                  |---|
|-Xms                 |initial heap size when JVM starts|
|-Xmx                 |maximum heap size.|
|-Xmn                 |size of the Young Generation, rest of the space goes for Old Generation.|
|-XX:PermGen          |initial size of the Permanent Generation memory|
|-XX:MaxPermGen       |maximum size of Perm Gen|
|-XX:MetaspaceSize    ||
|-XX:MaxMetaspaceSize ||
|-XX:SurvivorRatio	  |ratio of Eden space and Survivor Space<br>Young Generation=10m with VM switch -XX:SurvivorRatio=2 then 5m will be reserved for Eden Space and 2.5m each for both the Survivor spaces. The default value is 8.|
|-XX:NewRatio	        |For providing ratio of old/new generation sizes. The default value is 2.|
|MinMetaspaceFreeRatio<br>MaxMetaspaceFreeRatio	|minimum percentage of class metadata capacity free after **garbage collection**|

<ImageComponent image-path='/java/jvm-architecture/heap-memory-switches.png' />

<ImageComponent image-path='/java/jvm-architecture/heap-memory-switches-generation.png' />
