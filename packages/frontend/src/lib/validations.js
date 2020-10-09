export const isValidString = (string) => {
  if (string && string.length > 0) {
    return true;
  }
  return false;
};

export const isValidEmail = (email) => {
  if (email && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return true;
  }
  return false;
};
