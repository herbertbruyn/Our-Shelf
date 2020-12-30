export const state = () => ({})

export const actions = {

  async nuxtServerInit ({ dispatch }) {
    await dispatch('token/parseToken');
  }
  
}

