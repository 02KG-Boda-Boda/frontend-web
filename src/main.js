import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from './router'
import store from './store/store'
import Viewer from 'v-viewer'
import moment from 'moment'



import Swal from 'sweetalert2'
window.Swal=Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
window.Toast=Toast;
window.Fire=new Vue();

Vue.use(Viewer)
Vue.config.productionTip = false;
Vue.filter('myDate', function (created) {
  return moment(created).utc().format('Do MMMM YYYY');
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
