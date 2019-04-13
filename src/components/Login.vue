<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m6 offset-m3">
         <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
        <div class="card">

          <p class="red accent-2 center-align" v-if="errorMessage"
          style="padding:4px;margin:4px;border-radius:4px">
              {{ errorMessage }}
          </p>
          
          <div class="card-content">
            <h5 class="card-title center-align teal-text " style="font-weight:500">Login</h5>
            <form >
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

                  


                  <button  type="submit" class="waves-effect waves-light btn"
                      @click.prevent="loginUser()" :disabled="!dataIsValid ||loading"
                  >Login</button>

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
      },
      loading:false,
      errorMessage:''
    }
  },

  computed:{
    dataIsValid(){
        if(this.user.email && this.user.password){
             return true;
        }
        else {
          return false;
        }
    }
  },

  methods: {

    loginUser(){
      const data = {
        email: this.user.email,
        password: this.user.password
      };

      this.loading = true;
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
          .then((result)=>{
            console.log(result);

            const db=  firebase.firestore();
            let user ={};
            db.collection('users').where('email','==',data.email)
              .get()
              .then((querySnapshot)=> {
                    querySnapshot.forEach((doc)=> {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        user = doc.data();
                        console.log(user);

                        localStorage.setItem('user', JSON.stringify(user));

                        this.$store.commit('storeUser', user);
                        this.$store.commit('setAuthenticationState', true);

                        //success.
                        this.user = {
                          email:'',
                          password:''
                        }

                    // this.addUserToDB(user);

                      this.$router.push('/dashboard');
                    });
                })
                .catch((error) => {
                      this.errorMessage = error.message
                    console.log("Error getting documents: ", error);
                }); 

          })
          
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode)
            this.errorMessage = error.message;

            this.loading = false;
      

          });
    },

  }
};
</script>

<style scoped>

.container {
  margin: 100px auto !important;  
}

</style>


