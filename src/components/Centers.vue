<template>
  <div>
      <Header/>
      <div class="container" style="margin-top:10px">
        <!-- <a class="waves-effect waves-light btn right" href="/register">Register New Account</a> -->
        <!-- <div class="divider" style="clear:both;"></div> -->
     
        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>

        <div class="row">

          <form>
            <div class="col s6 m4">
                <div class="input-field">
                      <input id="center" type="text" class="validate" required v-model="center">
                      <label for="center">Collection Center</label> 
                      <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                </div>
            </div>
       
            <div class="input-field col s6 m4 browser-default" >

                  <select style="display:block!important" 
                  id="center" v-model="officerSelected">
                    <option :value="officer" disabled >Choose Officer</option>

                    <option v-for="user in users" 
                      :value="user.name" :key="user.uid">{{ user.name}}</option>
                  
                  </select>
                <!-- <label for="center">Choose Officer</label>  -->
                      <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
            </div>
           
            <div class="col s6 m4" style="margin-top:18px;">
              <button class="waves-effect waves-light btn" @click.prevent="addCenter">ADD CENTER</button>
            </div>
          </form>
          
        </div>

      

        <div>
          <h6 class="center-align blue-text">Collection Centers</h6>
          <div class="divider"></div>
            <table class="bordered  highlight">
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Officer</th>
                    <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="center in collectionCenters" :key="center.id">
                  <td>{{ center.name }}</td>
                  <td> {{ center.officer }} </td>
                  <td><button
                       class="waves-effect waves-light btn  red darken-1">Delete</button></td>
                </tr>
               
              </tbody>
            </table>
        </div>

      </div>
  </div>
</template>
<script>
import Header from './Header'
import { error } from 'util';

export default {
   components:{
      Header
  },

  data(){
    return {
   
      center:'',
      users:[],
      officer: 'Choose Officer',
      officerSelected:'',
      loading:false,
      collectionCenters:[],
      errorMessage:'',

    }
  },

  mounted(){
      this.getOfficers();
      this.fetchCollectionCenters();
  },

  computed:{
    // selecteduser(){
    //   let us;
    //   this.users.forEach((elem)=>{
    //     if(elem.name == 'Sam'){
    //         us = elem;
    //         // break;
    //     }
    //   });
    //   return us;

    // }
  },

  methods:{

    getOfficers() {
        this.loading = true;
        const db  = firebase.firestore();
        db.collection("users")
        .where("isSuperAdmin", "==", false)
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // console.log(`${doc.id} => ${doc.data()}`);
              const user = doc.data();
              user['id'] = doc.id;
              this.users.push(user);
          });

          this.loading = false;
      });
    },

    fetchCollectionCenters(){
        this.loading = true;
        const db  = firebase.firestore();
        db.collection("centers")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                const center = doc.data();
                center['id'] = doc.id;
                this.collectionCenters.push(center);
            });

            this.loading = false;
         }).catch(error=>{
            this.errorMessage = error.message
         });
    },

    addCenter(){

      const data = {
              name: this.center,
              officer: this.officerSelected
      }
      if(!this.center || !this.officerSelected){
        alert('Fill all the fields'+ data.name);
        return;
      }

     
      

      this.loading = true;
      const db  = firebase.firestore();
      db.collection("centers").add({
        name: this.center,
        officer: this.officerSelected
      }).then((docRef)=> {
          this.updateUsers(data.officer);
          this.loading = false;
          data['id'] = Math.floor(Math.random() * 100);
          this.collectionCenters.push(data)
          this.center ='';
          this.officerSelected=''
          console.log("Center Document written with ID: ", docRef.id);


      }).catch((error) =>{
          this.loading = false;
          console.error("Error adding document: ", error);
      });
    },

    updateUsers(username) {
      let selecteduser;
      this.users.forEach((user)=>{
        if(user.name == username){
            selecteduser = user;
            return;
        }
      });
      const db  = firebase.firestore();
       db.collection("users").doc(selecteduser.id).update({
            center: this.center
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

  }
}
</script>

