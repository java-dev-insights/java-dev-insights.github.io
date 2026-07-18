# Closures

- function declaration keeps a snapshot of scope as well ie. it points to same variables as inside the function.
- **Closure** is a function that remembers scope during the time of declaration, even if it is executed from a different scope.
- Closures are useful in callbacks and creating modules.

```js
var a = 10; // global scoped var
function outer() {
  var b = 20; // function scoped var
  var inner = function () {
    a++;
    b++;
    console.log(a);
    console.log(b);
  };
  return inner;
}
var b = 50;
var innerFn = outer(); // new copy of var b created in function
innerFn(); // prints 11 and 21 due to closures
var innerFn2 = outer();
innerFn2(); // prints 12 and 21 due to closures
```

**Callback**

```js
var a = 10;
fucntion fn(){
  console.log(a);
}
setTimeout(fn, 1000); // Here, closure has the var a definition even when passed to 3rd party function
console.log("Done!"); // Print done and then a
```

**Module Pattern**

```js
function person(fname, lname) {
  var firstName = fname;
  var lastName = lname;
  var returnObj = {
    getFirstName: function () {
      return firstName;
    },
    getLastName: function () {
      return lastName;
    },
    setFirstName: function (name) {
      firstName = name;
    },
    setLastName: function (name) {
      lastName = name;
    },
  };
  return returnObj;
}
var p = person("Arpit", "Tripathi");
console.log(p.getFirstName()); // var firstName accessed by closures
console.log(p.firstName); // undefined, property was not included in returned object
```

## Closure in Async Callbacks

```js
var i;
var print = function () {
  console.log(i);
};
for (i = 0; i < 10; i++) {
  print(); // print 0 to 9
}
for (i = 0; i < 10; i++) {
  setTimeout(print, 1000); // print 10 for 10 times, all are pointing to same i
  // IIFE
  (function (curr) {
    setTimeout(function () {
      console.log(curr);
    }, 1000);
  })(i);
}
```
