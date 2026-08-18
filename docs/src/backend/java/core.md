# Core Java


## Java’s Magic - The ByteCode

<ImageComponent image-path='/java/core-java/bytecode.png' />

- **Bytecode**
  - highly optimized set of instructions executed by JVM.
  - Java compiler creates bytecode rather than executable code.
- **JVM**
  - originally designed as an *interpreter for bytecode*.
  - JVM is implemented for each platform hence portability of bytecode.
- **JIT compiler**
  - selected portions of bytecode are compiled into executable code, on a piece-by-piece demand basis.
  - JIT compiles code as it is needed, during execution. 
  - Entire Java program not compile to executable code all at once, as various run-time checks happen.
  - Not all sequences of bytecode are compiled, only those that will benefit from compilation, remaining code is simply interpreted.

> Source code is compiled to JVM bytecode. This bytecode can immediately be interpreted by the JVM interpreter.  
> The interpreter also monitors how much each piece of bytecode is executed (run-time profiling) and hands off frequently executed code (the hot spots) to the just-in-time (JIT) compiler.

![bytecode to jvm](https://miro.medium.com/v2/0*jp6qfoiX-eX06AI9.png)

![JMV compile-interpret-jit](https://zhijunchen.com/wp-content/uploads/2021/04/JIT.png)

## PATH vs CLASSPATH

- **NoClassDefFoundError** and **ClassNotFoundException** both occur when class is not found at runtime.
- Due to incorrect/misconfigured CLASSPATH.

**PATH**
* JDK_HOME/bin added to PATH env variable. 
* can’t be overridden by any Java settings. 
* OS finds binary and command typed in shell. Example - java, javac.
* Windows - `set PATH=%PATH%; C:\Program Files\Java\JDK1.6.20\bin`
* UNIX/Linux - `export PATH = ${PATH}:/opt/Java/JDK1.6.18/bin`

**CLASSPATH**
* Used by classloader to find bytecodes stored as .class.
* Includes all directories with .class and JAR file required by your Java application.
* can be overridden by command line: -classpath or -cp to both "java" and "javac" or by using ClassPath attribute in Manifest file inside JAR archive.
* Windows - `set CLASSPATH = %CLASSPATH%;C:\ProgramFiles\Java\JDK1.6.20\lib`
* UNIX/Linux - `export CLASSPATH=${CLASSPATH}:/opt/Java/JDK1.6.18/lib`

::: details PATH vs CLASSPATH
![](https://media.licdn.com/dms/image/v2/C4D12AQHiknhmTKCylQ/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1625640687650?e=2147483647&v=beta&t=2sq_H-BLqPUbi6kZnr8KZjLKuWhyIowJ1dShNQd-sVY)
:::

### ClassNotFoundException
- Occurs when you try to load a class at runtime using Class.forName() or loadClass() methods and requested classes are not found in classpath.
- This is a checked Exception derived from java.lang.Exception class and you need to provide explicit handling for it.
- Common Scenario - We try to run application without updating classpath with JAR files.
- This exception also occurs when you have two class loaders and if a ClassLoader tries to access a class which is loaded by another classloader in Java.
- **Java ClassLoader** is a part of Java Runtime Environment that dynamically loads Java classes in JVM(Java Virtual Machine). The Java Runtime System does not need to know about files and files system because of classloaders.

### NoClassDefFoundError
- Occurs when class was present during compile time and program was compiled and linked successfully but class was not present during runtime.
- It is error which is derived from **LinkageError**.
  - Linkage error occurs when a class has some dependencies on another class and latter class changes after compilation of former class.
  - NoClassFoundError is the result of implicit loading of class because of calling a method or accessing a variable from that class.
- This error is more difficult to debug and find the reason why this error occurred. So in this case you should always check the classes which are dependent on this class.

### ClassNotFoundException Vs NoClassDefFoundError
- ClassNotFoundException is an exception while NoClassDefFoundError is an error.
- ClassNotFoundException occurs when classpath does not get updated with required JAR files while NoClassDefFoundError error occurs when required class definition is not present at runtime.

## Public vs Private JRE Folder

**JRE** environment, bunch of directories with Java-related files:
- /bin - executable programs java and javaw
- /lib - supporting files: jars, config files, property files, fonts, sounds, icons etc. 
  - most important is **rt.jar** containing "java API".

<ImageComponent image-path='/java/core-java/public-vs-private-jre.png' />

* JDK installation brings private JRE and optionally a public copy.
* **private JRE**
	- is required to run the tools included with the JDK and have no registry settings.
	- is contained entirely in a jre directory whose location is known only to the JDK. 
* **public JRE**
	- used by other Java apps, outside the JDK 
	- it is registered with the Windows registry (at HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft), 
	- can be removed using Add/Remove Programs, 
	- might be registered with browsers, 
	- might have the java.exe file copied to the Windows system directory.
	- (C:\Program Files\Java\jre1.7.0)

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
* **main()** - simply a starting place for your program, in some cases not needed example – web apps.
:::

## Datatypes

### Identifiers

* **valid identifiers** - AvgTemp, count, a4, $test, this_is_ok
* **Invalid identifier** - 2count, high-temp, Not/ok
* **Java Keywords**: 50 keywords, cannot be used as identifiers.
	- There are also some reserved keywords but not used, example - const and goto.

|identifiers|||||
|---|---|---|---|---|
package     | import 	| 
interface   | abstract  | class     | extends   | implements    |
private 	| default   | protected | public    | 
final       | static    | transient | volatile  | synchronized  |
return      | new       | void      | 
if          | else      | switch    | case      |
do          | while     | for       | continue  | break         |
short       | byte      | int       | long      | double        |
boolean     | strictfp  | float     | char      |
try         | catch     | finally   | throw     | throws        |
assert      | const 	| instanceof|
this        | super
goto 		| native 	| enum      |

