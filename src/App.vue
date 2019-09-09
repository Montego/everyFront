<template>
  <div class="section">
    <!--<Header></Header>-->
    <div class="container">
      <Main class="section_inner"></Main>
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
    data: () => ({
      //
    }),
  };
</script>
<style scoped>
  .container {
    padding-left: 10px;
    padding-right: 10px;
  }
  .section {
    min-height: 100vh;
    background: url('/src/assets/image/background_image_1.jpg')no-repeat 50% 50% / cover;

  }
  .section_inner {
    background: white;
    min-height: 90vh;
    opacity: 0.85;
    border-radius: 5px;
  }
</style>
