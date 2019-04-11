<template>
  <div>
    <Header/>
    <div class="container">
      <app-items></app-items>
    </div>
  </div>
</template>
<script>
import Header from './Header'
import Items from './lost/Items'
export default {
  components:{
      Header,
      'app-items': Items
  }
}
</script>

