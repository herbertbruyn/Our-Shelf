import { User } from '../models';

export default {

  signInOrSignUp: async (userData) => {
    let user;
    try { user = await User.findOne({ email: userData.email }); 
    } catch (e) { throw new Error(e) } 

    if (!user) {
      try { user = await User.create({ ...userData }); 
      } catch (e) { throw new Error(e) } 
    }

    return user;
  },

  findById: async (id) => {
    try { return await User.findById(id); 
    } catch (e) { throw new Error(e) }
  },

  find: async (query) => {
    try { return await User.find(query).select('collectionName createdAt birthDate email picture interests description name given_name color palette -_id'); 
    } catch (e) { throw new Error(e) }
  },

  update: async (id, payload) => {
    try { return await User.findByIdAndUpdate(id, payload, { returnOriginal: false });
    } catch (e) { throw new Error(e) }
  },

  delete: async (id) => {
    try { return await User.findByIdAndRemove(id, { useFindAndModify: false, returnOriginal: false });
    } catch (e) { throw new Error(e) }
  }
};
