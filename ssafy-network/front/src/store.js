import Vue from 'vue'
import Vuex from 'vuex'
import notice from '@/store/notice.js'

export const SET_MAINHEIGHT = 'SET_MAINHEIGHT'

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
    mainheight: null,
  },
  getters: {
    // getHeight(state) {
    //   console.log('when?')
    //   return state.mainheight
    // }
  },
  mutations: {
    [SET_MAINHEIGHT](state, height) {
      // console.log('changed')
      state.mainheight = height
    }
  },
  actions: {

  },
  modules: {
    notice
  }
})