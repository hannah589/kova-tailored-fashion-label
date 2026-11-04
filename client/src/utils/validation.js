//File: src/utils/validation.js
//this file will hold client-side validation functions

// is_Empty. takes one param value: input we wish to check 
// this function will check the passed value. chick if undefined, null an empty obj or empty string
//return true if any of the tests are true, false otherwise


//take in value. check if value is undefined or null
//will return true
export const isEmpty = (value) =>
  value === undefined || value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0 ) ||
  (typeof value === 'string' && value.trim().length === 0)

//create function to check if a string  contains any special chars
//this function will use a regular expression to test value  if it contains any special chars
//will return true there are special chars
//returns false if there is only a-z or A-Z chars
//regular expression
export const alpha = (value) => {
  // /[]/ = regular expression
  let ex = /[^a-zA-Z]+$/;
  const result = ex.test(value); //return a boolean. test if it excludes a-z-A-Z
  return result;
}

//check price is valid 
//check if its a regular expression, to test to see the number has only 2 decimal places
//takes 1 param: the value we wish to test
//return true if it match digits /any digits with 1 or 2 decimal places 
export const isValidPrice = (value) => {
  const ex = /^\d+(\.\d{1,2})?$/
  const result = ex.test(value);
  return result;
}

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (value) => {
  const ex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,64}$/;
  return ex.test(value);
};