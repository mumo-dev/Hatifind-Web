import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store( {
  
  state: {
    user:{
        uid:null,
        email:null,
        token:null
    },
    isAuthenticated:false
  },

  getters: {
      isAuthenticated(state){
        return state.isAuthenticated;
      },
      user(state) {
        return state.user;
      }
  },

  mutations:{

    storeUser(state, payload){
      state.user = payload;
    },

    setAuthenticationState(state, payload){
      state.isAuthenticated = payload
    }

  },

  actions:{

  }

});