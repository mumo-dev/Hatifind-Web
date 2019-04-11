<template>
  <div>
      <Header/>
      <div class="container" style="margin-top:10px">
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
                <tr>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                  <td><button
                       class="waves-effect waves-light btn  red darken-1">Delete</button></td>
                </tr>
                <tr>
                  <td>Alan</td>
                  <td>Jellybean</td>
                  <td>$3.76</td>
                </tr>
                <tr>
                  <td>Jonathan</td>
                  <td>Lollipop</td>
                  <td>$7.00</td>
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
  }
}
</script>

