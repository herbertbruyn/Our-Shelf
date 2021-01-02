export { default as Author } from './Author';
export { default as Book } from './Book';
export { default as Publisher } from './Publisher';
export { default as User } from './User';

export const defaultValues = {
  author: {
    birthBC: false,
    deathBC: false
  },
  book: {
    stars: 0
  },
  publisher: {},
  user: {}
}
