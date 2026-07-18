# Default Function Arguments

- we get 2 properties - `arguments` and `this`
- arguments value is not an array, we use it as array but it is an object.

```js
var add = fucntion(a,b){
  console.log(arguments); // captures full list of passed arguments
  return (a+b);
}
add(2,3);
add(2,3,4,5,6);

var add = fucntion(){
  console.log(arguments); // captures full list of passed arguments
  var i, sum = 0;
  for(i=0; i<arguments.length, i++){
    sum += arguments[i];
  }
  return sum;
}
```

