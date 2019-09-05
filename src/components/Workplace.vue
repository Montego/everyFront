<template>
<div>
  <!--{{this.advice.text}}-->
  <div>
    Теперь я: {{this.role}}
  </div>
  <v-btn @click="changeRoleOnUser">сменить роль на user</v-btn>
  <v-btn @click="changeRoleOnAdmin">сменить роль на admin</v-btn>
  <p>
    информация о файле- папке-
  </p>
  {{this.answerFromServer}}

  <button @click="getTest"> Test server</button>
  <!--<button @click="getAdvice"> Advice</button>-->
  <AdviserBob v-if="role!=='user'" class="bob"></AdviserBob>
</div>

</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import AdviserBob from "./AdviserBob";

    export default {
        name: "Workplace",
      components: {AdviserBob},
      data(){
        return{
          // role:"user"
        }
      },
      computed: {
        ...mapState('checkAliveServer',['answerFromServer',]),
        ...mapGetters('checkAliveServer',['get_answerFromServer']),
        ...mapState('user',['role',]),
        ...mapGetters('user',['get_role']),
        // ...mapState('fuckingGreatAdvice',['advice',]),
        // ...mapGetters('fuckingGreatAdvice',['get_advice']),
      },
      methods: {
        changeRoleOnUser(){
          this.$store.dispatch('user/onChangeRole',"user");
          // this.role = "user";
        },
        changeRoleOnAdmin(){
          // this.role = "admin";
          this.$store.dispatch('user/onChangeRole',"admin");
        },
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
  .bob {
    position: absolute; /* Абсолютное позиционирование */
    bottom: 15px; /* Положение от нижнего края */
    right: 15px; /* Положение от правого края */
    line-height: 1px;
  }
</style>
