<template>
  <div class="section">
    <!--<Header></Header>-->
    <div class="container">
      <router-view class="section_inner">
      </router-view>
      <!--<Main class="section_inner"></Main>-->
    </div>
  </div>
</template>

<script>
  import Main from "./pages/Main";
  import Header from "./layots/Header";
  import {AXIOS} from "./plugins/APIService";

  export default {
    name: 'App',
    components: {
      Header,
      Main,
    },
    data: () => ({
      //
    }),
    created: function () {
      AXIOS.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized, logout the user
            console.log('error dd')
            this.$store.dispatch(AUTH_LOGOUT)
            // you can also redirect to /login if needed !
          }
          throw err;
        });
      });
    }
  };
</script>
<style scoped>
  .container {
    padding-left: 5px;
    padding-right: 5px;
    /*margin-left: 40px;*/
    /*margin-right: 40px;*/
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
