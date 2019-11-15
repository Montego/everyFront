<template>
  <div>
    <div>
      <v-btn @click="changeRoleOnUser">сменить роль на user</v-btn>
      <v-btn @click="changeRoleOnAdmin">сменить роль на admin</v-btn>
    </div>
    <div class="row workplace_filekeeper_wraper" v-if="this.role=='user'">
      <Workplace ref="workplace" class="component col-sm-3"></Workplace>
      <FileInfo class="component_fileInfo col-sm-9"></FileInfo>
    </div>
    <div class="row workplace_filekeeper_wraper" v-else>
      <Workplace ref="workplace" class="component col-sm-9"></Workplace>
      <FileInfo class="component_fileInfo col-sm-3"></FileInfo>
    </div>

  </div>

</template>

<script>
  import Workplace from "../components/Workplace";
  import FileInfo from "../components/FileInfo";
  import {mapGetters, mapState} from "vuex";
  import Header from "../layots/Header";

  export default {
    name: "Main",
    computed: {
      ...mapState('user', ['role',]),
      ...mapGetters('user', ['get_role']),
    },
    methods: {
      changeRoleOnUser() {
        this.$store.dispatch('user/onChangeRole', "user");
        this.$store.dispatch('tree/updateTreeUser');
      },
      changeRoleOnAdmin() {
        this.$store.dispatch('user/onChangeRole', "admin");
        this.$store.dispatch('tree/updateTree');
      },
    },
    components: {Header, FileInfo, Workplace}
  }
</script>

<style scoped>
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
