import Vue from 'vue'
import App from './App.vue'
import './permission' // permission control

import router from './router'
import store from './store'

import './style/theme/index.css'
import Element from 'element-ui'

import './styles/index.scss' // global css
import Meta from 'vue-meta'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/icon.css'
import 'font-awesome/css/font-awesome.min.css'
import moment from 'moment'

Vue.use(Meta)
Vue.config.productionTip = false
Vue.use(Element)

moment.locale('zh-cn')
Vue.filter('dateFormat', function (value) {
  return moment(value).format('YYYY-MM-DD')
})

Vue.filter('dateTimeFormat', function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm')
})

Vue.filter('toThousands', function (num) {
  // TODO: 小数点比较多时有BUG
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
