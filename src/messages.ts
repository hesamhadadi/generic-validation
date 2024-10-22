export const requiredMessage = (fieldName: string) =>
  `${fieldName} should not be empty`;

export const minLengthMessage = (fieldName: string, n: number) =>
  `${fieldName} should be at least ${n} characters`;

export const numericMessage = (fieldName: string) =>
  `${fieldName} should be numeric`;

export const minMessage = (fieldName: string, n: number) =>
  `${fieldName} should be greater than or equal to ${n}`;

export const maxMessage = (fieldName: string, n: number) =>
  `${fieldName} should be less than or equal to ${n}`;

export const validEmailMessage = (fieldName: string) =>
  `${fieldName} should be valid email`;
