// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/main.css'

// import vConsole from 'vconsole'

import VueJsonp from 'vue-jsonp'

import 'lib-flexible'
import web3 from './web3Api/web3api'
import VueI18n from 'vue-i18n'

import VueClipboard from 'vue-clipboard2'
//公用过滤方法
import vfilter from './../vfilters/filters'
for (let key in vfilter) {
  Vue.filter(key,vfilter[key]);
}


Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router);

Vue.use(web3);
Vue.use(VueJsonp);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh',// 语言标识
  messages: {
    'zh': require('./i18n/lang/zh'),
    'en': require('./i18n/lang/en')
  }
})

//公用loading方法
Vue.prototype.$loadingData=function(dom){
  let optionsOne={//设置加载参数
    target:dom,//加载区域dom
    fullscreen:false,//不全屏显示
  }
   let dataLoading = this.$loading(optionsOne)
   return  dataLoading;
}


Vue.prototype.$customEvent = new Vue(App);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: {App}
})
