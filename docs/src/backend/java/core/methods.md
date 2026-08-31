# Methods


## Passing Argument

* ***call-by-value***
  * copies the value of an argument into the formal parameter.
  * Changes have no effect on the argument.
* ***call-by-reference***
  * a reference to an argument is passed. 
  * Changes made affects the actual argument.
* call-by-value and call-by-reference
	- primitive type ==> passed by value. 
	- object ==> effectively call-by-reference.

## VarArgs - Variable Length Arguments

### Using Command-Line Arguments
* variable number of arguments to methods. (varargs method)
* A variable-length argument is **specified by three periods (…)**.
* Example - command-line arguments stored as String[] are passed to main() when you run the app.

```java
static void vaTest(String msg, int...v) {
    for (int x: v) System.out.print(x + " ");
}
vaTest("hi");
vaTest("hi", 1, 2, 3);
int doIt(int a, int b, int...vals, boolean stopFlag) {
    // Error!
}
```

### Restrictions
* vararg should be the last.
* Only one vararg parameter is allowed

### varargs method overloading
* Different type of vararg parameter - vaTest(int ...) and vaTest(boolean ...).
* add 1 or more normal parameters.

### Varargs and Ambiguity
```java	
static void vaTest(int ... v) { 
static void vaTest(boolean ... v) {
static void vaTest(String msg, int ... v) {
vaTest(); // Error: Ambiguous!
```
```java
static void vaTest(int ... v) { // ...
static void vaTest(int n, int ... v) { // ...
vaTest(1)
```

## Method Overloading

* Method overloading = **compile-time polymorphism**
* ***type and number of arguments*** used to identify the version in use. 
* ***may have different return types.***
* In C, abs( ) - integer, labs( ) - long, fabs( ) - floating-point value.
* Sometimes, **automatic type conversions can help in overload resolution.**

```java
class OverloadDemo {
    void test() {}
    void test(int a, int b) {}
    void test(double a) {}
    
    public static void main(String args[]) {
        OverloadDemo ob = new OverloadDemo();
        int i = 88;
        ob.test(i);     // this will invoke test(double)
    }
}
```

### Overloading vs Overriding

#### What is Overloading?
* two methods with same name but different method signature.
* Overloaded in the same class.
* Overloaded methods binded by [static binding](https://javarevisited.blogspot.com/2012/03/what-is-static-and-dynamic-binding-in.html) at compile time. 
* During compilation, method calls binded to actual methods.
* Overloaded methods are **fast due to this compile-time binding as no check or binding required during runtime**.
* **Two overloaded methods must have a different signature.**
* **Method signature** in Java consist of:
	* number of arguments.
	* Type of argument.
	* Order of argument.
	* ***return type is not*** part of method signature.

#### What is Overriding?
* You can only override method in sub class, not in the same class.
* method with same name and signature in super and sub class or interface and implementation. 
* **can not override private, static and final method** in Java as they are binded at **compile time (static binding)**.
* **private and static method can be hidden (method hiding)**, same name and signature in sub class.
* Overridden method is **binded at runtime, dynamic binding**.
* override all abstract method unless your class is not abstract if you are extending abstract class or implementing interface.
* **@Override** while overriding a method.
  * **annotation not compulsary, but highly recommended**. 
  * It helps prevent the case when you write a function that you think overrides another one but you misspelled something and you get completely unexpected behavior.

#### Method hiding in Java
```java
Parent parent = new Child();
Child child = new Child();
parent.staticMethod();	        // Parent Static Method is called
parent.nonStaticMethod          // Child's Non Static Method is called
child.staticMethod              // Child's Static Method is called
```

### Rules of overriding (restricting is allowed)

- **Access Modifier**
  * can increase accessibility, but cannot reduce.
  * **can not** reduce accessibility. `public ==> protected [x]`
  * **can** increase accessibility.   `protected ==> protected or public`
- **Exception - Checked Exception**
  * can change to throw subtype of checked exception but not the supertype.
  * **can not** throw checked Exception which is higher in hierarchy. `IOException ==> java.lang.Exception [x]`
    * Above rule **doesn't apply to RuntimeException** as it’s not needed to be declared in throws clause.
  * **change the number of exceptions** - Yes, exceptions must be compatible with throws clause of super
- **Exception - Unchecked Exception**
  * **unchecked to checked** – **No** `[x]`
  * **checked to unchecked** – Yes, reverse is not possible. 
    * SQLException to NumberFormatException - Yes
  * **Without throws clause to with throws** – Yes, Unchecked only.

### Overriding FAQ

#### What is co-variant method overriding?
* original method returns class X, then overridden method **can return sub class** of X.
* this removes casting at client end.
* Example, clone() method originally returns Object, but with co-variant overriding clone return **java.util.Date**.

#### Can you prevent overriding a method without using final modifier?
Yes, private constructor. 
* Now, its not possible to extend that class because its constructor will not be accessible in sub class, which is automatically invoked by sub class constructor.
* used in Singleton design pattern, private constructor and static getInstance() to access singleton instance. 
* Use Modifiers – final / static / private

## Questions


::: details Can we override a non-static method as static in Java?
No, compile time error.
:::

::: details How do you call super class version of an overriding method in sub class?
super.parentMethod()
:::

::: details Can we override constructor in Java?
No, constructor are not inherited.
:::

::: details Can you overload or override main() method in Java?
- **cannot override**, static method.
- **can overload**, but still JVM will always call `public static void main(String args[])`.
:::
