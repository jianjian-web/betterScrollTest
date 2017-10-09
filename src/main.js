// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import store from './store/'
import BScroll from 'better-scroll'
import VueResource from "vue-resource";
Vue.use(VueResource);
import { baseUrl } from "./config/env";
Vue.use(MintUI)
Vue.config.productionTip = false;

Vue.component("scroll",require('./components/common/scroll.vue').default)
Vue.component("zSlide",require('./components/common/slide.vue').default)
Vue.component("zList",require('./components/SongList.vue').default)
/*请求拦截器*/
Vue.http.interceptors.push(function(request, next) {
  // modify headers
  // request.headers.set("Authorization", "Bearer TOKEN");
  request.url = baseUrl + request.url;
  // continue to next interceptor
  next(response => {
    if (response.status == "401") {
      alert("请登录");
    } else if (response.status == "404") {
      alert("404");
    }
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
