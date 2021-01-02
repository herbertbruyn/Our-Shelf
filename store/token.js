import { TokenService } from '@/common';

export const state = () => ({
  jwt: null
})

export const mutations = {
  setToken: (state, jwtToken) => {
    state.jwt = jwtToken;
  }
}

export const actions = {

  async clearToken({ commit }) {
    await this.$auth.logout();
    commit('setToken', false);
    this.$auth.$storage.removeUniversal(process.env.storageKey);
  },

  async parseToken({ rootState, commit }, jwtToken) {
    jwtToken = jwtToken || this.$auth.$storage.getUniversal(process.env.storageKey);
    if (!jwtToken) { return }
    
    let user;
    try { user = TokenService.decode(jwtToken, process.env.jwtSignature); 
    } catch (e) { 
      if (rootState.isDev) console.log(e);
      throw new Error(e.message || 'Invalid token!') 
    }

    this.$auth.setUser(user);
    commit('setToken', jwtToken);
    this.$auth.$storage.setUniversal(process.env.storageKey, jwtToken);
  },


  async getToken({ rootState, dispatch }) {
    if (!this.$auth.loggedIn) { return dispatch('clearToken') }

    let response;
    try { response = await this.$axios.post('/api/users', { ...this.$auth.user }) 
    } catch (e) {
      dispatch('clearToken');
      if (rootState.isDev) console.log(e);
      throw new Error(e.response && e.response.data && e.response.data.message || 'Sign in error!'); 
    }

    let jwtToken = response.data.token;

    await dispatch('parseToken', jwtToken);
  }
}

