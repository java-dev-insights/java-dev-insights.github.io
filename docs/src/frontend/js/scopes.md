# Scopes

- javascript is not block-scoped, it is function-scoped

```js
var name = "Arpit";
if (name == "Arpit") {
  var surname = "Tripathi";
}
console.log(name + " " + surname);

function validate() {
  if (name == "Arpit") {
    // accessing parent scoped var
    var surname = "Tripathi";
  }
}
validate();
console.log(name + " " + surname); // runtime error, js is function scoped but we are trying to access child scoped var
```

- Global scoped vars are created in one master global object.
  - for browser, it is `window` where we can see all the global objects registered.
  - console object is also available in this

## Scope Chains

## Immediately Invoked Function Expression (IIFE)

Why avoid Global variables

- Generally, multiple js files are loaded at a time and they share same namespace. Hence, global variables will be overridden.
- Same goes for function names.

```js
// IIFE - No global funtion defined, but invoked once
(function () {
  var a = 40;
  var b = 60;
  console.log(a + b);
})();
```

