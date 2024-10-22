# Generic Validation

In this exercise, you will implement a validation system based on the initial project structure and the example provided below.

## Example

Given the following data and rules:

```typescript
const data = {
  name: "",
  email: "test"
};

const rules = {
  name: [required, minLength(3)],
  email: [required, validEmail]
};

const output = validate(data, rules);

// expected output
output = {
  name: [
    'name should not be empty',
    'name should be at least 3 characters'
  ],
  email: [ 'email should be valid email' ]
}
