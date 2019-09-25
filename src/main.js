import Vue from 'vue'
import axios from "axios";
//axios全局配置
axios.defaults.withCredentials=true;
axios.defaults.crossDomain = true;
// axios.defaults.baseURL='http://192.168.50.198/';
axios.defaults.headers.post['Content-type']='application/json';
Vue.prototype.$axios=axios;
import App from './App.vue'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import  comp from "./components/comp.js"

import '@/icons'

Vue.config.productionTip = false

//将请求封装为一个插件
import $axios from './utils/axios.plugin.js'
// import './assets/css/axios.plugin.css'
Vue.use($axios)


new Vue({
  render: h => h(App),
  router:comp
}).$mount('#app')
