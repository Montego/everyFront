import Vue from 'vue'
import Router from 'vue-router'
import Main from "../pages/Main";
import Login from "../pages/Login";
import E404 from "../pages/E404";
import Workplace from "../components/Workplace";
import Intro from "../components/Intro";


Vue.use(Router);


const routes = [
  {
    name: 'Main',
    path: '/treeStore',
    component: Main
  },
  {
    name: 'Intro',
    path: '/intro',
    component: Intro
  },
  {
    name: 'Workplace',
    path: '/treeStore',
    component: Workplace
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },

  {
    path: '',
    redirect: {name: 'login'}
  },
  {
    path: '*',
    component: E404
  }
];

export const router = new Router({
  routes,
  mode: 'history'
});
