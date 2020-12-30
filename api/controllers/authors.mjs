import { Author } from '../models';
import { CrudServiceBuilder } from '../services';

export default { ...CrudServiceBuilder(Author) };