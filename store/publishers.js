export const state = () => ({
  list: []
})

export const mutations = {

  setList(state, publishers) {
    state.list = publishers;
  },

  add(state, publisher) {
    state.list.push(publisher);
  },

  update(state, { id, publisher }) {
    let index = state.list.findIndex(item => item._id === id);
    if (index < 0) {
      throw new Error('Database is updated, but local list of publishers appears to be inconsistent!');
    }
    state.list[index] = publisher;
  },

  delete(state, id) {
    let index = state.list.findIndex(item => item._id === id);
    if (index < 0) {
      throw new Error('Database is updated, but local list of publishers appears to be inconsistent!');
    }
    state.list.splice(index, 1);
  }
}

export const actions = {

  async getList({ rootState, commit }) {
    let publishers;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { publishers = await this.$axios.$get(`/api/publishers`);
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Error ocurred while retrieving publishers!'); }

    commit('setList', publishers);

    return publishers;
  },

  async create({ rootState, commit }, publisherInfo) {
    let publisher;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { author = await this.$axios.$post(`/api/publishers`, publisherInfo);
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Error occurred while creating publisher!'); }

    commit('add', publisher);

    return publisher;
  },


  async update({ rootState, commit }, { id, publisherInfo }) {
    let publisher;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { publisher = await this.$axios.$put(`/api/publishers/${id}`, publisherInfo);
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Update error!'); }

    commit('update', { id, publisher });

    return publisher;
  },

  async delete({ rootState, commit }, id) {
    let response;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { response = await this.$axios.$delete(`/api/publishers/${id}`);
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Deletion error!') }

    commit('delete', id);

    return response;
  }
}
