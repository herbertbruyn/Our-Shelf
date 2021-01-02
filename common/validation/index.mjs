import { Author, Book, Publisher, User } from '../entities';
import createPropsValidator from './props-validation';
import createFormValidationRules from './form-validation';

export { default as patterns } from './patterns';
export { default as enums } from './enums';
export { default as createFormValidationRules } from './form-validation';
export { validateIsbn10, validateIsbn13, from10To13, from13To10 } from './isbn';
export { imageUrlExists } from './img-url';

export const propsValidators = {
  author: createPropsValidator(Author),
  book: createPropsValidator(Book),
  publisher: createPropsValidator(Publisher),
  user: createPropsValidator(User)
}

export const formRules = {
  author: {
    name: createFormValidationRules('required|minLength:5|maxLength:50'),
    picture: createFormValidationRules('required|urlOrDataUrl'),
    birthYear: createFormValidationRules('year'),
    deathYear: createFormValidationRules('year'),
    birthPlace: createFormValidationRules('maxLength:50'),
    deathPlace: createFormValidationRules('maxLength:50'),
    shortBiography: createFormValidationRules('maxLength:5000')
  },
  book: {
    isbn: createFormValidationRules('required|isbn'),
    isbn10: createFormValidationRules('required|isbn10'),
    isbn13: createFormValidationRules('required|isbn13'),
    title: createFormValidationRules('required|minLength:5|maxLength:100'),
    description: createFormValidationRules('required|maxLength:2000'),
    coverImage: createFormValidationRules('required|urlOrDataUrl'),
    authors: createFormValidationRules('required|minLength:1'),
    publishers: createFormValidationRules('required|minLength:1'),
    edition: createFormValidationRules('required|maxLength:50'),
    publishDate: createFormValidationRules('required'),
    pages: createFormValidationRules('numeric'),
    format: createFormValidationRules('required'),
    language: createFormValidationRules('required'),
    type: createFormValidationRules('required'),
    subtypes: createFormValidationRules('required|minLength:1'),
    ownersReview: createFormValidationRules('maxLength:5000')
  },
  publisher: {
    name: createFormValidationRules('required|minLength:5|maxLength:50'),
    logo: createFormValidationRules('required|urlOrDataUrl'),
    country: createFormValidationRules('required'),
    province: createFormValidationRules('required'),
    city: createFormValidationRules('required|minLength:5|maxLength:50')
  },
  user: {
    collectionName: createFormValidationRules('required|minLength:5|maxLength:50'),
    description: createFormValidationRules('maxLength:1000'),
    interests: createFormValidationRules('eachMinLength:5|eachMaxLength:30'),
  }
}
