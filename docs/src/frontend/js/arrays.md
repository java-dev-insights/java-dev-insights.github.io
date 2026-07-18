# Arrays

- Arrays are not homogeneous due to free form.
- 0 based indexing
- undefined for out of bound index.
- js array is underneath a js object with a property length.
  - property names are numbers - 0,1,2...
  - arr[3] is internally converted to arr["3"] for square bracket notation.

```js
var arr = [100, 200, 300];
arr[3] = 400;
arr.length;
var arr = [10, 20, "hello", {}]; // Valid Declaration
```

## Array Methods

```js
var arr = [10,20,'Hello',{}];
arr.push(50); // adds at end
arr.pop(); // removes from end
arr.splice(index,1); // find index and removes 1 element
arr.shift(); // removes from front
arr.unshift(42); // adds at front
var myFunction = fucntion(item, index, array){ // 3 parameters passed by forEach
  console.log("For each element "+item);
};
arr.forEach(myFunction);
```
