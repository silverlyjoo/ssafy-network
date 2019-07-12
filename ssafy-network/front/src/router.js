import Vue from 'vue';
import Router from 'vue-router';
import Homeroute from './router/Homeroute.js';
import Coderoute from './router/Coderoute.js';
import Socialroute from './router/Socialroute.js';
import Noteroute from './router/Noteroute.js';


Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    Homeroute,
    Coderoute,
    Socialroute,
    Noteroute
  ]
})