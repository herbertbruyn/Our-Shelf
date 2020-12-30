import { isFalsy, isEmptyArray, isEmptyObject, toType, isObject, isDate } from './types';

export const cloneDeep = (o) => {
  if (Array.isArray(o)) {
    return o.map(item => cloneDeep(item));
  }
  if (isObject(o)) {
    return Object.keys(o).reduce((r, k) => {
      r[k] = cloneDeep(o[k]);
      return r;
    }, {});
  }
  return o;
};

export const equals = (a, b) => {
  if (isFalsy(a) && isFalsy(b)) {
    return true;
  }
  if (isFalsy(a) && (isEmptyArray(b) || isEmptyObject(b))) {
    return true;
  }
  if (isFalsy(b) && (isEmptyArray(a) || isEmptyObject(a))) {
    return true;
  }
  if ((isEmptyArray(a) || isEmptyObject(a)) && (isEmptyArray(b) || isEmptyObject(b))) {
    return true;
  }
  if (toType(a) !== toType(b)) {
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => equals(v, b[i]));
  }
  if (isObject(a) && isObject(b)) {
    return equals(Object.keys(a), Object.keys(b)) && Object.keys(a).every(key => equals(a[key], b[key]));
  }
  if (isDate(a) && isDate(b)) {
    return a.valueOf() === b.valueOf();
  }
  return a === b;
};

