import { isObject } from '../utils';

const getProps = (ref) => {
  return Object.keys(ref).map(prop => isObject(ref[prop]) ? { [prop]: getProps(ref[prop]) } : ref[prop] === true ? prop : null );  
};

const filterNulls = (propsArray) => {
  return propsArray.filter(prop => isObject(prop) ? filterNulls(Object.values(prop)[0]) : prop !== null );
}

const checkProps = (target, filteredPropsArray) => {
  return filteredPropsArray.every(prop => isObject(prop) ? checkProps(target[Object.keys(prop)[0]], Object.values(prop)[0]) : prop in target);
}

export default (ref) => {
  return (target) => {
    return checkProps(target, filterNulls(getProps(ref)));
  }
}
