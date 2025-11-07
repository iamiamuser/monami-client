export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => password.length >= 6;

export const validateBirthdate = (dateStr) => {

  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
};