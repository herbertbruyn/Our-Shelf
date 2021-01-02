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

export const cropClone = (target, ref) => {
  return Object.keys(ref).reduce((r, k) => {
    if (Array.isArray(target[k]) || isObject(target[k])) {
      r[k] = cloneDeep(target[k]);
      return r;
    }
    r[k] = target[k];
    return r;
  }, {});
}

export const equals = (a, b, treatEmptyArrayAndEmptyObjectAsFalsy = true) => {
  if (isFalsy(a)) {
    return isFalsy(b);
  }
  if (treatEmptyArrayAndEmptyObjectAsFalsy && (isEmptyArray(a) || isEmptyObject(a))) {
    return isEmptyArray(b) || isEmptyObject(b);
  }
  if (toType(a) !== toType(b)) {
    return false;
  }
  if (Array.isArray(a)) {
    return a.length === b.length && a.every((v, i) => equals(v, b[i]));
  }
  if (isObject(a)) {
    return equals(Object.keys(a), Object.keys(b)) && Object.keys(a).every(key => equals(a[key], b[key]));
  }
  if (isDate(a)) {
    return a.valueOf() === b.valueOf();
  }
  return a === b;
};

