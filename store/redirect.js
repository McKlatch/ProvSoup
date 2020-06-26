export const state = () => ({
  path: ''
})

export const mutations = {
  setPath(state, path) {
    state.path = path
  },
  removePath(state) {
    state.path = ''
  }
}

export const actions = {
  setPath(vuexContext, path) {
    vuexContext.commit('setPath', path)
  },
  removePath(vuexContext) {
    vuexContext.commit('removePath')
  }
}

export const getters = {
  getPath(state) {
    return state.path
  },
  isPath(state, getters) {
    return getters.getPath != ''
  }
}