export const state = () => ({
  collection: []
})

export const mutations = {

  setCollection(state, collection) {
    state.collection = collection;
  },

  add(state, book) {
    state.collection.push(book);
  },

  update(state, { id, book }) {
    let index = state.collection.findIndex(item => item._id === id);
    if (index < 0) {
      throw new Error('Database is updated, but local collection appears to be inconsistent!');
    }
    state.collection.splice(index, 1, book);
  },

  delete(state, id) {
    let index = state.collection.findIndex(item => item._id === id);
    if (index < 0) {
      throw new Error('Database is updated, but local collection appears to be inconsistent!');
    }
    state.collection.splice(index, 1);
  }
}

export const actions = {

  async getMyCollection({ rootState, commit }) {
    let collection;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { collection = await this.$axios.$get(`/api/books/?owner=${this.$auth.user.email}`);
    } catch (e) { 
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Error ocurred while retrieving book collection!'); 
    }

    commit('setCollection', collection);

    return collection;
  },

  async search({ rootState }, isbn) {
    this.$axios.setHeader('x-token', rootState.token.jwt);
    let hasX = isbn.substr(-1) === 'X';
    isbn = isbn.replace(/[^\d]+/g, '') + (hasX ? 'X': '');
    try { return await this.$axios.$get(`/api/books/search/${isbn}`);
    } catch (e) {
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Error ocurred while retrieving book collection!'); 
    }
  },

  async getUserCollection({ rootState }, email) {
    this.$axios.setHeader('x-token', rootState.token.jwt);
    let books;
    try { books = await this.$axios.$get(`/api/books/?owner=${email}&private=false`);
    } catch (e) { 
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Error ocurred while retrieving book collection!'); 
    }
    return books;
  },

  async create({ rootState, commit }, bookInfo) {
    let book;
    bookInfo.owner = this.$auth.user.email;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { book = await this.$axios.$post(`/api/books`, bookInfo);
    } catch (e) { 
      if (rootState.isDev) {
        console.log(e)
        console.log(e.response)
      };
      throw new Error(e.response && e.response.data && e.response.data.message || 'Error occurred while creating book!'); 
    }

    commit('add', book);

    return book;
  },


  async update({ rootState, commit }, { id, bookInfo }) {
    let book;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { book = await this.$axios.$put(`/api/books/${id}`, bookInfo);
    } catch (e) { 
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Update error!'); 
    }

    commit('update', { id, book });

    return book;
  },

  async delete({ rootState, commit }, id) {
    let response;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { response = await this.$axios.$delete(`/api/books/${id}`);
    } catch (e) { 
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Deletion error!') 
    }

    commit('delete', id);

    return response;
  }

}

