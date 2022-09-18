const regexEmail = "/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/";
const regexNumber = "/^d+$/";
const regexChar = "/^[a-zA-ZÀ-ÿ]+(s*[a-zA-ZÀ-ÿ]*)*[a-zA-ZÀ-ÿ]+$/";
const regexAlphaNumeric = "/^[0-9a-zA-Z]+$/";

export const validateEmail = (email, e, handleError) => {
  console.log("gola");
  if (email < 3) {
    handleError(e, "Este campo no puede estar vacio", true);
  } else if (!regexEmail.test(email)) {
    handleError(e, "Correo electronico invalido", true);
  } else {
    handleError(e, "", true);
  }
};

export const validateName = (name, handleError, e) => {
  if (!name) {
    handleError(e, "Este campo no puede estar vacio", true);
  } else if (!regexChar.test(name)) {
    handleError(e, "El nombre solo puede contener caracteres", true);
  } else {
    handleError(e, "", true);
  }
};
