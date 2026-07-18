# Execution Context

- **_Execution Context._**
- Execution Context has 2 components
  1. Memory Component (Variable Enviroment) - variable and function stored as key-value pairs.
  2. Code Component (Thread of Execution) - js code is executed here.

## How JS code is executed by JS Engine

- When you run a JS code, Global execution context is created.
- This Global Execution Context is created in 2 phases
  1. Memory Creation Phase - Allocates memory to variables and functions.
     - variables - assigned `undefined`
     - functions - whole function code is assigned
  2. Code Execution Phase - actual values are assigned to variables and functions are invoked.
- Each function invocation creates a new Execution Context and with return statement that execution context is destroyed.

## Call Stack

- Maintains the Order of Execution for Execution Contexts.
- Manages Global Execution Context and child execution context.
- Global Execution Context <= EC1 <= EC2 (top-of-stack)
- Also known as
  - Call Stack
  - Execution Context Stack
  - Program Stack
  - Control Stack
  - Runtime Stack
  - Machine Stack

## Hoisting

- All the variables and functions defined in the js are created during memory allocation phase.
  - vars as undefined
  - functions as copied code block
- Functions defines as arrow function or var are allocated as if they are vars ie. undefined.

### not-defined vs undefined

- **not defined** - means variable/function was not defined in Memory Creation Phase
- **undefined** - means variable/function was defined in Memory Creation phase but value is not assigned.

## Shortest JS Program

- Empty js file is the shortest js program.
- JS Engine creates the following
  - Global Execution Context
  - Global Object - `window` for browsers
  - this - pointed to window
- same : `this.a` , `window.a`, `a`

