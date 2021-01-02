export const state = () => ({
  isDev: false
})

export const mutations = {
  setDevMode(state, status) {
    state.isDev = status;
  }
}

export const actions = {

  async nuxtServerInit ({ commit, dispatch }, { $auth, error, isDev }) {
    commit('setDevMode', isDev);
    try { 
      await dispatch('token/parseToken'); 
    } catch (e) { 
      if (isDev) { console.log(e); }
      $auth.logout();
      dispatch('users/logout');
      error({
        statusCode: 401,
        message: 'Your session expired. Please sign in again.'
      });
    }
  }
}

