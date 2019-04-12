<template>
  <div>
      <Header/>
      <div class="container" style="margin-top:10px">
        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
        <a class="waves-effect waves-light btn right" href="/register">Register New Account</a>
        <div class="divider" style="clear:both;"></div>

        <h6 class="center-align blue-text" style="margin-top:18px;">Collection Center Officer  Accounts</h6>
        <div>
            <table class="bordered highlight">
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Collection Center</th>
                    <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="user in users" :key="user.uid">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.center }}</td>
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
export default {
   components:{
      Header
  },

  data(){
      return {
        loading:false,
        users:[]
      }
  },

  mounted(){
    this.getOfficers();
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
              this.users.push(user);
          });

          this.loading = false;
      });
    },

  }
}
</script>

