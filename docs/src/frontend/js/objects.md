# Objects

- Objects are of free form as js doesn't have concept of classes.
- No strict structure of objects.
- In js, objects behave as key-value pair like a map.
- Object literal notion to create objects.
- Object properties can be accessed directly.
- New properties can be added to objects directly.
- Objects can have methods.

```js
var myObj = {};
console.log(myObj);
myObject.name = "Arpit Tripathi";
```

## Dot and [ ] Notation

- Object properties can be accessed by **dot** notation or **square bracket** notation.
- Used when property name is
  - a reserved word or invalid identifier.
  - starts with a number.
  - dynamic
- returns value or undefined
- Runtime engine may not be able to optimize [] notation.
- Dot and [] notations can be interchanged.

```js
var myObject = {
  "name":"Arpit Tripathi",
  "1":"One"
  "address":{
    "state" : "Maharashtra",
    "country": "India"
  }
};
console.log(myObj.name);
console.log(myObj["name"]);
console.log(myObj.1); // Dot operator will fail due invalid identifier
console.log(myObj["1"]); // So, we use square bracket identifier
var propertyName = "dynamicProperty";
console.log(myObj[propertyName]); // Dynamic Property Name
console.log(myObj.address.country); // accessing internal proerty
```

## Deleting a property

```js
delete myObj["1"];
console.log(myObj);
```

## JSON vs JS Object

**_Difference Between JSON Object and JavaScript Object_**

- JSON stands for JavaScript Object Notation.
- JSON is a lightweight data interchange format.
- Human readable, Easy to parse, Lightweight
- JSON is plain text that we use to transfer data.
- JSON is not specific to JavaScript. can parse a JSON string using any other programming language, like PHP, .Net, Pearl.
- Unlike JavaScript Object, a JSON Object has to be fed into a variable as a String and then parsed into JavaScript.
- For JSON, keys can also be any valid string.
- The JSON values can only be one of the six datatypes (strings, numbers, objects, arrays, Boolean, null). JavaScript values on the other hand can be any valid JavaScript Structure.

<ImageComponent image-path='/angular/json-vs-jsObject.png' />

- d is JSON string
- e is JavaScript Object
- f is also a JavaScript Object, we just parse a JSON string into a JavaScript Object.
- d and e both look the same. So most developers feel that d is a JSON object.

| JSON                                   | JS Object                                      |
| -------------------------------------- | ---------------------------------------------- |
| <ImageComponent image-path='/angular/json.png' /> | <ImageComponent image-path='/angular/jsObject.png' /> |

## Global Objects

- `Math` is a Global object provided in js.
- `Date`
- `window`

## Constructor

```js
function createEmployeeObject(fname, lname, gender, designation) {
  var newObject = {};
  newObject.fname = fname;
  newObject.lname = lname;
  newObject.gender = gender;
  newObject.designation = designation;
  return newObject;
}

var emp1 = createEmployeeObject("Arpit", "Tripathi", "M", "Developer");
var emp2 = new Employee("Arpit", "Tripathi", "M", "Developer");

function Employee(fname, lname, gender, designation) {
  this.fname = fname;
  this.lname = lname;
  this.gender = gender;
  this.designation = designation;
}
```

