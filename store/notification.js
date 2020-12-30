export const state = () => ({
  show: false,
  message: '',
  color: ''
})

export const mutations = {
  ['SET_STATUS']: (state, status) => {
    state.show = status;
  },
  ['SET_OPTIONS']: (state, { message, color }) => {
    state.message = message;
    state.color = color;
  }
}

export const actions = {
  ['NOTIFY']: ({ commit }, options) => {
    commit('SET_OPTIONS', options);
    commit('SET_STATUS', true);
  }
}
