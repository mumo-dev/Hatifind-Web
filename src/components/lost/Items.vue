<template>
  <div class="row">
    <div class="col s12 m4" v-for="item in 20" :key="item" >

        <app-item></app-item>

    </div>

  </div>

</template>

<script>
import Item from './Item.vue'
export default {
  components:{
    'app-item':Item
  }
}
</script>

