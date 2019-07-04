import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import {
  InfiniteScroll,
  Popup,
  Lazyload,
  Indicator,
  DatetimePicker,
  Spinner,
} from "mint-ui";

import './assets/stylus/index.styl'
import './assets/js/rem.js'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.use(InfiniteScroll);
Vue.component(Popup.name, Popup);
Vue.use(Lazyload);
Vue.use(Indicator)
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Spinner.name, Spinner);

//  全局使用 axios
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')