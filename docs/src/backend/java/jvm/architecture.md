# JVM Architecture

![JVM Architecture](https://miro.medium.com/v2/1*K2AmthJxslFa2-NwnT6zHw.png)

<OldImageComponent image-path='/java/jvm-architecture/jvm-architecture.png' />

![JVM architecture](https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2020/06/JVM-Model.jpg)

![JVM architecture](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bSYQtrFC2fiqybMszGhgow.png)

![How JVM works - bytebytego](https://substackcdn.com/image/fetch/$s_!S4We!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff4d477b4-f73d-47e6-a8f5-14c0fe4e8095_2484x3002.png)

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
