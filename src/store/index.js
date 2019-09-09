import Vue from 'vue'
import Vuex from 'vuex'
import checkAliveServer from './modules/checkAliveServer'
import fuckingGreatAdvice from "./modules/outsideAPI/fuckingGreatAdvice";
import Vuetify from 'vuetify'
import user from "./modules/user";
import LiquorTree from 'liquor-tree';
import tree from "./modules/tree";

// import VeeValidate from 'vee-validate';
// import VueTheMask from 'vue-the-mask'
// import Vuelidate from 'vuelidate'

// Vue.use(VueTheMask);
// Vue.use(VeeValidate);
// Vue.use(Vuelidate);
// Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(LiquorTree);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    checkAliveServer,
    fuckingGreatAdvice,
    user,
    tree
  },
  strict: false
});
