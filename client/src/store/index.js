import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: true
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if(!token){
        state.isUserLoggedIn = false
      }else{
        state.isUserLoggedIn = true
      }
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    setToken({commit}, token){
      commit('setToken', token)
    },
    setUser({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
