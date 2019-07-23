import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    navFoldFlag : true,
    dbserver : 'http://192.168.31.55:3000',
    chatserver : 'http://192.168.31.55:3000',
    CalendarCheck: false
  },
  mutations: {

  },
  actions: {

  }
})
