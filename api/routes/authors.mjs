import express from 'express';
import { authors } from '../controllers';

const router = express.Router();

export default (app) => {

  router.post('/', authors.create);

  router.get('/', authors.find);

  router.get('/:id', authors.findById);

  router.put('/:id', authors.update);

  router.delete('/:id', authors.delete);

  app.use('/api/authors', router);
}
