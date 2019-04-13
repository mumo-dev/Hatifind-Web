<template>
  <div>
    <Header/>
    <div class="container">

    <div class="progress" v-show="loading">
        <div class="indeterminate"></div>
    </div>

    <div class="card" v-show="error">
      <div class="card-content">
        <p>{{ errorMessage }}</p>
      </div>
    </div>

      <div class="row" style="margin:10px auto;" v-if="loaded">
        <div class="col s12">
          <h5>Update Details</h5>
          <div class="card">
           
            <div class="card-content">
              <h5 class="teal-text">{{ item.name }}</h5>
            
              <table>
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>{{ item.id }}</td>
                  </tr>
                  <tr>
                    <td>Belongs To:</td>
                    <td>{{ item.belongsTo }}</td>
                  </tr>
                  <tr>
                    <td>Collected By:</td>
                    <td>{{ item.collectedBy }}- {{ item.phone }}</td>
                  </tr>
                  <tr>
                    <td>Date Collected:</td>
                    <td>{{ formattedDate}}</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>
                      {{ item.paid ? 'Paid' : 'Not Paid'}} |
                      {{ item.reclaimed ? 'Reclaimed' : 'Not Reclaimed'}}
                    </td>
                    
                  </tr>

                  <tr v-if="item.dateReclaimed">
                    <td>Date Reclaimed:</td>
                    <td>{{ reclaimedFormattedDate }}</td>
                  </tr>

                  <tr>
                    <td>Center:</td>
                    <td>{{ item.center ? item.center: 'Unknown' }}</td>
                  </tr>

                  <tr>
                    <td>Collector Paid</td>
                    <td>{{ item.collectorPaid ? 'Paid' : 'Not Paid'}}</td>
                  </tr>

                  <tr><td colspan="2" class="teal white-text">UPDATES</td></tr>

                  <tr v-if="!item.center">
                    <td>Collection Center</td>
                    <td>
                    <select v-model="center" @change="updateCenterDetails">
                      <option value=""> Choose Below </option>
                      <option v-for="center in collectionCenters" 
                      :key="center.id" v-bind:value="center.name">{{ center.name}}</option>
                     
                    </select>
                    </td>
                  </tr>

                  <tr v-if="!item.paid">
                    <td>Owner Paid</td>
                    <td>
                    <select v-model="ownerPaid" @change="updateOwnerPaymentDetails">
                      <option value=""> Choose Below </option>
                      <option value=true>YES</option>
                      <option value=false>NO</option>
                    </select>
                    </td>
                  </tr>

                  <tr v-if="!item.reclaimed">
                    <td>Reclaimed</td>
                    <td>
                    <select v-model="reclaimed" @change="updateToReclaimed">
                      <option value=""> Choose Below </option>
                      <option value=true>YES</option>
                      <option value=false>NO</option>
               
                    </select>
                    </td>
                  </tr>

                  <tr v-if="!item.collectorPaid">
                    <td>Collector Paid</td>
                    <td>
                    <select v-model="collectorPaid" @change="updateCollectorPaymentDetails">
                      <option value=""> Choose Below </option>
                      <option value=true>YES</option>
                      <option value=false>NO</option>
                    </select>
                    </td>
                  </tr>

                  <!-- <tr>
                    <td><button class="waves-effect waves-light btn " @click.prevent="updateDetails">UPDATE</button></td>
                  </tr> -->

                </tbody>
              </table>

            </div>

           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Header from "../Header.vue";
