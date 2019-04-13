<template>
<div>
  <Header/>
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

                  <div class="input-field">
                    <input  id="name" type="text" class="validate" required v-model="user.name">
                    <label for="name">Name</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>
                <!-- <div class="row"> -->
                  <div class="input-field">
                    <input  id="email" type="email" class="validate" required v-model="user.email">
                    <label for="email">Email</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input id="password" type="password" class="validate" required v-model="user.password">
                    <label for="password">Password</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input id="cpassword" type="password" class="validate" required v-model="user.cpassword">
                    <label for="cpassword">Confirm Password</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                   <div class="input-field">
                    <input  id="phone" type="text" class="validate" required v-model="user.phone">
                    <label for="phone">Phone</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>


                  <button  type="submit" class="waves-effect waves-light btn"
                      @click.prevent="registerUser()" :disabled="!dataIsValid ||loading"
                  >Register</button>

                <!-- </div> -->

            </form>

          </div>
        
        </div>   <!-- card -->
       
         
      </div> <!-- col -->
    </div>  <!-- row -->
  </div>
</div>
</template>

<script>
import Header from './Header'
export default {
  components:{
      Header
  },
  data() {
    return {
      user:{
        name:'',
        email:'',
        password:'',
        cpassword:'',
        phone:''
      },
      loading:false,
      errorMessage:''
    }
  },

  computed:{
    dataIsValid(){
        if(this.user.email && this.user.password && this.user.cpassword
            &&this.user.name && this.user.phone
           && this.user.password == this.user.cpassword){
             return true;
        }
        else {
          return false;
        }
    }
  },

  methods: {

    registerUser(){
      const data = {
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        phone:this.user.phone
      };

      this.loading = true;
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
          .then((result)=>{
            console.log(result);

            const user = {
              email: result.user.email,
              token: result.user.refreshToken,
              uid: result.user.uid,
              name: data.name,
              phone: data.phone
            }

            //  console.log(user);

            //  localStorage.setItem('user', JSON.stringify(user));

            //  this.$store.commit('storeUser', user);
            //  this.$store.commit('setAuthenticationState', true);
            
            //success.
              this.user = {
                email:'',
                password:'',
                cpassword:''
              }

              this.addUserToDB(user);

              this.$router.push('/manage-accounts');
              
          })
          
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode)
            this.errorMessage = error.message;

            this.loading = false;
            // ...
          


          });
    },

    addUserToDB(user) {
      var db = firebase.firestore();
      db.collection("users").add({
              email: user.email,
              uid: user.uid,
              isSuperAdmin: false,
              isAdmin: true,
              name:user.name,
              phone:user.phone,
              center:null
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
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