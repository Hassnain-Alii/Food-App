import * as EmailValidator from "email-validator";
import * as SecureStore from "expo-secure-store";
/***
 * a function that takes input from user
 * check if its valid email or not
 * sendds true or false
 */
const validateEmail = (value) => {
  const isValid = EmailValidator.validate(value);

  return isValid;
};

/**
 *this will take any key and value will save it in
 *expo secure store
 * */
const setStoredValue = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

/**
 *this will bring any key's value
 * from expo secure store
 * */
const getStoredValue = async (key) => {
  return await SecureStore.getItemAsync(key);
};

/**
 * Image path takes and makes a blob
 * */
const makeBlobFromUri = async (uri) => {
  const img = await fetch(uri);

  const blob = await img.blob();
  return blob;
};

export { validateEmail, getStoredValue, setStoredValue, makeBlobFromUri };
