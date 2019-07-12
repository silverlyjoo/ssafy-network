import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueApexCharts)

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')