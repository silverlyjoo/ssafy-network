import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomePage.vue'
import AboutUs from '@/components/common/AboutUs.vue'
import Post from '@/views/PostPage.vue'
import Portfolio from '@/views/PortfolioPage.vue'
import Project from '@/views/ProjectPage.vue'
import Postdetail from './components/Post/Postdetail.vue'
import PortfolioWriter from '@/views/PortfolioWriter'
import JoinForm from './components/common/JoinForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    }, {
      path: '/Postdetail',
      name: 'Postdetail',
      component: Postdetail,
      props: true
    },
    {
      path: '/portfoliowriter',
      name: 'portfoliowriter',
      component: PortfolioWriter
    },
    {
      path: '/joinform',
      name: 'join',
      component: JoinForm
    },
  ]
})