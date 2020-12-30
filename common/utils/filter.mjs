import { isString, isObject, isDate } from './types';

function getAsString(o) {
  if (o === null || o === undefined) {
    return '';
  }
  if (isString(o)) {
    return o;
  }
  if (Array.isArray(o)) {
    return o.map(item => getAsString(item)).join('\n');
  }
  if (isObject(o)) {
    return Object.keys(o).map(key => getAsString(o[key])).join('\n');
  }
  if (isDate(o)) {
    return o.toJSON();
  }
  return o.toString();
}

export const filter = (arr, search) => {
  if (!Array.isArray(arr)) {
    throw new Error('First argument must be an array.');
  }
  if (!isString(search)) {
    throw new Error('Second argument must be a string.');
  }
  return arr.filter(item => {
    let text = getAsString(item).toLowerCase();
    return text.indexOf(search) >= 0;
  });
};