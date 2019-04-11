import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from "firebase";
import {store} from './store'

import App from './App.vue'

Vue.use(VueRouter);


import  { routes } from './router'

const router = new VueRouter({
  routes,
  mode:'history'
});




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
