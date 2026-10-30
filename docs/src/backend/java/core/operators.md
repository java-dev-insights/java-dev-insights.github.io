# Java Operators

Java divides the operators into the following groups:

- Arithmetic operators
- Assignment operators
- Comparison operators
- Logical operators
- Bitwise operators

## Operator Priority

<ImageComponent image-path='/java/core-java/operator-priority.png' />

## Bitwise Operators

* Java uses ***2’s complement for zero crossing issue.***
* 0 is 00000000, while 1’s complement 11111111 which is -ve 0.
* left shift operation on a byte or short value will be an int, hence the bits not lost till they get past 31st.
* **negative byte/short are sign-extended when promoted to int**, higher order filled as 1. This is why need to discard higher order bits by type-casting result back.

<ImageComponent image-path='/java/core-java/bit-operator.png' />

## Right Shift

* MSB (most significant bits) filled with previous content ie. sign extension to preserve sign.

```java
00100011 (35) >> 2      // 00001000 which is 8
11111000 (-8) >> 1      // 11111100 which is –4
// 11111111 11111111 11111111 11111111 –1 in binary as an int
int a = -1;             
// 00000000 00000000 00000000 11111111 255 in binary as an int
// fills zero due to unsigned right shift operator >>>
a = a >>> 24;           
```

## Short-Circuit Logical Operators

* **OR**    : true when A is true, no matter what B is.
* **AND**   : false when A is false, no matter what B is.

```java
int x, y, z;
x = y = z = 100;                // set x, y, and z to 100
double ratio = (d==0) ? 0 : num/d;
```

```java
int num=5, d=2;
double ratio = (d==0) ? 0 : num/d;
// Outputs: 2.0 (NOT 2.5!) because num/d produces int
```
