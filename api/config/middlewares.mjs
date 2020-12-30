import bodyParser from 'body-parser';
import { users } from '../controllers';

const { checkToken } = users;

export default (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(async (req, res, next) => {
    if (req.method !== 'POST' || req.path !== '/users') {
      try { await checkToken(req);
      } catch (e) { return res.status(401).send({ message: e.message }); }
    }
    next();
  });
}
