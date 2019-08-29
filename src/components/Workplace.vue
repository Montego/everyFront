<template>
<div>
  <!--{{this.advice.text}}-->
  <p>
    воркплейс
  </p>
  {{this.answerFromServer}}

  <button @click="getTest"> Test server</button>
  <!--<button @click="getAdvice"> Advice</button>-->
</div>

</template>

<script>
  import {mapGetters, mapState} from "vuex";

    export default {
        name: "Workplace",
      data(){
        return{
        }
      },
      computed: {
        ...mapState('checkAliveServer',['answerFromServer',]),
        ...mapGetters('checkAliveServer',['get_answerFromServer']),
        // ...mapState('fuckingGreatAdvice',['advice',]),
        // ...mapGetters('fuckingGreatAdvice',['get_advice']),
      },
      methods: {
        getTest(){
          this.$store.dispatch('checkAliveServer/onLoadAnswerFromServer');
        },
        // getAdvice(){
        //   this.$store.dispatch('fuckingGreatAdvice/onLoadAdvice');
        // }
      }
    }

</script>

<style scoped>

</style>
