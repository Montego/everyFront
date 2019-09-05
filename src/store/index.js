import Vue from 'vue'
import Vuex from 'vuex'
import checkAliveServer from './modules/checkAliveServer'
import fuckingGreatAdvice from "./modules/outsideAPI/fuckingGreatAdvice";
import Vuetify from 'vuetify'
import user from "./modules/user";

// import VeeValidate from 'vee-validate';
// import VueTheMask from 'vue-the-mask'
// import Vuelidate from 'vuelidate'

// Vue.use(VueTheMask);
// Vue.use(VeeValidate);
// Vue.use(Vuelidate);
// Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(Vuetify);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    checkAliveServer,
    fuckingGreatAdvice,
    user
  },
  strict: false
});
