import { createStore } from 'vuex'
import jwtDecode from "jwt-decode"

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    user: {}
  },
  mutations: {
    SET_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async loadUser({ commit, dispatch }) {
      if (localStorage.getItem('isLoggedIn') == 'true') {
        try {
          if (localStorage.getItem("token")) {
            const decodedToken = jwtDecode(localStorage.getItem("token"))
          
            if (decodedToken.exp * 1000 < Date.now()) {
              dispatch("logout")
            } else {
              commit("SET_USER", decodedToken)
              commit("SET_LOGGED_IN", true)
            }
          }
        } catch (error) {
          dispatch("logout")
        }
      } else {
        dispatch("logout")
      }
    },
    logout({ commit }) {
      commit("SET_USER", {})
      commit("SET_LOGGED_IN", false)
      localStorage.setItem("isLoggedIn", false)
      localStorage.removeItem("token")
    }
  },
  modules: {
  }
})
