# Types and Variables

- **Primitive Types for js**
  - number
  - string
  - booleans
  - undefined
  - null
  - symbol - similar to enumeration (introduced in ES6)
- **Type Wrapper Objects**
  - String
  - Number
  - Boolean
  - Symbol

```js
var value; // Declaration // here, value = undefined
value = 42; // Definition
console.log(typeof value);
```

- No types info is attached with variables in js, **_loosely typed language_**.
- same variable can be assigned values of different types
- No scoping info in variable declaration as opposed to java (private, public, static etc.)
- variables type can be interrogated - typeof

## Type Coercion and === operator

- **Type Coercion** - Type casting
- **== operator** - check for equals
- **=== operator**
  - check for equals as well as type match
  - precise checks

```js
var a = 10;
var b = "10";
console.log(a == b); // true
console.log(a === b); // false

if (a) {
  console.log("a is true");
}
```

### Variable evaluation for if condition

- int - zero, means false
- string - empty, means false
- undefined - false
- null - false

This means every primitive type has a boolean type associated with it, coercion.

## undefined vs null

- undefined
  - it is a variable type as well.
  - value has never been initialized (untouched form field)
- null - value was assigned but not a proper value (visited form field)
  - you can set an object property as null to convey that property name is valid but currently no value is set.

