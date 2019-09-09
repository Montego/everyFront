<template>
  <div>
    <!--<div>-->
      <!--<Navigation class="component"></Navigation>-->
    <!--</div>-->
    Теперь я: {{this.role}}
    <v-btn @click="changeRoleOnUser">сменить роль на user</v-btn>
    <v-btn @click="changeRoleOnAdmin">сменить роль на admin</v-btn>
    <div class="row workplace_wraper">
      <!--<InfoLine class="component col-sm-4"></InfoLine>-->
      <Workplace class="component col-8"></Workplace>
      <FileInfo  class="component_fileInfo col-4"></FileInfo>
    </div>



  </div>

</template>

<script>
  import InfoLine from "../components/InfoLine";
  import Navigation from "../components/Navigation";
  import Workplace from "../components/Workplace";
  import AdviserBob from "../components/AdviserBob";
  import FileInfo from "../components/FileInfo";
  import {mapGetters, mapState} from "vuex";

  export default {
        name: "Main",
      computed: {
        ...mapState('user',['role',]),
        ...mapGetters('user',['get_role']),
      },
      methods: {
        changeRoleOnUser(){
          this.$store.dispatch('user/onChangeRole',"user");
        },
        changeRoleOnAdmin(){
          this.$store.dispatch('user/onChangeRole',"admin");
        },
      },
        components: {FileInfo, AdviserBob, Workplace, Navigation, InfoLine}
    }
</script>

<style scoped>
  /*.container {*/
    /*padding-left: 10px;*/
    /*padding-right: 10px;*/
  /*}*/
  .workplace_wraper {
    margin-left: 0;
    margin-right: 0;
  }

  .component {
    border: 1px solid #c5c5c5;
    border-radius: 3px;
    min-height: 90vh;
    height: 600px;
    overflow: scroll;
  }
  .component_fileInfo {
    border: 1px solid #c5c5c5;
    border-radius: 3px;
    min-height: 90vh;
    height: 600px;
    /*overflow: scroll;*/
  }
</style>
