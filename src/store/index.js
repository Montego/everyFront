import Vue from 'vue'
import Vuex from 'vuex'

import Vuetify from 'vuetify'
import user from "./modules/user";
import LiquorTree from 'liquor-tree';
import tree from "./modules/tree";

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(LiquorTree);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    tree
  },
  strict: false
});
