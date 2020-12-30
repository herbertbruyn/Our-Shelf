export default (Model) => {

  const errorHandler = (res, msg) => {
    res.status(500).send({ message: msg });
  };

  return {

    errorHandler,

    create: async (req, res) => {
      if (req.body._id === null) { delete req.body._id; }      
      try { res.send(await Model.create(req.body));
      } catch (e) { return errorHandler(res, e.message || 'Register creation failed!'); }
    },
    
    find: async (req, res, next) => {
      let docs;
      try { docs = await Model.find(req.query);
      } catch (e) { return errorHandler(res, e.message || 'Search failed!'); }
      if (!docs) { return next(); }
      res.send(docs);
    },

    findOne: async (req, res, next) => {
      let doc;
      try { doc = await Model.findOne(req.query);
      } catch (e) { return errorHandler(res, e.message || 'Search failed!'); }
      if (!doc) { return next(); }
      res.send(doc);
    },

    findById: async (req, res, next) => {
      let doc;
      try { doc = await Model.findById(req.params.id);
      } catch (e) { return errorHandler(res, e.message || 'Search failed!'); }
      if (!doc) { return next(); }
      res.send(doc);
    },

    update: async (req, res, next) => {
      let doc;
      try { doc = await Model.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, returnOriginal: false });
      } catch(e) { return errorHandler(res, e.message || 'Update failed!'); }
      if (!doc) { return next(); }
      res.send(doc);
    },

    cancel: async (req, res, next) => {
      let doc;
      try { doc = await Model.findByIdAndUpdate(req.params.id, { cancelled: true }, { useFindAndModify: false, returnOriginal: false });
      } catch(e) { return errorHandler(res, e.message || 'Operation failed!'); }
      if (!doc) { return next(); }
      res.send(doc);
    },

    delete: async (req, res, next) => {
      let doc;
      try { doc = await Model.findByIdAndRemove(req.params.id, { useFindAndModify: false, returnOriginal: false });
      } catch(e) { return errorHandler(res, e.message || 'Operation failed!'); }
      if (!doc) { return next(); }
      res.send(doc);
    }    
  }
};