import Vue from 'vue';
import Router from 'vue-router';
import Mainroute from './router/Mainroute.js'
import Secureroute from './router/Secureroute.js'


Vue.use(Router)



export default new Router({
  mode: 'history',
  routes: [

    Mainroute,
    Secureroute

  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
})