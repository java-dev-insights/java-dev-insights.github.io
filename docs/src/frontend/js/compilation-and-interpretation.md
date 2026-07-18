# Compilation and Interpretation

**Compilation Phase**

- web browser loads and compiles the source js file, not compiled to some intermediate file.
- Here, we register variables as per the scope.
- This phase is executed very quickly.

**Interpretation Phase**

- Executes based on variables registered during compilation phase.

```js
var a = 10;
function myFn() {
  var b = a;
  console.log(b);
  c = 100;
  // creates variable in global scope rather than myFn scope as it already looked upto Global scope
  // solution - use var to create myFn scoped variables
}
myFn();
```

Due to these separate steps of compilation and interpretation, order of vars in same scope doesn't affect anything. (example below)

```js
var a = 10;
function outer() {
  var b = a;
  console.log(b);
  function inner() {
    var c = b; // Here, b is expected to be 10 from the global scope. but it will be undefined due to function scope.
    console.log(c);
    var b = 20;
  }
  inner();
}
outer();
```

```js
console.log(a);
var a = 10;
```

## Hoisting

- Declarartion of vars and functions are hoisted to the top of their scope while execution stays in sequence of code.

```js
function funcA() {
  funcB();
}

function funcB() {
  funcA();
}
// Here hoisting is important as funcB is defined after funcA, but funcA calls funcB.
```

## Strict Mode

- Introduced in ES5 (Ecma Script).
- ES is a standardization for JS to be implemented by clients.
- `"use strict;"`

```js
var myName = "Arpit";
myname = "Arpit Tripathi"; // here another global scoped var is created

("use strict;");
var myName = "Arpit";
myname = "Arpit Tripathi";
// Error : reference to undeclared variable
```

