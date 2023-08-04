export const textFieldValidation = (value, maxLength) => {
  const regex = /^[a-zA-Z0-9\s]+$/;
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
};
