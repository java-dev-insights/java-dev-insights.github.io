# Garbage Collection

- Process to identify and remove the unused objects from memory and free up the space.
- Java has **automatic garbage collection**.
- **Garbage Collector** is the background program that looks for unreferenced objects, which are deleted to reclaim memory.
- Garbage collection involves three steps:
  - **Marking** – identifies objects not in use.
  - **Normal Deletion** - removes the unused objects and reclaim the free space.
  - **Deletion with Compacting** - For better performance, all survived objects moved together.

Problems with simple mark and delete approach.
- Not efficient, because most of the newly created objects will become unused.
- Objects that are in-use for multiple garbage collection cycle are most likely to be in-use for future cycles too.

Due to these problems, **Java Garbage Collection is Generational**.  
We have **Young Generation** and **Old Generation** spaces in the heap memory.

## GC flow diagram

![](https://media.geeksforgeeks.org/wp-content/uploads/20230526124825/Serial-GC.png)

![](https://miro.medium.com/v2/resize:fit:1400/0*LReZE-39GlXDY3c5)
![](https://miro.medium.com/v2/resize:fit:1400/1*ncg-bI8FhTwAu60e6cJEbg.png)

## Garbage Collection Strategies

Use JVM switch to enable the garbage collection strategy for the application.  
There are 5 types of garbage collection.

![Types of GC](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_RGldr9pX3NLlRRLCg51Co8fVWxrSIdvg14m50HkPxWaG3YZjE5Fq1x0&s=10)


