# Packages

* containers for classes, **makes namespace compartmentalized to avoid name collisions**.
* naming and visibility control mechanism. 
* default package has no name, not advisable.
* file system directories used to store packages.
* package java.awt.image;         // stored in java\awt\image

## Finding Packages and CLASSPATH
* Java run-time system, by default, uses current working directory and subdirectories as its starting point.
* CLASSPATH environmental variable - specify directory path or paths.
* -classpath option with java and javac.

## Importing Packages
* import statement **brings certain classes, or entire packages, into visibility**.
* **can use Class names (instead of fully qualified names)**.
* 2 class of same name for 2 packages, use fully qualified for one of them.
