import { Author, Book, Publisher, User, defaultValues } from './entities';
import { isObject } from './utils';

export { default as TokenService } from './token';
export * from './validation';
export { cloneDeep, equals, cropClone, filter } from './utils';

export const entities = {
  Author: Object.assign(Author, defaultValues.author),
  Book: Object.assign(Book, defaultValues.book),
  Publisher: Object.assign(Publisher, defaultValues.publisher),
  User: Object.assign(User, defaultValues.user)
}

