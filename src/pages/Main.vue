<template>
  <div>
    <!--<div class="control_panel">-->
    <div>
      Теперь я: {{this.role}}
      <v-btn @click="changeRoleOnUser" >сменить роль на user</v-btn>
      <v-btn @click="changeRoleOnAdmin">сменить роль на admin</v-btn>
      <!--<v-icon class="col-sm-1" >exit_to_app</v-icon>-->
    </div>

    <div class="row workplace_filekeeper_wraper">
      <Workplace class="component col-9"></Workplace>
      <FileInfo  class="component_fileInfo col-3"></FileInfo>
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
  .control_panel {
    display: flex;
    justify-content: flex-end
  }
  /*.container {*/
    /*padding-left: 10px;*/
    /*padding-right: 10px;*/
  /*}*/
  .workplace_filekeeper_wraper {
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
