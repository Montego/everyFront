<template>
  <div class="align-content-center">
    <div class="center">
      <h1>Авторизация</h1>

      <form id="form" class="form">
        <label class="form__row">
          <div class="form__label-text">Логин:</div>
          <input id="username" class="form__input" type="text" name="username" value="" placeholder="Username" v-model="username" required/>
        </label>
        <label class="form__row">
          <div class="form__label-text">Пароль:</div>
          <input id="password" class="form__input" type="password" name="password" placeholder="Password" v-model="password" required/>
        </label>
        <div class="form__row form__links">
          <a class="form__link" href="registration">Регистрация</a>
          <a class="form__link" href="#">Забыли пароль?</a>
        </div>
        <span class="alert_message" v-if="errorEnter!== ''">{{this.errorEnter}}</span>
        <button class="form__btn-submit btn" @click.prevent="onLogin">Войти</button>

      </form>
    </div>

  </div>

</template>

<script>

  import {AXIOS} from "../plugins/APIService";
  import {mapGetters, mapState} from "vuex";
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorEnter: ''
      }
    },
    computed: {
      ...mapState('tree', ['treeStore', 'treeOptionsUser', 'treeOptionsAdmin']),
      ...mapGetters('tree', ['get_tree', 'get_treeOptionsUser', 'get_treeOptionsAdmin']),

      selectedNode: {
        get() {
          return this.$store.state.treeStore
        },
        set(value) {
          this.$store.commit('tree/uploadSelectedNode', value)
        }
      }
    },
    methods: {
      onLogin(){
        this.errorEnter = '';
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        //TODO как скрыть пароль?

        AXIOS.post("/auth/login", new URLSearchParams({
            'username': this.username,
            'password': this.password
          }
        ), config)
          .then((response) => {
            // console.log(response.data);
            location.href='profile';
          })
          .catch( (e) => {
            this.errorEnter = 'Неправильный логин или пароль';
            console.error(e);
          });

        // this.$store.dispatch('tree/treeAfterLogin',[]);
        // this.$store.dispatch('tree/updateTree');
        // this.$store.dispatch('tree/initTree',this.treeStore);

        this.$router.push('treeStore');
      }
    }
  }
</script>

<style scoped>
  .alert_message {
    color: red;
    padding-bottom: 15px;
  }
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

