import Vue from 'vue'
import Vuex from 'vuex'
import notice from '@/store/notice.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    navFoldFlag: true,
    dbserver: 'http://192.168.31.55:3000',
    chatserver: 'http://192.168.31.55:3000',
    CalendarCheck: false,
    NoteCheck: false,
    chatmsg: [],
    notetreefoldflag: false,
    heightflag: false,
    commentflag: false,
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    notice
  }
})