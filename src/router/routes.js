import Vue from 'vue'
import Router from 'vue-router'
import Main from "../pages/Main";
import Login from "../pages/Login";
import Registration from "../pages/Registation";
import E404 from "../pages/E404";



Vue.use(Router);


const routes = [
    {
      name: 'Main',
      path: '/treeStore',
      component: Main
    },
    {
      name:'login',
      path:'/login',
      component: Login
    },
    {
      name:'registration',
      path:'/registration',
      component: Registration
    },

    {
      path:'',
      redirect: {name :'login'}
    },
    {
      path:'*',
      component: E404
    }
  ];

export const router =  new Router({
  routes,
  mode: 'history'
});
