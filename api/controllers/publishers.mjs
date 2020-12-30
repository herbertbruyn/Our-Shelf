import { Publisher } from '../models';
import { CrudServiceBuilder } from '../services';

const crudService = CrudServiceBuilder(Publisher);

export default { ...crudService };