export default {
  // props:['item'],

  mounted() {
    const id = this.$route.params.id;
    this.fetchItem(id);
    this.fetchCollectionCenters();
  },

  data() {
    return {
      item:{},
      loading: false,
      error: false,
      errorMessage: "",
      loaded:false,
      collectionCenters:[],
      
      center:"",
      ownerPaid:'',
      collectorPaid:'',
      reclaimed:''

    };
  },

  methods: {

    updateCenterDetails(){
        this.loading = true;
        var db = firebase.firestore();
        db.collection("items").doc(this.item.id).update({
          'center': this.center
        }).then(()=> {
          this.loading = false;
          this.item.center = this.center;
          console.log("Document successfully written!");
        }).catch((error) =>{
          this.loading = false;
          this.error = true;
          this.errorMessage = error.message
          console.error("Error writing document: ", error);
       });

    },

    updateOwnerPaymentDetails(){
        this.loading = true;
        //TODO update payment table
        var db = firebase.firestore();

        if(!this.item.center){
          alert('Update the Collection Center first');
          return;
        }

        db.collection("payments").doc(this.item.id).set({
          'itemId': this.item.id,
          'center': this.item.center,
          'paidBy': 'customer',
          'paidTo': 'center',
          'date': new Date()
        });

        db.collection("items").doc(this.item.id).update({
          'paid': this.ownerPaid
        }).then(()=> {
          this.loading = false;
          this.item.paid = this.ownerPaid;
          console.log("Document successfully written!");
        }).catch((error) =>{
          this.loading = false;
          this.error = true;
          this.errorMessage = error.message
          console.error("Error writing document: ", error);
       });

    },

    updateCollectorPaymentDetails(){
      //TODO update payment table ---
        this.loading = true;
        var db = firebase.firestore();

        if(!this.item.center){
          alert('Update the Collection Center first');
          return;
        }

        db.collection("payments").doc(this.item.id).set({
          'itemId': this.item.id,
          'center': this.item.center,
          'paidBy': 'center',
          'paidTo': this.item.collectedBy,
          'date': new Date()
        })

        db.collection("items").doc(this.item.id).update({
          'collectorPaid': this.collectorPaid
        }).then(()=> {
          this.loading = false;
          this.item.collectorPaid = this.collectorPaid;
          console.log("Document successfully written!");
        }).catch((error) =>{
          this.loading = false;
          this.error = true;
          this.errorMessage = error.message
          console.error("Error writing document: ", error);
       });

    },


    
    updateToReclaimed(){
        this.loading = true;
        var db = firebase.firestore();
        db.collection("items").doc(this.item.id).update({
          'reclaimed': this.reclaimed,
          'dateReclaimed': new Date()
        }).then(()=> {
          this.loading = false;
          this.item.reclaimed = this.reclaimed;
          // this.item.dateReclaimed = new Date();
          console.log("Document successfully written!");
        }).catch((error) =>{
          this.loading = false;
          this.error = true;
          this.errorMessage = error.message
          console.error("Error writing document: ", error);
       });

    },

    fetchItem(id) {
      this.loading = true;
      var db = firebase.firestore();
      db.collection("items")
        .doc(id)
        .get()
        .then(doc => {
          this.loading = false;
          
          if(doc.exists){
              this.loaded = true;
              const item = doc.data();
              this.error = false;
              item["id"] = doc.id;
              this.item = item;
          }else {
            this.loaded = false;
            this.error = true;
            this.errorMessage = "Whoops :) Seems the Item does not exist";
          }
        })
        .catch(err => {
          this.loading = true;
          this.error = true;
          this.errorMessage = err.message || "could fetch  the  item";
        });
    },

     fetchCollectionCenters(){
        this.loading = true;
        this.loaded = false;
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
            this.loaded = true;
         }).catch(error=>{
            this.errorMessage = error.message
            this.loaded = true
         });
    },

  },

  components: {
    Header
  },

  computed: {
    formattedDate() {
      var date = new Date(this.item.dateCollected.seconds * 1000);
      return moment(date).format("lll");
    },

     reclaimedFormattedDate() {
      var date = new Date(this.item.dateReclaimed.seconds * 1000);
      return moment(date).format("lll");
    }
  }
};
</script>

<style scoped>
  select {
    display: inline-block;
  }
</style>


