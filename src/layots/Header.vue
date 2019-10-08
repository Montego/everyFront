<template>
  <div class="header">
    <div>

    </div>
    <div class="control_panel">
      <v-icon class="col-sm-1 escape_icon" @click="logout">exit_to_app</v-icon>
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
