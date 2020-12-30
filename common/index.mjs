import { Author, Book, Publisher, User } from './entities';
import { isObject } from './utils';

export { default as TokenService } from './token';
export * from './validation';
export { filter } from './utils';

const nullify = (entity) => {
  return Object.keys(entity).reduce((r, prop) => {
    r[prop] = isObject(r[prop]) ? nullify(r[prop]) : null;
    return r;
  }, {})
}

export const entities = {
  Author: nullify(Author),
  Book: nullify(Book),
  Publisher: nullify(Publisher),
  User: nullify(User)
}

