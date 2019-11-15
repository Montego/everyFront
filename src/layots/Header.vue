<template>
  <div class="header">
    <div class="row">
      <div class="col-sm">
        <v-btn class="col-sm-1" @click="goToIntro">Вводная</v-btn>
        <v-btn class="col-sm-3" @click="goToTreeStore">Методические материалы</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Header",
    components: {},
    data() {
      return {}
    },
    methods: {

      goToTreeStore() {
        this.$store.dispatch('tree/updateTree');
        this.$store.dispatch('tree/updateTreeUser');
        // this.$refs.workplace.refreshAll;
        this.$router.push('treeStore');
      },
      goToIntro() {
        this.$router.push('intro');
      }
    },

  }
</script>

<style scoped>
  .header {
    background: white;
    opacity: 0.85;
    min-height: 40px;
  }
</style>
