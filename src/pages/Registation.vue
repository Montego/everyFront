<template>
  <div class="align-content-center">
    <h1>Регистрация</h1>
    <form class="form" action="" method="post">
      <label class="form__row">
        <div class="form__label-text">Логин:</div>
        <input class="form__input" type="text" name="username" value="" v-model="userName" placeholder="Имя пользователя" required/>
      </label>
      <label class="form__row">
        <div class="form__label-text">Почта:</div>
        <input class="form__input" type="email" name="email" value="" v-model="email" placeholder="Почтовый ящик" required/>
      </label>
      <label class="form__row">
        <div class="form__label-text">Пароль:</div>
        <input class="form__input" type="password" name="password" v-model="password" placeholder="Пароль" required/>
      </label>
      <label class="form__row">
        <div class="form__label-text">Повторите пароль:</div>
        <input class="form__input" type="password" name="password" v-model="password2" placeholder="Пароль" required/>
      </label>
      <span hidden>Вам на почту отправлена ссылка для подтверждения регистрации</span>
      <div class="form__row form__links">
        <a class="form__link" href="/login"><- Вернуться к авторизации</a>
      </div>
      <button class="form__btn-submit btn" @click="onRegistration">Зарегистрироваться</button>
    </form>
  </div>

</template>

<script>
  import {AXIOS} from "../plugins/APIService";
  export default {
    name: "Registration",
    data() {
      return {
        userName:'',
        email:'',
        password:'',
        password2:'',

        passCorrect: false
      }
    },
    methods: {
      onRegistration(){

        // AXIOS.post("/treeStore/saveNodeAsChild/", (addedNode), config)
        //   .then((response) => {
        //     console.log('response data saveChange', response.data);
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });

        if(this.password === this.password2){

        }else{

        }
      }
    }
  }
</script>

<style scoped>

  .align-content-center {
    /*margin-top: 20%;*/
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form__row {
    display: block;
    margin-bottom: 20px;
  }

  .form__label-text {
    margin-bottom: 5px;
    font-size: 22px;
    font-weight: 500;
  }

  .form__input {
    width: 320px;
    height: 40px;
    box-sizing: border-box;
    padding: 5px 10px;
    border: 1px solid #99ccff;
    border-radius: 5px;
    font-size: 18px;
  }

  .form__input:focus {
    border-color: #99ccff;
    box-shadow: 0 0 2px 1px #99ccff;
  }

  .form__links {
    display: flex;
    justify-content: space-between;
  }

  .btn {
    min-width: 200px;
    padding: 10px;
    border: none;
    border-radius:5px;
    background-color: #99ccff;
    font-size: 16px;
    cursor: pointer;
  }

  .btn:focus {
    box-shadow: 0 0 0 3px #000;
  }
</style>

