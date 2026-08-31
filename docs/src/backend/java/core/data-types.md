# Data Types

## Identifiers

* **valid identifiers** - AvgTemp, count, a4, $test, this_is_ok
* **Invalid identifier** - 2count, high-temp, Not/ok
* **Java Keywords**: 50 keywords, cannot be used as identifiers.
    * There are also some reserved keywords but not used, example - const and goto.

| identifiers |          |            |          |              |
| ----------- | -------- | ---------- | -------- | ------------ |
| package     | import   |
| interface   | abstract | class      | extends  | implements   |
| private     | default  | protected  | public   |              |
| final       | static   | transient  | volatile | synchronized |
| return      | new      | void       |          |              |
| if          | else     | switch     | case     |              |
| do          | while    | for        | continue | break        |
| short       | byte     | int        | long     | double       |
| boolean     | strictfp | float      | char     |              |
| try         | catch    | finally    | throw    | throws       |
| assert      | const    | instanceof |          |              |
| this        | super    |            |          |              |
| goto        | native   | enum       |          |              |

## Primitive Datatype

* 8 primitive types represent single values, used for efficiency.
* Wrapper objects degrade performance for basic operations.
* Due to portability requirement, all data types have a strictly defined range.
  * example, int always 32 bits on all platform.
* **Integers** : byte, short, int, long
* **Floating-point** : float, double
* **Characters** : char
* **Boolean** : boolean

| Name    | bytes | bits | Range (From)               | Range (To)                | Deafult  | Note                           |
| ------- | ----- | ---- | -------------------------- | ------------------------- | -------- | ------------------------------ |
| byte    | 1     | 8    | –128                       | 127                       | 0        |                                |
| short   | 2     | 16   | –32,768                    | 32,767                    | 0        |                                |
| int     | 4     | 32   | –2,147,483,648             | 2,147,483,647             | 0        | 2x10^9                         |
| long    | 8     | 64   | –9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 | 0        | 9x10^18                        |
| float   | 4     | 32   | 1.4e–045                   | 3.4e+038                  | 0.0f     | 6-7 significant decimal digits |
| double  | 8     | 64   | 4.9e–324                   | 1.8e+308                  | 0.0d     | 15 significant decimal digits  |
| char    | 2     | 16   | 0                          | 65,536                    | '\u0000' | unsigned                       |
| boolean |       |      | true or false              |                           | false    |                                |

* *byte*, *short*, *int*, and *long*. All of these are signed (positive and negative values).
* The leftmost bit (high-order bit) dictates the sign (0 for positive, 1 for negative) using Two's complement.
* Java, highorder-bit managed by adding **unsigned right shift** (`>>>`) operator (3 arrows), need for unsigned integer eliminated.

| Integers |                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| byte     | for stream of data from a network or file.                                                                      |
| int      | used to control loops and indexes in arrays. For expression evaluation - byte/short promoted to int.            |
| long     | used when large values as result. ex. Speed_of_light, lightyear.                                                |
| float    | Single precision with less space, used for a fractional component, but not require a large degree of precision. |
| double   | when need accuracy over many iterative calculations.                                                            |

- Java's char is an **16-bit Unicode** for global portability ranging 0 to 65,536 (an unsigned 16-bit integer).
  - ASCII are 0 to 127, extended 8-bit character set.
  - ISO-Latin-1, ranges from 0 to 255.
- we can also perform arithmetic operations on char same as we do with integer type. example, add two chars or increment value.

## Type Wrappers

Type wrappers - encapsulate a primitive type within an object.

| Type Wrapper |                                                         | Get Primitive         |
| ------------ | ------------------------------------------------------- | --------------------- |
| Boolean      | Boolean(boolean boolValue) , Boolean(String boolString) |                       |
| Double       |                                                         | double doubleValue( ) |
| Integer      | Integer(int num) , Integer(String str)                  | int intValue( )       |
| Float        |                                                         | float floatValue( )   |
| Short        |                                                         | short shortValue( )   |
| Long         |                                                         | long longValue( )     |
| Byte         |                                                         | byte byteValue( )     |
| Character    | Character(char ch)                                      | char charValue( )     |

