// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/statics/iconfont/iconfont.css'

import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.min.css'
import routes from './base/router'
import store from './vuex/store'
import Vuex from 'vuex'
import utilApi from './common/utils';
// import Mock from './mock'
// Mock.bootstrap();
import echarts from 'echarts'

import htmlToPdf from "../src/common/htmlToPdf"


import { imServerStore } from './store/imServerStore.js';
// axios
import http from '@/common/http.js';
Vue.prototype.$http = http;
// ak
import ak from '@/common/ak.js';
Vue.prototype.$ak = ak;
/*// //导出
 import Blob from "./excel/Blob.js"
 import Export2Excel from "./excel/Export2Excel.js"*/
//
/* Vue.use(Blob)
Vue.use(Export2Excel)*/
Vue.use(htmlToPdf)
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

// 在Vue中全局使用mintui
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter)


//  将vue-resource在vue中绑定，自动在vue对象实例上注入一个$http对象就可以使用ajax方法了
import vueResource from 'vue-resource';
let Base64 = require('js-base64').Base64;
let sysConfig = require('@/../config/sysConfig')
let openAuthenticate = sysConfig.openAuthenticate
let openAuthorize = sysConfig.openAuthorize

Vue.use(vueResource);
/* eslint-disable no-new */
const router = new VueRouter({
  routes:routes
})


new Vue({
  el: '#app',
  router,
  components: { App },
  store:{
    imServerStore: imServerStore
  },
  // template: '<App/>',
  // components: { App }
  render: c => c(App),
  template: '<App/>'
})
/*window.polkVue = new Vue({
  el: '#app',
  router,
  components: { App },
  store: {
    imServerStore: imServerStore
  },
  render: c => c(App),
  template: '<App/>'
});*/
