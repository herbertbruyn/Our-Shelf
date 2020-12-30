import AuthorsRouteBuilder from './authors';
import BooksRouteBuilder from './books';
import PublishersRouteBuilder from './publishers';
import UsersRouteBuilder from './users';

export default (app) => {
  return { 
    authors: AuthorsRouteBuilder(app),
    books: BooksRouteBuilder(app),
    publishers: PublishersRouteBuilder(app),
    users: UsersRouteBuilder(app)
  }
}
