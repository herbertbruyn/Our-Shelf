export const state = () => ({
  collection: []
})

export const mutations = {
  setCollection(state, collection) {
    state.collection = collection;
  }   
}

export const actions = {

  async getUserCollection({ commit }) {
    let response;
    try { response = await this.$axios.$get(`/api/books/?owner=${this.$auth.user.email}`);
    } catch (e) { 
      console.log(e)
      throw new Error(e.response && e.response.data && e.response.data.message || 'Error ocurred while getting book collection!'); }

    commit('setCollection', response);
  }
}

