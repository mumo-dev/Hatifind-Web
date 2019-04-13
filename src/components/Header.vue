<template>
    <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="/dashboard" 
        class="brand-logo">Hatifind</a>
        <ul class="right hide-on-med-and-down">
        <li v-if="!isSuperAdmin"><a href="/dashboard"><i class="material-icons left">apps</i>Home</a></li>
        <li v-if="!isSuperAdmin"><a href="/add-new-item"><i class="material-icons left">add</i>Add</a></li>
        <li v-if="isSuperAdmin">
          <a href="/all-payment-details">
          <i class="material-icons left">euro_symbol</i>Payments</a>
        </li>
        <li v-else>
          <a href="/payment">
          <i class="material-icons left">euro_symbol</i>Payments</a>
        </li>
        <li v-if="isSuperAdmin">
          <router-link to="/manage-accounts">
          <i class="material-icons left">people</i>Accounts
          </router-link>
        </li>
        <li v-if="isSuperAdmin">
          <router-link to="/collection-centers">
          <i class="material-icons left">my_location</i>Centers
          </router-link>
        </li>
        <li><a href="#"  @click.prevent='logout'><i class="material-icons left">person_pin</i>Logout</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li class="blue" style="padding-top:20px; padding-bottom:20px">
         
            <a class="text-white"> <i class="material-icons left">reorder</i>Hatifind</a>
         
        </li>
        <li><a href="/dashboard"><i class="material-icons left">apps</i>Home</a></li>

        <li><a href="/add-new-item"><i class="material-icons left">add</i>Add</a></li>
        <li v-if="isSuperAdmin">
          <a href="/all-payment-details">
          <i class="material-icons left">euro_symbol</i>Payments</a>
        </li>
        <li v-else>
          <a href="/payment">
          <i class="material-icons left">euro_symbol</i>Payments</a>
        </li>
        <!-- all-payment-details -->
          <li v-if="isSuperAdmin">
            <router-link to="/manage-accounts">
            <i class="material-icons left">people</i>Accounts
            </router-link>
          </li>
          <li v-if="isSuperAdmin">
            <router-link to="/collection-centers" >
            <i class="material-icons left">my_location</i>Centers
            </router-link>
          </li>
          <li><a href="#" @click.prevent='logout'><i class="material-icons left" >person_pin</i>Logout</a></li>
      </ul>
      <a  data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</template>

<script>
export default {
  
  computed:{
    user() {
      return this.$store.getters.user;
    },
    isSuperAdmin() {
      return this.$store.getters.user.isSuperAdmin;
    }
  },
  methods: {
    logout(){
        firebase.auth().signOut().then(()=> {
          // Sign-out successful.
            localStorage.removeItem('user');
            this.$store.commit('storeUser', null);
            this.$$store.commit('setAuthenticationState', false);
            this.$router.push('/');
        }).catch((error) =>{
          // An error happened
            localStorage.removeItem('user');
            this.$store.commit('storeUser', null);
            this.$store.commit('setAuthenticationState', false);
            this.$router.push('/');
        });
    }
  }
}
</script>

<style scoped>

</style>


