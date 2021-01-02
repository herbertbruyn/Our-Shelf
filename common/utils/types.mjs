export const toType = (obj) => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

export const isFunction = (d) => {
  return toType(d) === 'function';
}

export const isDate = (d) => {
  return toType(d) === 'date';
}

export const isString = (d) => {
  return toType(d) === 'string';
}

export const isNonEmptyString = (d) => {
  return isString(d) && d.trim().length > 0;
}

export const isObject = (d) => {
  if (d !== null && d !== undefined) {
    return toType(d) === 'object';
  }
  return false;
}

export const isNumber = (d) => {
  return toType(d) === 'number';
}

export const isBoolean = (d) => {
  return toType(d) === 'boolean';
}

export const isRegExp = (d) => {
  return toType(d) === 'regexp';
}

export const isNumeric = (s) => {
  return !isNaN(parseFloat(s)) && isFinite(s);
}

export const isFalsy = (o) => {
  return o === false || o === undefined || o === null || o === '' || o !== o /** checking if is NaN */;
}

export const isEmptyArray = (o) => {
  return Array.isArray(o) && o.length === 0; 
}

export const isEmptyObject = (o) => {
  return isObject(o) && Object.keys(o).length === 0;
}
