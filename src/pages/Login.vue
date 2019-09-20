<template>
  <div class="align-content-center">
    <div class="center">
      <h1>Авторизация</h1>

      <form id="form" class="form">
        <label class="form__row">
          <div class="form__label-text">Логин (имя или почта):</div>
          <input id="username" class="form__input" type="text" name="username" value="" placeholder="Username" required/>

        </label>
        <label class="form__row">
          <div class="form__label-text">Password:</div>
          <input id="password" class="form__input" type="password" name="password" placeholder="Password" required/>
        </label>
        <!--<span class="hidden-lg-and-up">Неправильный логин или пароль</span>-->
        <div class="form__row form__links">
          <a class="form__link" href="#">Регистрация</a>
          <a class="form__link" href="#">Забыли пароль?</a>
        </div>

        <button class="form__btn-submit btn" @click.prevent="onLogin">Войти</button>

      </form>
    </div>

  </div>

</template>

<script>

  // import {AXIOS} from "../plugins/APIService";
  export default {
    // methods: {
    //   onLogin:  () => {
    //     let username = document.getElementById("username").value;
    //     let password = document.getElementById("password").value;
    //     const config = {
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       }
    //     };
    //     AXIOS.post("/auth/login", new URLSearchParams({
    //         'username': username,
    //         'password': password
    //       }
    //     ), config)
    //       .then((response) => {
    //         // console.log(response.data);
    //         location.href='profile';
    //       })
    //       .catch( (e) => {
    //         console.error(e);
    //         document.getElementById('form').reset();
    //         let y = document.getElementsByClassName('hidden-lg-and-up');
    //         let msg = y[0];
    //         // msg.classList.remove('hidden-lg-and-up');
    //         setTimeout(msg.style.display = "block", 3000);
    //       });
    //   }
    //
    // }

  }
</script>

<style scoped>
  .center {
    margin-top: 80px;
  }
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

