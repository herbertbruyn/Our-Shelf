import { isNumber, isString } from '../utils';

function getNumbers(str, type) {
  if (isNumber(str)) {
    str = str.toString();
  }
  if (!isString(str)) { 
    return false; 
  }
  let hasX = type === 'isbn10' && str.slice(-1) === 'X';

  str = str.replace(/[^\d]+/g, '');
  let len = type === 'isbn13' ? 13 : 10;
  if (str.length !== len) { 
    if (!hasX) {
      return false; 
    }
  }
  let invalid = [...Array(len - 1).keys()].map(x => String(x).repeat(str.length));
  if (invalid.indexOf(str) >= 0) { 
    return false; 
  }
  let numbers = str.split('').map(Number);

  if (hasX) {
    numbers.push(10); 
  }

  return numbers;
}

function getWeights(type) {
  const weights = {
    isbn10: [10, 9, 8, 7, 6, 5, 4, 3, 2],
    isbn13: [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3]
  };
  return weights[type];
}

function getDigit(numbers, weights) {
  let products = numbers.map((number, i) => number * weights[i]);
  let sum = products.reduce((sum, product) => sum += product, 0);
  let factor = numbers.length === 9 ? 11 : 10;
  return (factor - (sum % factor)) % factor;
}

function checkDigit(str, type = 'isbn13') {
  let numbers = getNumbers(str, type);
  if (Array.isArray(numbers)) {
    let weights = getWeights(type);
    if (Array.isArray(weights)) {
      let base = numbers.slice(0,-1);
      let digit = numbers.slice(-1)[0];
      return getDigit(base, weights) === digit;
    } 
    return false;
  }
  return false;
}

const convertIsbn = (isbn, fromType = 'isbn10') => {
  let toType = fromType === 'isbn10' ? 'isbn13' : 'isbn10';
  if (!checkDigit(isbn, fromType)) {
    throw new Error('Invalid Isbn code!');
  }
  let base = fromType === 'isbn10' ? '978' + isbn.slice(0,-1) : isbn.slice(3,-1);  
  let digit = getDigit(base.split('').map(Number), getWeights(toType)) + '';
  return base + (digit === '10' ? 'X' : digit);
}

export const validateIsbn10 = str => checkDigit(str, 'isbn10');
export const validateIsbn13 = str => checkDigit(str, 'isbn13');
export const from10To13 = str => convertIsbn(str, 'isbn10');
export const from13To10 = str => convertIsbn(str, 'isbn13');
