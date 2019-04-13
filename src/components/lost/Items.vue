<template>
  <div class="row">

    <div class="progress" v-show="loading">
        <div class="indeterminate"></div>
    </div>
    <div class="card" v-show="errorMessage">
      <div class="card-content">
        <p>Error Loading data. Refresh the page to try again</p>
      </div>
    </div>

    <div class="search-bar">
      <div class="input-field col s9">
        <input type="text" v-model="searchTerm">
        <label>Search by Item Name</label>
      </div>
     
      <div class="col-s3">
        <button class="waves-effect waves-light btn" style="margin-top:20px" 
        @click.prevent="searchItem">Search</button>
      </div>
    </div>

    <div class="col s12 m6 l4" v-for="item in items" :key="item.id" >
        
        <app-item :item="item"></app-item>

    </div>

  </div>

</template>

<script>
import Item from './Item.vue'
export default {
  components:{
    'app-item':Item
  },

  mounted(){

      this.fetchLostItems();
  },

  data(){

    return {

      items:[],
      loading:false,
      errorMessage:false,
      searchTerm:''
    }
  },

  methods:{
    fetchLostItems() {
      this.loading = true;
      var db = firebase.firestore();
      db.collection("items").orderBy("dateCollected", "desc").limit(50)
        .get()
        .then((querySnapshot)=> {
            querySnapshot.forEach((doc) =>{
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                const item = doc.data();
                item['id'] = doc.id;
                this.items.push(item);
            });

            this.loading = false;
            this.errorMessage = false
        })
        .catch((error)=> {
             this.loading = false;
             this.errorMessage = true;
            console.log("Error getting documents: ", error);
        });
    },

    searchItem() {
      
    }
  }
}
</script>

