import express from 'express';
import { books } from '../controllers';

const router = express.Router();

export default (app) => {

  router.post('/', books.create);

  router.get('/', books.find);

  router.get('/:id', books.findById);

  router.put('/:id', books.update);

  router.delete('/:id', books.delete);

  router.get('/search/:isbn', books.findBookData);

  app.use('/books', router);
}
