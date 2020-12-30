import { TokenService } from '@/common';

export const state = () => ({
  token: null
})

export const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
}

export const actions = {

  async clearToken({ commit }) {
    await this.$auth.logout();
    commit('setToken', false);
    this.$axios.setToken(false);
  },

  async parseToken({ commit }, token) {
    token = token || this.$auth.$storage.getUniversal(process.env.storageKey);
    if (!token) { return }
    
    let user;
    try { user = TokenService.decode(token, process.env.jwtSignature); 
    } catch (e) { throw new Error(e.message || 'Invalid token!') }

    this.$auth.setUser(user);
    this.$axios.setToken(token);
    commit('setToken', token);
    this.$auth.$storage.setUniversal(process.env.storageKey, token);
  },


  async getToken({ commit, dispatch }) {
    if (!this.$auth.loggedIn) { return dispatch('clearToken') }

    let response;
    try { response = await this.$axios.post('/api/users', { ...this.$auth.user }) 
    } catch (e) { throw new Error(e.response && e.response.data && e.response.data.message || 'Sign in error!'); }

    let token = response.data.token;

    await dispatch('parseToken', token);
  }
}

