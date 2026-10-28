# Control Statements

## Switch

* Duplicate case values are not allowed.
* each value must be compatible with the type of expression.
* default statement is optional. 
* **break for each case in switch to terminate a statement sequence.**
* break statement is optional. 
* **omit break, execution will continue on into the next case.**
* **switch can test for equality only.**
* switch **more efficient** than nested if **as its pre-compiled because compiler prepares a jump-table**.

```java
switch (expression) {
	case value1:        // statement sequence
		break;
	case value2:        // statement sequence
		break;
	...
	case valueN :       // statement sequence
		break;
	default:            // default statement sequence
		break;
}
```

## While Loop
```java
while(condition) {
    // body of loop
}
```
```java
do {
    // body of loop
    // useful when you process a menu selection.
} while (condition);     
```

## For Loop
```java
for(int n=10; n>0; n--){
    System.out.println("tick " + n);
}
for( ; ; ) {...}  // infinite loop
for(int i=0, j=0 ; i<n, j<n ; i++,j++){} // double loop variables
```

## For-Each
```java
for(int x: nums){ sum += x; }
for(int x: nums) { x = x * 10;}    // no effect on nums
```

## Iterating Over Multidimensional Arrays
```java
for (int x[]: nums) {
    for (int y: x)
        System.out.println("Value is: " + y);
    sum += y;
}
```
```java
int sum = 0;
int nums[][] = new int[3][5];
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 5; j++)
        nums[i][j] = (i + 1) * (j + 1);
```

## Jump Statements
* Statements that change the flow of execution.
	- break, continue, and return. 
	- exception handling.

```java
// Using break as a civilized form of goto.
class Break {
    public static void main(String args[]) {
        boolean t = true;
        first: {
            second: {
                third: {
                    System.out.println("Before the break.");
                    // break out of second block
                    if (t) break second;
                    System.out.println("This won't execute");
                }
                System.out.println("This won't execute");
            }
            System.out.println("This is after second block.");
        }
    }
}
```
Since the loop labeled **one** does not enclose the **break** statement, it is not possible to transfer control out of that block.
```java
// This program contains an error.
class BreakErr {
    public static void main(String args[]) {
        one: for (int i = 0; i < 3; i++) {
            System.out.print("Pass " + i + ": ");
        }
        for (int j = 0; j < 100; j++) {
            if (j == 10) break one;                 // WRONG
            System.out.print(j + " ");
        }
    }
}
```

### Continue

* continue loop but skip further processing for this particular iteration. 
* For while and do-while loops, continue gives control to conditional expression of the loop. 

### Return

* explicitly return from a method to transfer back to the caller of the method. 
* return statement immediately terminates the method. 
