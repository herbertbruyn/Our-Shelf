export const state = () => ({
  list: []
})

export const mutations = {

  setList(state, users) {
    state.list = users;
  }

}

export const actions = {

  async getList({ rootState, commit }) {
    let users;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { users = await this.$axios.$get(`/api/users`);
    } catch (e) { 
      if (rootState.isDev) console.log(e);
      throw new Error(e.message || e.response && e.response.data && e.response.data.message || 'Error ocurred while retrieving users!'); 
    }

    commit('setList', users);

    return users;
  },

  async login() {
    await this.$auth.loginWith('google');
  },

  logout({ dispatch }) {
    dispatch('token/clearToken', null, { root: true });
  },

  async updateAccount({ rootState, dispatch }, userInfo) {
    let response;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { response = await this.$axios.$put(`/api/users/${this.$auth.user._id}`, userInfo);
    } catch (e) {
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Update error!'); 
    }

    let token = response.token;

    await dispatch('token/parseToken', token, { root: true });
  },

  async deleteAccount({ rootState, dispatch }) {
    let response;
    this.$axios.setHeader('x-token', rootState.token.jwt);
    try { response = await this.$axios.$delete(`/api/users/${this.$auth.user._id}`);
    } catch (e) { 
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Deletion error!') 
    }

    await dispatch('token/clearToken', null, { root: true });

    return response;
  }
}

