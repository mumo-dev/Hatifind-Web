import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Dashboard from './components/Dashboard.vue'
import Accounts from './components/Accounts.vue'
import Centers from './components/Centers.vue'
import New from './components/lost/NewItem.vue'
import Item from './components/lost/SingleItem.vue'

export const routes = [
    {
      path: '/',
      component: Home,
      name:'home'
    },

    {
      path: '/login',
      component: Login,
      name:'login'
    },

    {
      path: '/register',
      component: Register,
      name:'register'
    },

    {
      path: '/dashboard',
      component: Dashboard,
      name:'dashboard'
    },

    {
      path: '/manage-accounts',
      component: Accounts,
      name:'accounts'
    },

    
    {
      path: '/collection-centers',
      component: Centers,
      name:'centers'
    }, 

    {
        path: '/add-new-item',
        component:New,
        name:'new-item'
    },

    {
      path: '/item/:id',
      component:Item,
      name:'item'
  }
]