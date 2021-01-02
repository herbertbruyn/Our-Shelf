import { Book } from '../models';
import { CrudServiceBuilder, SearchService } from '../services';

const crudService = CrudServiceBuilder(Book);
const { errorHandler } = crudService;
const { findBookData } = SearchService;

export default { 
  ...crudService, 

  findBookData: async (req, res) => {
    const isbn = req.params.isbn;

    let bookData;
    try { bookData = await findBookData(isbn);
    } catch (e) { 
      console.log(e);
      return errorHandler(res, e.message || 'Search failed!'); }

    if (!bookData) { return errorHandler(res, 'Book not found!'); }

    res.send(bookData);
  }

};