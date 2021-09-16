import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";
import store from "./store";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA-3i0cENo8Q7-1GgMhXpe36c_vJrs3evk",
  authDomain: "squad-management.firebaseapp.com",
  projectId: "squad-management",
  storageBucket: "squad-management.appspot.com",
  messagingSenderId: "246752333671",
  appId: "1:246752333671:web:431c09f4ac86f1034069c2",
  measurementId: "G-D133TKKMXG"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(async (user) => {
  let userData = null;
  if (user) {
    await user.getIdToken().then(function (token) {
      userData = {
        displayName: user.displayName,
        email: user.email,
        userToken: token
      }
    });
  }
  store.dispatch("fetchUser", userData);
});
store.commit('SET_DATABASE', firebase.firestore());

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
