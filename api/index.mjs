import express from 'express';
import { setMongoose, setMiddlewares } from './config';
import setRoutes from './routes';

const app = express();
setMongoose();
setMiddlewares(app);
setRoutes(app);



export default app;