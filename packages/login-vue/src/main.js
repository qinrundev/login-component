import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Axios from 'axios';

Vue.config.productionTip = true;
Vue.prototype.$http = Axios;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
