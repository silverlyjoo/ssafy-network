import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VeeValidate from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.js'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import VueSession from 'vue-session'
import io from 'socket.io-client'
import svgSpriteLoader from './svg-sprite-loader'


import {
  Editor,
  Viewer
} from '@toast-ui/vue-editor'


// const __svg__ = { path: './assets/svg/*.svg', name: 'assets/svg/[hash].sprite.svg' }
// svgSpriteLoader(__svg__.filename)

Vue.use(VueCodemirror)
// Vue.use(io)
Vue.component('editor', Editor)
Vue.component('viewer', Viewer)
Vue.use(VueSession)
Vue.use(VeeValidate, {
  errorBagName: 'errors',
  locale: 'ko',
  dictionary: {
    ko
  }
})
Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  if (store.state.login === false && !(to.path == '/' || to.path == '/login' || to.path == '/join' || to.path == '/about')) {
    next('/')
  } else if (store.state.login === true && (to.path == '/' || to.path == '/login' || to.path == '/join' || to.path == '/about'))  {
    next('/index')
  }
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')