import {
  required,
  minLength,
  numeric,
  min,
  max,
  validEmail,
  validate,
} from "./validation";

document.querySelector("#submit-button")?.addEventListener("click", (e) => {
  e.preventDefault();
  const firstnameInput = document.getElementById(
    "firstname"
  ) as HTMLInputElement;
  const lastnameInput = document.getElementById("lastname") as HTMLInputElement;
  const ageInput = document.getElementById("age") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;

  const rules = {
    firstname: [required, minLength(2)],
    lastname: [],
    age: [numeric, min(4), max(120)],
    email: [required, validEmail],
  };

  const errors = validate(
    {
      firstname: firstnameInput.value,
      lastname: lastnameInput.value,
      age: ageInput.value,
      email: emailInput.value,
    },
    rules
  );

  showValidationResultField(firstnameInput, errors.firstname);
  showValidationResultField(lastnameInput, errors.lastname);
  showValidationResultField(ageInput, errors.age);
  showValidationResultField(emailInput, errors.email);
});

function showValidationResultField(
  inputElement: HTMLInputElement,
  errors: Array<string>
) {
  const ulElement = inputElement.nextElementSibling as HTMLUListElement;
  ulElement.innerHTML = "";
  if (errors.length > 0) {
    inputElement.setAttribute("aria-invalid", "true");

    for (const err of errors) {
      const errorElement = document.createElement("li");
      errorElement.appendChild(document.createTextNode(err));
      ulElement.appendChild(errorElement);
    }
  } else {
    inputElement.setAttribute("aria-invalid", "false");
  }
}
