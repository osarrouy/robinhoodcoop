export const isValidString = string => {
  if (string && string.length > 0) {
    return true
  }
  return false
}

export const isValidEmail = email => {
  if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  }
  return false
}
