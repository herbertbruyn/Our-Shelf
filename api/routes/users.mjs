import express from 'express';
import { users } from '../controllers';

const router = express.Router();

export default (app) => {

  router.post('/', users.findOrCreate);

  router.get('/', users.find);

  router.put('/:id', users.update);

  router.delete('/:id', users.delete);

  app.use('/users', router);
}
