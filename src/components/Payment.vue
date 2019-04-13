<template>
  <div>
    <Header/>
    <div class="container-fluid">
      <!-- <app-items></app-items> -->
     <div class="progress" v-show="loading">
        <div class="indeterminate"></div>
    </div>

    <div class="card" v-show="error">
      <div class="card-content">
        <p>{{ errorMessage }}</p>
      </div>
    </div>

      <div class="row">
        <div class="col s12">
          <h5 class="center-align">Payment Details for  {{ center }} Center</h5>
          <div class="card">
            <div class="card-content">
                <table class="responsive-table">
                  <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Paid By</th>
                        <th>Paid To</th>
                        <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="payment in payments" :key="payment.id">
                      <td>{{payment.id}}</td>
                      <td>{{ payment.itemId }}</td>
                      <td>{{ payment.itemName }}</td>
                      <td>{{ payment.paidBy }}</td>
                      <td>{{ payment.paidTo }}</td>
                      <td>{{ formatDate(payment.date) }}</td>
                    </tr>
                    
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
import Header from './Header'
import moment from 'moment'
export default {
  components:{
      Header
  },

  mounted(){
    this.fetchPaymentDetails();
  },

  data(){
    return {
      payments:[],
      loading:false,
      error:false,
      errorMessage:''
    }
  },

  computed: {
    center() {
      return this.$store.getters.user.center;
    },

  },

  methods: {

    formatDate(date){
      var dateGF = new Date(date.seconds * 1000);
      return moment(dateGF).format("lll");
    },

    fetchPaymentDetails() {
      this.loading = true;
      const db = firebase.firestore();
      db.collection('payments')
      .where('center', '==', this.center)
      .orderBy('date','desc')
      .get()
      .then((querySnapshot)=> {
        this.loading = false;
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const payment = doc.data();
            payment['id'] = doc.id;

            this.payments.push(payment)
        });
       })
      .catch((error) =>{
          this.loading = false;
          this.error = true;
          this.errorMessage = error.message;
          console.log("Error getting documents: ", error);
      });

    }
  }
}
</script>

<style>
    @media only screen and (min-width: 993px){
            .container {
              width: 85%;
       }
    }
</style>


