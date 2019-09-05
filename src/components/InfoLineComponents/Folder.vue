<template>
  <div>
    <ul>

      <label @click="isOpen">
        <v-icon v-if="open===false" class="col-sm-1" color="#D2B48C">folder</v-icon>
        <i v-else class="fas fa-folder-open"></i>
        <input v-if="this.role!=='user'" class="col-sm-7" v-model="folder_name" placeholder="Введите название папки" >
        <input v-else class="col-sm-9" v-model="folder_name" disabled >
      </label>

      <v-icon v-if="this.role!=='user'" @click="addOptions" class="col-sm-1" color="#5bc0de">add</v-icon>
      <v-icon v-if="this.role!=='user'" class="col-sm-1" color="#5bc0de">delete</v-icon>
      <v-icon class="col-sm-1" color="#5bc0de">help</v-icon>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";

    export default {
        name: "Folder",
      data(){
        return{
          folder_name:'Новая папка',
          open: false
        }
      },
      computed: {
        ...mapState('user',['role',]),
        ...mapGetters('user',['get_role']),
      },
      methods: {
          addOptions(){

          },
          isOpen(){
            this.open = !this.open;
            console.log(this.open)
          }
      }
    }
</script>

<style scoped>
 .fa-folder-open {
   color: #D2B48C;
   margin-left: 3px;
   font-size: 1.3em;
   text-shadow: 0 0 6px #000;
 }
</style>
