<template>
  <div class="section">
    <Header v-if="this.$router.currentRoute.fullPath!=='/login'"></Header>
    <div class="container">
      <router-view class="section_inner">
      </router-view>
    </div>
  </div>
</template>

<script>
  import Main from "./pages/Main";
  import Header from "./layots/Header";

  export default {
    name: 'App',
    components: {
      Header,
      Main,
    },
    data: () => ({}),

  };
</script>
<style scoped>
  .container {
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 0;

  }

  .section {
    min-height: 100vh;
    background: url('/src/assets/image/background_image_1.jpg') no-repeat 50% 50% / cover;
  }

  .section_inner {
    background: white;
    min-height: 90vh;
    opacity: 0.85;
    border-radius: 5px;
  }
</style>
