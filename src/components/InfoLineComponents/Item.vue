<template>
  <div>
    <li>
      <label>
        <!--<v-icon class="col-sm-1" color="#5bc0de">sticky-note</v-icon>-->
        <i class="col-sm-1 fas fa-sticky-note" ></i>
        <input class="col-sm-7" v-model="item_name" placeholder="название файла" disabled>
      </label>
      <i class="col-sm-1 fas fa-download"></i>
      <v-icon v-if="this.role!=='user'" class="col-sm-1" color="#5bc0de">delete</v-icon>
      <!--<v-icon class="col-sm-1" color="#5bc0de">download</v-icon>-->
    </li>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";

    export default {
        name: "Item",
      data(){
        return{
          item_name:'',

        }
      },
      computed: {
        ...mapState('user',['role',]),
        ...mapGetters('user',['get_role']),
      },
    }
</script>

<style scoped>
 .fa-sticky-note {
   color: #5bc0de;
 }
</style>
