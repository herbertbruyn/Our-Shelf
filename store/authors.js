export const state = () => ({
  list: []
})

export const mutations = {

  setList(state, authors) {
    state.list = authors;
  },

  add(state, author) {
    state.list.push(author);
  },

  update(state, { id, author }) {
    let index = state.list.findIndex(item => item._id === id);
    if (index < 0) {
      throw new Error('Database is updated, but local list of authors appears to be inconsistent!');
    }
    state.list[index] = author;
  },

  delete(state, id) {
    let index = state.list.findIndex(item => item._id === id);
    if (index < 0) {
      throw new Error('Database is updated, but local list of authors appears to be inconsistent!');
    }
    state.list.splice(index, 1);
  }
}

export const actions = {

  async getList({ rootState, commit }) {
    let authors;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { authors = await this.$axios.$get(`/api/authors`);
    } catch (e) { 
      console.log(e)
      throw new Error(e.response && e.response.data && e.response.data.message || 'Error ocurred while retrieving authors!'); }

    commit('setList', authors);

    return authors;
  },

  async create({ rootState, commit }, authorInfo) {
    let author;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { author = await this.$axios.$post(`/api/authors`, authorInfo);
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Error occurred while creating author!'); }

    commit('add', author);

    return author;
  },


  async update({ rootState, commit }, { id, authorInfo }) {
    let author;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { author = await this.$axios.$put(`/api/authors/${id}`, authorInfo);
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Update error!'); }

    commit('update', { id, author });

    return author;
  },

  async delete({ rootState, commit }, id) {
    let response;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { response = await this.$axios.$delete(`/api/authors/${id}`);
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Deletion error!') }

    commit('delete', id);

    return response;
  }
}
