# JVM Memory Management

Physical map used for Java Memory Management and Garbage Collection.

## Heap Memory

JVM Heap memory is divided into two parts – Young Generation and Old Generation.

<OldImageComponent image-path='/java/jvm-architecture/java-memory-model.png' />
<OldImageComponent image-path='/java/jvm-architecture/jmm-diagram.png' />

### Young Generation

**Eden Memory** and **two Survivor Memory spaces (S0 and S1)**

- **Eden Memory** : Most of the newly created objects.
- **Minor GC** is performed when Eden space is filled and survivor objects are moved to S0.
  - Minor GC also checks S0 and move them to S1.
  - So, at a time one of the survivor space is always empty.
- Objects that survived after many cycles of GC, are moved to the Old generation memory space.
- `Tenuring Threshold` : A threshold is set for the age of the young generation objects to become eligible for promotion to Old generation.
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

![Types of GC](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RGldr9pX3NLlRRLCg51Co8fVWxrSIdvg14m50HkPxWaG3YZjE5Fq1x0&s=10)

![](https://media.geeksforgeeks.org/wp-content/uploads/20230526124825/Serial-GC.png)

![](https://miro.medium.com/v2/resize:fit:1400/0*LReZE-39GlXDY3c5)
![](https://miro.medium.com/v2/resize:fit:1400/1*ncg-bI8FhTwAu60e6cJEbg.png)

## Method Area (Perm Gen)

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

<OldImageComponent image-path='/java/jvm-architecture/jmm-java8.png' />
![](https://intexsoft.com/app/uploads/2019/10/jdk-4.jpg.webp)

