export const textFieldValidation = (value, maxLength) => {
  const regex = /^[^<>&'";=]+$/;
  if (typeof value !== "undefined" && value !== null) {
    if (!regex.test(value)) {
      return "Caracteres no permitidos";
    }
    if (typeof value !== "string") {
      return "Debe ser un texto";
    }
    if (!value.trim()) {
      return "Campo requerido";
    }
    return value.length <= maxLength || `Máximo ${maxLength} caracteres`;
  }
};

export const textFieldValidationV2 = (value, maxLength) => {
  if (typeof value !== "undefined" && value !== null) {
    if (typeof value !== "string") {
      return "Debe ser un texto";
    }
    return value.length <= maxLength || `Máximo ${maxLength} caracteres`;
  }
};

export const dateFieldValidation = (value) => {
  if (typeof value !== "undefined" && value !== null) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) {
      return "Formato de fecha inválido";
    }
    if (!value.trim()) {
      return "Campo requerido";
    }
  }
};

export const numberFieldValidation = (value, minValue, maxValue) => {
  if (typeof value !== "undefined" && value !== null) {
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      return "Debe ser un número";
    }

    if (parsedValue < minValue || parsedValue > maxValue) {
      return `El valor debe estar entre ${minValue} y ${maxValue}`;
    }
  }
};
