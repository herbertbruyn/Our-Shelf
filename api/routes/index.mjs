import setAuthorsRoutes from './authors';
import setBooksRoutes from './books';
import setPublishersRoutes from './publishers';
import setUsersRoutes from './users';

export default (app) => {
  setAuthorsRoutes(app);
  setBooksRoutes(app);
  setPublishersRoutes(app);
  setUsersRoutes(app);

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found or missing resource...' })
  })  
}
