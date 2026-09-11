# Gradle

Gradle is a powerful, open-source build automation tool primarily used for Java, Kotlin, and Android development.  
It's designed to automate the entire software development lifecycle, handling tasks like compiling, packaging, testing, and deploying applications.  
- Gradle excels at managing complex projects and offers features like build scans for performance analysis and a configuration cache for faster builds.  
- Gradle's build scripts are written in Groovy or Kotlin DSL, allowing for highly customized build logic. 

## Installation
Gradle can be installed via various methods, including downloading binaries or using package managers like SDKMAN!

[gradle properties](https://docs.gradle.org/current/userguide/build_environment.html){target="_blank"}

## Dependency Configurations

Every dependency declared for a Gradle project applies to a specific scope.  
reference from official doc [here](https://docs.gradle.org/current/userguide/dependency_configurations.html#sub:what-are-dependency-configurations){target="_blank"}

**What's the difference between implementation, api and compile in Gradle?**
Reference article [here](https://stackoverflow.com/questions/44493378/whats-the-difference-between-implementation-api-and-compile-in-gradle){target="_blank"}

- compile is old way
- “implementation” dependency in your module, it will appear only as runtimeClasspath dependency in customer modules.
- “api” dependency in your module, it will appear as both runtimeClasspath and compileClasspath in consumer modules.

**What is the new replacement keyword for deprecated keywords in new gradle?**
* compile with `implementation` (if you don't need transitivity) or `api` (if you need transitivity)
* testCompile with `testImplementation`
* debugCompile with `debugImplementation`
* androidTestCompile with `androidTestImplementation`
* `compileOnly` is still valid. 
  * It was added in 3.0 to replace provided and not compile. 
  * `provided` introduced when Gradle didn't have a configuration name for that use-case and named it after Maven's provided scope.

## buildscript

**How to download javadocs and sources for jar using Gradle 2.0?**

Reference article [here](https://stackoverflow.com/questions/28404149/how-to-download-javadocs-and-sources-for-jar-using-gradle-2-0){target="_blank"}

- [Building Java & JVM projects](https://docs.gradle.org/current/userguide/building_java_projects.html){target="_blank"}

## Commands and Params

-P is a command-line option for Gradle that allows you to pass a project property to the build. In your Jenkinsfile, -Pdatabase.username=${DB_USERNAME} sets the database.username property for the Gradle build, making ${DB_USERNAME} available as a variable inside your Gradle scripts. This is useful for passing environment-specific or secret values (like database credentials) into the build process.

Some common Gradle command-line options include:

```gradle
-P<prop>=<value>: Set a project property.
-D<prop>=<value>: Set a JVM system property.
-x <task>: Exclude a task from execution.
--info, --debug, --quiet: Set log level.
--stacktrace: Show stack trace on error.
--build-file <file>: Use a specific build file.
--refresh-dependencies: Refresh dependencies.
--parallel: Run tasks in parallel.
--profile: Profile build performance.
--offline: Run in offline mode.
-S is a Gradle command-line option that stands for --stacktrace. It tells Gradle to print the stack trace for any build failure, which helps with debugging by showing detailed error information.
```
