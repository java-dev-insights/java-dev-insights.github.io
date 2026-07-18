# Functions

- free form language, hence method overloading is not possible.
- flexible argument counts.
- In JS, functions are values.

```js
// Function Declaration
function sayHello(name, surname) {
  // No need to declare type as everything is var
  console.log("Hello " + name + " " + surname);
}
sayHello("Arpit", "Tripathi");
sayHello("Arpit"); // no compilation error, surname will be undefined
sayHello("Arpit", "Tripathi", "India"); // No compilation error, 3rd argument is ignored
var value = ("Arpit", "Tripathi"); // returns undefined
function sayHello(name, surname) {
  return "Hello " + name + " " + surname;
}
```

## Function Expression and Anonymous Function Expression

```js
// Function Expression - Note ';' at end of function
var hello = function sayHello(name, surname) {
  console.log("Hello " + name + " " + surname);
};
hello("Arpit", "Tripathi");

// Anonymous Function Expression
var hello = function sayHello(name, surname) {
  console.log("Hello " + name + " " + surname);
};
hello("Arpit", "Tripathi");
```

## Function as Argument

```js
// Passing function as argument
var executor = function (fn) {
  fn();
};
executor(hello);
```

## Function as Object Property

```js
var myObj = {
  propa: "hello",
};
myObj.myMethod = function () {
  console.log("Method in object property");
};
myObj.myMethod();
```

