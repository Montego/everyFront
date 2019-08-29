<template>
  <div>
    {{this.advice.text}}
    <div @click="getAdvice" class="img-placeholder">
    </div>

    <!--<button @click="getAdvice"> Advice</button>-->
  </div>

</template>

<script>
  import {mapGetters, mapState} from "vuex";
    export default {
        name: "AdviserBob",
      computed: {
        ...mapState('fuckingGreatAdvice',['advice',]),
        ...mapGetters('fuckingGreatAdvice',['get_advice']),
      },
      mounted(){
        this.$store.dispatch('fuckingGreatAdvice/onLoadAdvice');
      },
      methods: {
        getAdvice(){
          this.$store.dispatch('fuckingGreatAdvice/onLoadAdvice');
        }
      }
    }
</script>

<style scoped>
  .img-placeholder {
    /*margin-right: 30px;*/
    width: 220px;
    height: 300px;
    background: url('/src/assets/bob/zhabka.png') no-repeat 50% 50% / cover;
  }
</style>
