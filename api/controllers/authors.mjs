import { Author } from '../models';
import { CrudServiceBuilder } from '../services';

const crudService = CrudServiceBuilder(Author);

export default { ...crudService };