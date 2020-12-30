import { isFalsy, isString, isNumber, isFunction } from '../utils';
import { validateIsbn10, validateIsbn13 } from './isbn';
import patterns from './patterns';

export default (validationString) => {

  let validators = [];

  function required(s) {
    if (Array.isArray(s) || isString(s)) { return s.length > 0 || `This field is required` }
    return !isFalsy(s) || `This field is required`;
  }

  function min(s, limit) {
    if (isFalsy(s)) { return true; }
    if (isNumber(s) && s >= limit) { return true; }
    return  `Must be equal or greater than ${limit}`;
  }

  function max(s, limit) {
    if (isFalsy(s)) { return true; }
    if (isNumber(s) && s <= limit) { return true; }
    return `Must be equal or less than ${limit}`;
  }

  function minLength(s, limit) {
    if (isFalsy(s) || !s.length) { return true }
    if (s.length >= limit) { return true; }
    return `Must be at least ${limit} characters long`;
  }

  function maxLength(s, limit) {
    if (isFalsy(s) || !s.length) { return true }
    if (s.length <= limit) { return true; }
    return `Must not exceed ${limit} characters`;
  }

  function eachMin(s, limit) {
    if (isFalsy(s)) { return true }
    return Array.isArray(s) && s.every(val => isNumber(val) && val >= limit) || `Each item must be equal or grater than ${limit}`;
  }

  function eachMax(s, limit) {
    if (isFalsy(s)) { return true }
    return Array.isArray(s) && s.every(val => isNumber(val) && val <= limit) || `Each item must be equal or less than ${limit}`;
  }

  function eachMinLength(s, limit) {
    if (isFalsy(s)) { return true }
    return Array.isArray(s) && s.every(val => val.length && val.length >= limit) || `Each item must be at least ${limit} characters long`;
  }

  function eachMaxLength(s, limit) {
    if (isFalsy(s)) { return true }
    return Array.isArray(s) && s.every(val => val.length && val.length <= limit) || `Each item must be not exceed ${limit} characters`;
  }


  function isDateString(s) {
    if (isFalsy(s)) { return true }
    return isString(s) && patterns.DATE.test(s) || `Invalid date`;
  }

  function email(s) {
    if (isFalsy(s)) { return true }
    return isString(s) && patterns.EMAIL.test(s) || `Invalid email`;
  }

  function zip(s) {
    if (isFalsy(s)) { return true }
    return isString(s) && patterns.ZIP_CODE.test(s) || `Invalid zip code`;
  }

  function isbn10(s) {
    if (isFalsy(s)) { return true }
    return isString(s) && patterns.ISBN10.test(s) && validateIsbn10(s) || `Invalid ISBN-10`;
  }

  function isbn13(s) {
    if (isFalsy(s)) { return true }
    return isString(s) && patterns.ISBN13.test(s) && validateIsbn13(s) || `Invalid ISBN-13`;
  }

  const rules = {
    required: () => validators.push(val => required(val)),
    min: (limit) => validators.push(val => min(val, Number(limit))),
    max: (limit) => validators.push(val => max(val, Number(limit))),
    eachMin: (limit) => validators.push(arr => eachMin(arr, Number(limit))),
    eachMax: (limit) => validators.push(arr => eachMax(arr, Number(limit))),
    minLength: (limit) => validators.push(val => minLength(val, Number(limit))),
    maxLength: (limit) => validators.push(val => maxLength(val, Number(limit))),
    eachMinLength: (limit) => validators.push(arr => eachMinLength(arr, Number(limit))),
    eachMaxLength: (limit) => validators.push(arr => eachMaxLength(arr, Number(limit))),
    date: () => validators.push(val => isDateString(val)),
    email: () => validators.push(val => email(val)),
    zip: () => validators.push(val => zip(val)),
    isbn10: () => validators.push(val => isbn10(val)),
    isbn13: () => validators.push(val => isbn13(val)),
    custom: (fn) => validators.push(val => fn(val))
  };

  function setRules(s) {
    if (isFunction(s)) {
      rules.custom(s);
    }
    if (isString(s)) {
      let fns = s.split('|');
      fns.forEach(item => {
        let [ fn, arg ] = item.split(':');
        if (fn in rules) {
          rules[fn](arg);
        }
      });
    }
    if (Array.isArray(s)) {
      s.forEach(item => setRules(item));
    }
  }

  setRules(validationString);

  return validators;
}

