import { getLocalUser} from './helpers'
const currentUser = getLocalUser();
export default {
  
  state: {
    user:currentUser,
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

}