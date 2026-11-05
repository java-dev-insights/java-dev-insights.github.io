# JDK vs JRE vs JVM

<ImageComponent image-path='/java/jvm-architecture/jdk-jre-jvm.png' />

- **JVM**
  - virtual machine that run the Java bytecodes.
  - **Class loader system** + **runtime data area** + **Execution Engine**
- **JRE**
  - Environment where Java programs runs.
  - [**JVM** + **Java Packages Classes (util, math, lang etc)** + **runtime libraries**]
- **JDK**
  - **JRE** + **Development/debugging tools**
  - (Java compiler javac in its /bin) and tools (ex. javaDoc, debugger)

![](https://intexsoft.com/app/uploads/2019/10/jdk-1.jpg.webp)

## What to use when?

- JRE : For running Java programs on browser/computer you will only install JRE.
- JDK : For development JDK is required.
  - When deploying a WebApp with JSP, JDK is required as compilation converts JSP into Servlets.

## Comparision

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc1tkQFPdXQfEjmBi5zqHXDvRTt_1mYpAf9beySuE8-nCt0zi44GE8XFFe&s=10)

## Composition of JDK and JRE

![](https://itsobes.com/assets/en/java/152.jpg)
