<template>
    <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="/dashboard" 
        class="brand-logo">Hatifind</a>
        <ul class="right hide-on-med-and-down">
        <li><a href="/add-new-item"><i class="material-icons left">add</i>Add</a></li>
        <li>
          <router-link to="/manage-accounts">
          <i class="material-icons left">people</i>Accounts
          </router-link>
        </li>
        <li>
          <router-link to="/collection-centers">
          <i class="material-icons left">my_location</i>Centers
          </router-link>
        </li>
        <li><a href="#"><i class="material-icons left">person_pin</i>Logout</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
       <li><a href="#"><i class="material-icons left">dashboard</i>All</a></li>
        <li><a href="#"><i class="material-icons left">people</i>Accounts</a></li>
        <li><a href="#"><i class="material-icons left">my_location</i>Centers</a></li>
        <li><a href="#"><i class="material-icons left">person_pin</i>Logout</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>


