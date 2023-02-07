import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

import voice from './js_sdk/voicePlay/voicePlays/voicePlays.js';
Vue.prototype.$voice = voice

Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	 store
})
// 引入请求封装，将app参数传递到配置中
require('network/request.js')(app)
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
