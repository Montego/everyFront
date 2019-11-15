<template>
  <div class="header">
    <div class="row">
      <div class="col-sm">
        <v-btn class="col-sm-1" @click="goToIntro">Вводная</v-btn>
        <v-btn class="col-sm-3" @click="goToTreeStore">Методические материалы</v-btn>
      </div>
      <div class="col-sm-1 control_panel">
        <!--<label>User</label>-->
        <v-icon class="col-sm-6 escape_icon" @click="logout">exit_to_app</v-icon>
      </div>
    </div>

    <!--<Workplace ref="workplace" name="Workplace" class="component col-9" hidden></Workplace>-->
  </div>
</template>

<script>

    export default {
      name: "Header",
      components: {
        // Workplace
      },
      data() {
        return {
        }
      },
      methods: {
        logout(){
          location.href = 'login';
        },
        goToTreeStore(){
          // location.href = 'treeStore';
          this.$store.dispatch('tree/updateTree');
          this.$store.dispatch('tree/updateTreeUser');
          console.log(this.$refs.workplace);
          // this.$refs.workplace.refreshAll;
          this.$router.push('treeStore');

        },
        goToIntro(){
          this.$router.push('intro');
        }
      },

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
