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
            <h5 class="card-title center-align teal-text " style="font-weight:500">Upload Lost Item</h5>
            <form >
                <!-- <div class="row"> -->
                  <div class="input-field">
                    <input  id="item-name" type="text" class="validate" required >
                    <label for="item-name">Item Name</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="belongs-to" type="text" class="validate" required >
                    <label for="belongs-to">Belongs To:</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="collected_by" type="text" class="validate" required >
                    <label for="collected_by">Collected By:</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="phone" type="text" class="validate" required >
                    <label for="phone">Your phone number:</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="location" type="text" class="validate" required >
                    <label for="location">Where Collected?</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="file-field input-field">
                    <div class="btn btn-flat">
                      <span>Item Photo</span>
                      <input type="file">
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate" type="text">
                    </div>
                  </div>

                


                  <button  type="submit" class="waves-effect waves-light btn">
                    Upload <i class="material-icons right">send</i>
                  </button>

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
import Header from '../Header.vue'
export default {
  components:{
      Header
  },
  data() {
    return {
      errorMessage:'',
      loading:false
    }
  },

  computed:{
    // dataIsValid(){
    //     if(this.user.email && this.user.password && this.user.cpassword
    //        && this.user.password == this.user.cpassword){
    //          return true;
    //     }
    //     else {
    //       return false;
    //     }
    // }
  },

  methods: {

    
  }
};
</script>

<style scoped>

.container {
  margin: 20px auto !important;  
}

</style>