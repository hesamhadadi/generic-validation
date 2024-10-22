import {
    maxMessage,
    minLengthMessage,
    minMessage,
    numericMessage,
    requiredMessage,
    validEmailMessage,
  } from "./messages";
  
  export type Validator = (fieldName: string) => {
    predicate: (input: string) => boolean;
    errorMessage: string;
  };
  
  export const required: Validator = (fieldName) => ({
    predicate: (input) => input !== "",
    errorMessage: requiredMessage(fieldName),
  });
  
  export const minLength =
    (n: number): Validator =>
    (fieldName) => ({
      predicate: (input) => input.length >= n,
      errorMessage: minLengthMessage(fieldName, n),
    });
  
  function isNumeric(val: string) {
    return /^-?\d+$/.test(val);
  }
  
  export const numeric: Validator = (fieldName) => ({
    predicate: (input) => isNumeric(input),
    errorMessage: numericMessage(fieldName),
  });
  
  export const min =
    (n: number): Validator =>
    (fieldName) => ({
      predicate: (input) => parseInt(input) >= n,
      errorMessage: minMessage(fieldName, n),
    });
  
  export const max =
    (n: number): Validator =>
    (fieldName) => ({
      predicate: (input) => parseInt(input) <= n,
      errorMessage: maxMessage(fieldName, n),
    });
  
  export const validEmail: Validator = (fieldName) => ({
    predicate: (input) => input.includes("@"),
    errorMessage: validEmailMessage(fieldName),
  });
  
  export function validate<T extends Record<string, string>>(
    obj: T,
    formValidators: Record<keyof T, Array<Validator>>
  ): Record<string, Array<string>> {
    const keys = Object.keys(obj);
  
    return keys.reduce((acc: Record<string, Array<string>>, curr) => {
      const validators = formValidators[curr];
  
      const errors = validators.reduce(
        (errorsAcc: Array<string>, currValidator) => {
          const validator = currValidator(curr);
          if (validator.predicate(obj[curr])) {
            return errorsAcc;
          } else {
            return [...errorsAcc, validator.errorMessage];
          }
        },
        []
      );
  
      return { ...acc, [curr]: errors };
    }, {});
  }
  