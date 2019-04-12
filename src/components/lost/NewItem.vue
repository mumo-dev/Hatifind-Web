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
                    <input  id="item-name" type="text" class="validate" v-model="item.name" required >
                    <label for="item-name">Item Name</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="belongs-to" type="text" class="validate" required  v-model="item.belongsTo">
                    <label for="belongs-to">Belongs To:</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="collected_by" type="text" class="validate" required  v-model="item.collectedBy">
                    <label for="collected_by">Collected By:</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="phone" type="text" class="validate" required  v-model="item.phone">
                    <label for="phone">Your phone number:</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="input-field">
                    <input  id="location" type="text" class="validate" required v-model="item.location">
                    <label for="location">Where Collected?</label>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                  </div>

                  <div class="file-field input-field">
                    <div class="btn btn-flat">
                      <span>Item Photo</span>
                      <input type="file" ref="file" accept="image/*" @change="updateImageRef($event)">
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate" type="text">
                    </div>
                  </div>

                


                  <button  type="submit" class="waves-effect waves-light btn"
                   :disabled="!dataIsValid"
                   @click.prevent="uploadDataToServer">
                    Upload <i class="material-icons right" >send</i>
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
      loading:false,
      item:{
        name:'',
        belongsTo:'',
        collectedBy:'',
        phone:'',
        location:'',
        
      },
      file:''
    }
  },

  computed:{
    dataIsValid(){
        if(this.item.name && this.item.belongsTo && this.item.collectedBy
           && this.item.phone && this.item.location && this.file){
             return true;
        }
        else {
          return false;
        }
    },

    image(){
      return this.$refs.file.files[0];
    }
  },

  methods: {

      uploadData(url){
        var db = firebase.firestore()
        db.collection("items").add({
            name: this.item.name,
            belongsTo: this.item.belongsTo,
            collectedBy: this.item.collectedBy,
            phone: this.item.phone,
            location:this.item.location,
            imageUrl:url,
            dateCollected:new Date(),
            dateReclaimed: null,
            paid: false,
            reclaimed:false,
            collectorPaid:false
      }).then((docRef)=> {
          // this.updateUsers(data.officer);
          this.loading = false;
         
          console.log("Center Document written with ID: ", docRef.id);


      }).catch((error) =>{
          this.loading = false;
          console.error("Error adding document: ", error);
          this.errorMessage = error.message
      });
      },
      updateImageRef(event){
      
        this.file= this.$refs.file.files[0];

        // this.uploadImage();
      },

      uploadDataToServer(){
            this.loading = true;

            var storage = firebase.storage();
      
            var storageRef = storage.ref('images');
            var imagename = this.generateId()+ this.file.name;
            console.log(imagename);
            var imagesRef = storageRef.child(imagename);

            var file = this.file// use the Blob or File API
            imagesRef.put(file).then((snapshot)=> {
                console.log('Uploaded a blob or file!');
                imagesRef.getDownloadURL().then((url)=> {
                  // this.$data.imageUrl = url;
                  // console.log(url)
                  this.uploadData(url);

                  this.$router.push('/dashboard')
                })
          });
      },

    // dec2hex :: Integer -> String
      dec2hex (dec) {
        return ('0' + dec.toString(16)).substr(-2)
      },

      // generateId :: Integer -> String
      generateId (len) {
            var arr = new Uint8Array((len || 40) / 2)
            crypto.getRandomValues(arr)
            return Array.from(arr, this.dec2hex).join('')
      }
   
  
  }
};
</script>

<style scoped>

.container {
  margin: 20px auto !important;  
}

</style>