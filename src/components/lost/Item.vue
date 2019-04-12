<template>
 <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" :src="item.imageUrl" width="100%" height="150px">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4" style="font-size:18px; font-weight:400">
        {{ item.name }}  <i class="material-icons right">more_vert</i>
      </span>

        <table>
          <tbody>
            <tr>
              <td>Belongs To:</td>
              <td>   {{ item.belongsTo }} </td>
            </tr>
            <tr>
              <td>Collected By:</td>
              <td>   {{ item.collectedBy }} </td>
            </tr>
            <tr>
              <td>Date Collected:</td>
              <td>   {{ formattedDate}} </td>
            </tr>

            <tr>
              <td>Status</td>
              <td>   {{ item.paid ? 'Paid' : 'Not Paid'}} |
                     {{ item.reclaimed  ? 'Reclaimed' : 'Not Reclaimed'}}
              </td>
            </tr>
          </tbody>
        </table>
   

    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4" style="font-size:18px; font-weight:400">
        {{ item.name }}
        <i class="material-icons right">close</i></span>
     

        
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>   {{ item.id }} </td>
            </tr>
            <tr>
              <td>Belongs To:</td>
              <td>   {{ item.belongsTo }} </td>
            </tr>
            <tr>
              <td>Collected By:</td>
              <td>   {{ item.collectedBy }} </td>
            </tr>
            <tr>
              <td>Date Collected:</td>
              <td>   {{ formattedDate}} </td>
            </tr>

            <tr>
              <td>Status</td>
              <td>   {{ item.paid ? 'Paid' : 'Not Paid'}} |
                     {{ item.reclaimed  ? 'Reclaimed' : 'Not Reclaimed'}}
              </td>
            </tr>

            <tr>
              <td>Center:</td>
              <td>{{ item.center ? center: 'Unknown' }} </td>
            </tr>

            <tr>
              <td>Collector Paid</td>
              <td>   {{ item.collectoPpaid ? 'Paid' : 'Not Paid'}} 
              </td>
            </tr>


          </tbody>
        </table>

        <a class="waves-effect waves-light btn blue" style="margin-top:10px"
          :href="'/item/'+ item.id">Update Details</a>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {

  props:['item'],

  computed:{

    formattedDate(){
      var date= new Date(this.item.dateCollected.seconds * 1000)
      return moment(date).format('lll');
    }
  }
}
</script>

<style scoped>
    
    tr td{
      padding: 0;
      margin: 0;
      font-size: 1rem
    }
      
</style>


