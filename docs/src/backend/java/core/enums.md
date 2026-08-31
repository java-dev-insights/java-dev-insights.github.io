# Enums

Enumeration

* list of named constants. `enum Apple {Jonathan, GoldenDel, RedDel, Winesap, Cortland}`
* Each is implicitly declared as a **public static final** member of Apple **with type as Apple**. (self-typed)
* Variable of type enumeration can be created. 
* **enum** not instantiated using **new**.
* declare and use an enumeration variable same as primitive types.
* compared by using ==.
* Can be used in **switch**.
* System.out.println(Apple.Winesap); ==> **Winesap**.
* All enumerations have two predefined methods: **values( )** and **valueOf( )**.
	- `public static enum-type [ ] values()` – array with all enumeration constants.
	- `public static enum-type valueOf(String str)` - Apple.valueOf("Winesap") prints Winesap.

## Java Enumerations Are Class Types
* can have constructors, instance variables and methods, and even implement interfaces.
* Each enumeration constant is an object of its enumeration type.
* constructor for **enum** is called for each enumeration constant upon creation.

```java
enum Apple {
    Jonathan(10), GoldenDel(9), RedDel(12), Winesap(15), Cortland(8);
    private int price;          // member
    Apple() { price = -1; }     // constructor
    Apple(int p) { price = p; }
    int getPrice() { return price; }
}
```

## Restrictions on enumerations:
* An enumeration can’t inherit another class.
* An enum cannot be a superclass.

## Enumerations Inherit Enum
* all enumerations inherit **java.lang.Enum**, hence cannot inherit any other class.

## Methods in java.lang.Enum: 
- **final int ordinal( )** – enum’s position in list of constants, begins at zero.
- **final int compareTo(enum-type e)** – [a minus e]
- **equals()** - true if both refer to same constant of same enumeration, can also use ==.
	* having same ordinal values will not guarantee **equals( )** as enums can be from different enumerations.
