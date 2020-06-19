export const state = () => ({
  token: ''
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  removeToken(state) {
    state.token = ''
  }
}

export const actions = {
  setToken(vuexContext, token) {
    vuexContext.commit('setToken', token)
  },
  removeToken(vuexContext) {
    vuexContext.commit('removeToken')
  }
}

export const getters = {
  getToken(state) {
    return state.token
  },
  verifyToken(state, getters) {
    return getters.getToken != ''
  }
}