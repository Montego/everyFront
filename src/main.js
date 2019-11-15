import Vue from 'vue'
import App from './App'
import {router} from './router/routes';
import {store} from "./store";
import 'vuetify/dist/vuetify.min.css';
import Workplace from "./components/Workplace";

import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faBell,
  faChevronUp,
  faEdit,
  faEye,
  faFileDownload,
  faFolder,
  faFolderPlus,
  faKey,
  faLock,
  faMinusCircle,
  faPencilAlt,
  faPlus,
  faPlusCircle,
  faPrint,
  faSignOutAlt,
  faSyncAlt,
  faTimes,
  faTrashAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


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
  components: {App},
  template: '<App/>'
});
