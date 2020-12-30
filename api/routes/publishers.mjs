import express from 'express';
import { publishers } from '../controllers';

const router = express.Router();

export default (app) => {

  router.post('/', publishers.create);

  router.get('/', publishers.find);

  router.get('/:id', publishers.findById);

  router.put('/:id', publishers.update);

  router.delete('/:id', publishers.delete);

  app.use('/api/publishers', router);
}
