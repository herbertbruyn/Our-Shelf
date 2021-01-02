import { Author, Book, Publisher, User, defaultValues } from './entities';
import { isObject } from './utils';

export { default as TokenService } from './token';
export * from './validation';
export { cloneDeep, equals, cropClone, filter } from './utils';

const nullify = target => {
  return Object.keys(target).reduce((r, k) => {
    if (isObject(target[k])) {
      r[k] = nullify(target[k]);
    } else {
      r[k] = null;
    }
    return r;
  }, {})
}

export const entities = {
  Author: Object.assign(nullify(Author), defaultValues.author),
  Book: Object.assign(nullify(Book), defaultValues.book),
  Publisher: Object.assign(nullify(Publisher), defaultValues.publisher),
  User: Object.assign(nullify(User), defaultValues.user)
}