* If str is not a valid numeric value, NumberFormatException.
* Byte, Short, Integer, Long, Float, Double - inherit the abstract class Number.
* boxing – primitive to Object
* unboxing – Object to primitive

```java
Integer iOb = new Integer(100);
int i = iOb.intValue();
```

* **Autoboxing** - automatically primitive to Object (wrapper, encapsulated, boxed).
* **Auto-unboxing** - boxed object value is automatically extracted (unboxed). No need to call intValue(), doubleValue() etc.

```java
Integer iOb = 100;        // autobox an int
int i = iOb;              // auto-unbox
++iOb;                    // unboxes iOb,performs the increment, and then Reboxes the result back into iOb.
Double a, b, c;           // A bad use of autoboxing/unboxing!
a = 10.0; b = 4.0;        // far less efficient than what could be written using double
c = Math.sqrt(a*a + b*b);
```

## Literal Representation

| Representation |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| Octal          | leading zero, normal decimal numbers cannot have a leading zero. |
| Hexadecimal    | leading zero-x, (0x or 0X).                                      |
| Long           | 0x7ffffffffffffffL or 9223372036854775807L is the largest long.  |
| Binary         | prefix the value with 0b or 0B.                                  |

```java
int x = 123_456_789;            // the value given to x will be 123,456,789.
int x = 0b1101_0101_0001_1010;  // underscores discarded on compile
```

### Floating-Point Literals

* suffix that specifies a power of 10 - 6.022E23, 314159E–05, and 2e+100.
* A floating-point literal is of type float if it ends with the letter F or f.
* otherwise its type is double and it can optionally end with the letter D or d .
* Hexadecimal floating-point literals - 0x12.2P2(=72.5).
  * P is called **binary exponent**, power-of-two to be multiplied.

<ImageComponent image-path='/java/core-java/octal-decimal-computation.png' />

### Character Literals

* directly as 'a', 'z', and '@'. 
* octal notation, ' \141' is the letter 'a'. 
* hexadecimal, '\u0061' is 'a'.

| Escape Sequence | Description                |
| --------------- | -------------------------- |
| \r              | Carriage return            |
| \n              | New line (line feed)       |
| \f              | Form feed                  |
| \t              | Tab                        |
| \b              | Backspace                  |
| \ddd            | Octal character (ddd)      |
| \uxxxx          | Hexadecimal Unicode (xxxx) |
| \'              | Single quote               |
| \"              | Double quote               |
| \\              | Backslash                  |

## Type Casting

* compatible types, implicit conversion, assign int value to a long variable. (***widening***)
* incompatible types, use a cast for explicit conversion between incompatible types. (***narrowing***)

### Automatic Type Promotion in expression

```java
byte b = 50;
b = b * 2; // Error! Cannot assign an int to a byte!
b = (byte) b * 2;
double result=(f*b)+(i/c)-(d*s);
```

- boolean --> int
- byte --> int
- char --> int
- short --> int
- int --> int
- long --> long
- float --> float
- double --> double
- reference --> reference
- returnAddress --> returnAddress


## Arrays in Java

- **Array** : common name for homogeneous collection accessible by index.
- ***length*** - array capacity to hold elements, not element count.

```java
// month_days is an array variable, no array actually exists
int month_days[];
// Links with an actual, physical array of integers. Memory allocated.
month_days = new int[12];
// array initializer
int month_days[] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
```

### Multidimensional arrays 
* arrays of arrays. 
* new statement - ***leftmost dimension required mandatorily***.
* default value for new    : 
	- zero (for numeric types)
	- false (for boolean)
	- null (for reference types)

```java
int twoD[][] = new int[4][];        // leftmost dimension required
System.out.println(twoD.length);    // prints 4
System.out.println(twoD[0]);        // prints null
twoD[0] = new int[5];
twoD[1] = new int[5];
twoD[2] = new int[5];
twoD[3] = new int[5];
```

<ImageComponent image-path='/java/core-java/2d-array.png' />

### Irregular array – sparsely populated 2D array

```java
char twod1[][] = new char[3][4];
char[][] twod2 = new char[3][4];
```
