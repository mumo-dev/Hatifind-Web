<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
         <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
        <div class="card">

          <p class="red accent-2 center-align" v-if="errorMessage"
          style="padding:4px;margin:4px;border-radius:4px">
              {{ errorMessage }}
          </p>
          
          <div class="card-content">
            <h5 class="card-title center-align teal-text " style="font-weight:500">Register</h5>
            <form >
                <!-- <div class="row"> -->
                  <div class="input-field">
                    <input  id="email" type="email" class="validate" required v-model="user.email">
                    <label for="email">Email</label>
                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                  </div>

                  <div class="input-field">
                    <input id="password" type="password" class="validate" required v-model="user.password">
                    <label for="password">Password</label>
                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                  </div>

                  <div class="input-field">
                    <input id="cpassword" type="password" class="validate" required v-model="user.cpassword">
                    <label for="cpassword">Confirm Password</label>
                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                  </div>


                  <button  type="submit" class="waves-effect waves-light btn"
                      @click.prevent="registerUser()" :disabled="loading"
                  >Register</button>

                <!-- </div> -->

            </form>

          </div>
        
        </div>   <!-- card -->
       
         
      </div> <!-- col -->
    </div>  <!-- row -->
  </div>
</template>

<script>
export default {

  data() {
    return {
      user:{
        email:'',
        password:'',
        cpassword:''
      },
      loading:false,
      errorMessage:''
    }
  },

  methods: {
    registerUser(){
      const data = {
        email: this.user.email,
        password: this.user.password
      };


      this.loading = true;
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode)
        this.errorMessage = error.message;

        this.loading = false;
        // ...
        if(!error){
          //success.
            this.user = {
              email:'',
              password:'',
              cpassword:''
            }

            this.$router.push('/login');
        }


      });
    }
  }
};
</script>

<style scoped>

.container {
  margin: 100px auto !important;  
}

</style>