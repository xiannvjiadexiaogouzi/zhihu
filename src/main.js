import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
// import vueScroller from 'vue-scroller'
import {
  InfiniteScroll,
  Popup,
  Lazyload,
} from "mint-ui";

import './assets/stylus/index.styl'
import './assets/js/rem.js'
import 'element-ui/lib/theme-chalk/icon.css'

Vue.config.productionTip = false

// Vue.use(vueScroller)
Vue.use(InfiniteScroll);
Vue.use(Lazyload);
Vue.component(Popup.name, Popup);

//  全局使用 axios
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')