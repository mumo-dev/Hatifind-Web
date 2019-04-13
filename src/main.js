import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import firebase from "firebase";

import storeData from './store';
import  { routes } from './router'

import App from './App.vue'

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(storeData);

const router = new VueRouter({
  routes,
  mode:'history'
});

router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record=> record.meta.requiresAuth);
  const isSuperAdmin = to.matched.some(record=> record.meta.isSuperAdmin);
  // const isAdmin = to.matched.some(record=> record.meta.isAdmin);

  
  // const userIsAdmin = store.user.isAdmin == true;


  let isAuthenticated = store.state.isAuthenticated;
  const currentUser = store.state.user;
  if(currentUser){
    isAuthenticated = true;
  }

  if(requiresAuth && !isAuthenticated){
      next('/login');
  }else if(to.path == '/login' && isAuthenticated){
      next('/dashboard');
  }else {
      //redirect normal users access to admin;;
      if(isSuperAdmin){
        const userIsSuperAdmin = store.state.user.isSuperAdmin == true;
        if(!userIsSuperAdmin){
          next('/dashboard');
        }
      }
      
    
      // if(isSu)
      next();
  }
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
