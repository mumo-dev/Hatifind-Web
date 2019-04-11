<template>
  <div>
      <Header/>
      <div class="container" style="margin-top:10px">
        <!-- <a class="waves-effect waves-light btn right" href="/register">Register New Account</a> -->
        <!-- <div class="divider" style="clear:both;"></div> -->
        <div class="row">

          <form>
            <div class="col s6 m4">
                <div class="input-field">
                      <input  id="town" type="text" class="validate" required v-model="town">
                      <label for="town">Add Town (Name)</label>
                      <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
                </div>
            </div>
            <div class="col s6 m4" style="margin-top:20px;">
              <button class="waves-effect waves-light btn">ADD</button>
            </div>
          </form>

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

                  <select style="display:block!important">
                    <option value="" disabled selected>Choose the Town</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                <!-- <label for="center">Town</label>  -->
                      <!-- <span class="helper-text" data-error="wrong" data-success="right"></span> -->
            </div>
           
            <div class="col s6 m4" style="margin-top:20px;">
              <button class="waves-effect waves-light btn">ADD</button>
            </div>
          </form>
          
        </div>

      

        <div>
          <h6 class="center-align blue-text">Collection Centers</h6>
          <div class="divider"></div>
            <table class="bordered responsive-table highlight">
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Town</th>
                    <th>Officer</th>
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
  },

  data(){
    return {
      town:'',
      center:''
    }
  }
}
</script>

