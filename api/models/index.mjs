import mongoose from 'mongoose';
import { enums, patterns } from '../../common';
import AuthorModelBuilder from './Author';
import BookModelBuilder from './Book';
import PublisherModelBuilder from './Publisher';
import UserModelBuilder from './User';

export const Author = AuthorModelBuilder(mongoose, { enums, patterns });
export const Book = BookModelBuilder(mongoose, { enums, patterns });
export const Publisher = PublisherModelBuilder(mongoose, { enums, patterns });
export const User = UserModelBuilder(mongoose, { enums, patterns });
