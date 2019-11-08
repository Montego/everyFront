// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/routes';
import {store} from "./store";
import 'vuetify/dist/vuetify.min.css';
import Workplace from "./components/Workplace";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock, faTimes, faSignOutAlt, faPlusCircle, faMinusCircle, faEdit, faEye, faPrint,
  faChevronUp, faSyncAlt, faKey, faBell, faFolder, faFolderPlus, faFileDownload, faPencilAlt,
  faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.component('workplace', Workplace);

library.add(faUser, faLock, faTimes, faSignOutAlt, faPlusCircle, faMinusCircle, faEdit, faEye, faPrint,
  faChevronUp, faSyncAlt, faKey, faBell, faFolder, faFolderPlus, faFileDownload, faPencilAlt,
  faTrashAlt, faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
