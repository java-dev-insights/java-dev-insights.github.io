# this Keyword

```js
var person = {
  firstName: "Arpit",
  lastName: "Arpit",
  getFullname: function () {
    return person.firstName + person.lastName;
  }, // called when function execution is initiated
};
var fullName = person.getFullname();
console.log(fullName);
var person2 = person;
person = {};
fullName = person2.getFullname(); // here getFullname is constructed from person rather than person2

var person = {
  firstName: "Arpit",
  lastName: "Arpit",
  getFullname: function () {
    return this.firstName + this.lastName;
  },
};
```

```js
foo(); // 'this' will refer to global object
obj.foo(); // 'this' will refer to obj
new foo(); // 'this' will refer to newly created object
foo.call(myObj); // 'this' will refer to myObj
```

