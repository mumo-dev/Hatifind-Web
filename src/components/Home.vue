<template>
  <div class="hero">
  
     <div class="header">
        <!-- <a class="header-item" href="/">Home</a>   -->
        <a class="header-item" href="/login">Login</a>
        <a class="header-item" href="/register">Register</a>
    </div>

    <div class="welcome">
        Welcome to Hatifind
    </div>

   
    
  </div>
</template>

<script>
export default {
  name: 'Home',

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hero {
  /* position: relative; */
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  background-image: url(../assets/here.jpeg);
  background-position: center;
  background-size: cover;
  /* opacity: 0.9; */
}
.welcome {
  text-align: center;
  font-size: 50px;
  font-weight: 900;
  color: white;
  padding-top: 40vh;
  line-height: 2rem;
}

.header {
  background-color: black;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  opacity: 0.5;
}

.header .header-item {
  cursor: pointer;
  padding:16px 24px;
  color: white;
  font-size: 20px;
}
.header .header-item:hover, .header .header-item:focus {
  background: white;
  color: black;
  opacity: 1;
}
/* 
#00ffa2;
#00ddff
#00ddff; */
</style>
