
# Prototype

- Objects created from same function shares same prototype.
- Prototype is used to define behaviors for similar objects.
- you can add properties to prototype on runtime, different from classes in Java where all behaviors are needs to be defined upfront.

```js
function foo() {}
foo.prototype; // points to prototype object of foo
foo.prototype.constructor; // points to foo
var myObj = new foo();
// myObj has __proto__ pointing to prototype object of foo function
myObj.hello; // check myObj for property and if not found, check prototype object for property
```

- `Object` is a global function which also have a prototype.

```js
var simple = {};
var myObj = new Object();
console.log(Object.prototype === myObj.__proto__);
// both var are constructed from Object prototype
var f = new foo(); // foo prototype has __proto__ for Object prototype
console.log(Object.prototype === f.__proto__.__proto__);
```

- prototypes can be used to implement inheritance in js.

<ImageComponent image-path='/ui/js/prototypes.png' />

<ImageComponent image-path='/ui/js/inheritance-with-prototype.png' />
