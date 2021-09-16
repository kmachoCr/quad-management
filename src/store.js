import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    user: {
      data: null
    },
    db: {},
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    authStatus: state => state.status,
    user(state){
      return state.user
    },
    database: state => state.db
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
      
      if(data) {
        state.token = data.userToken;
        localStorage.setItem('user-token', data.userToken) // store the token in localstorage
      }else {
        state.token = '';
        localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      }
    },
    SET_DATABASE(state, db) {
      state.db = db;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", user);
      } else {
        commit("SET_USER", null);
      }
    }
  }
});

export default store;