import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Dashboard from './components/Dashboard.vue'
import Accounts from './components/Accounts.vue'
import Centers from './components/Centers.vue'
import Payment from './components/Payment.vue'
import AllPayment from './components/AllPayment.vue'
import New from './components/lost/NewItem.vue'
import Item from './components/lost/SingleItem.vue'

export const routes = [
    {
      path: '/',
      component: Home,
      name:'home',
      
    },

    {
      path: '/login',
      component: Login,
      name:'login', 
    },

    {
      path: '/register',
      component: Register,
      name:'register',
      meta:{
        requiresAuth:true,
        isSuperAdmin:true
      }
    },

    {
      path: '/dashboard',
      component: Dashboard,
      name:'dashboard',
      meta:{
        requiresAuth:true,
        isAdmin:true
      }
    },

    {
      path: '/manage-accounts',
      component: Accounts,
      name:'accounts',
      meta:{
        requiresAuth:true,
        isSuperAdmin:true
      }
    },

    
    {
      path: '/collection-centers',
      component: Centers,
      name:'centers',
      meta:{
        requiresAuth:true,
        isSuperAdmin:true
      }
    }, 

    {
        path: '/add-new-item',
        component:New,
        name:'new-item',
        meta:{
          requiresAuth:true,
          isAdmin:true
        }
    },

    {
      path: '/item/:id',
      component:Item,
      name:'item',
      meta:{
        requiresAuth:true,
        isAdmin:true
      }
    },

    {
      path: '/payment',
      component:Payment,
      name:'payment',
      meta:{
        requiresAuth:true,
        isAdmin:true
      }
    },

    {
      path: '/all-payment-details',
      component:AllPayment,
      name:'payments',
      meta:{
        requiresAuth:true,
        isSuperAdmin:true
      }
    },

]