<template>
  <div class="header">
    <div class="row">
      <div class="col-sm">
        <v-btn class="col-sm-1" >Home</v-btn>
        <v-btn class="col-sm-3" >Список пользователей</v-btn>
      </div>
      <div class="col-sm-1 control_panel">
        <!--<label>User</label>-->
        <v-icon class="col-sm escape_icon" @click="logout">exit_to_app</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
    import Workplace from "../components/Workplace";
    export default {
      name: "Header",
      components: {Workplace},
      data() {
        return {
        }
      },
      methods: {
        logout(){
          location.href = 'login';
        }
      }
    }
</script>

<style scoped>
  .escape_icon:hover {
    border-radius: 50%;
    /*background: #786b59;*/
    /*background: #D2B48C;*/
    /*font-size: 1.7em;*/
    background: #D3D3D3;
    margin: 0;
  }
  .escape_icon {
    color: blue;
    font-size: 2.3em;
  }
  .control_panel {
    display: flex;
    justify-content: flex-end
  }
  .header {
    background: white;
    opacity: 0.85;
    min-height: 40px;
  }
</style>
