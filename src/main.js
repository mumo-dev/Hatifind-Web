import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import firebase from "firebase";
import storeData from './store'

import App from './App.vue'

Vue.use(VueRouter);
Vue.use(Vuex);

import  { routes } from './router'

const router = new VueRouter({
  routes,
  mode:'history'
});


const store = new Vuex.Store(storeData)

Vue.config.productionTip = false


  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDZmS8_nu4tiuoShkwZ99ko3KHG-DOetRI",
    authDomain: "hatifind.firebaseapp.com",
    databaseURL: "https://hatifind.firebaseio.com",
    projectId: "hatifind",
    storageBucket: "hatifind.appspot.com",
    messagingSenderId: "462478955152"
};

firebase.initializeApp(config);


window.firebase = firebase;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
