import HomePage from '../views/HomePage.vue'
import About from '../views/Home/AboutPage.vue'
import Login from '@/components/user/Login.vue'
import Join from '@/components/user/Join.vue'

export default {
  path: '/',
  name: 'home',
  component: HomePage,
  children: [{
      path: 'about',
      name: 'about',
      component: About,
    },
    {
      path: 'login',
      name: 'login',
      component: Login,
    },
    {
      path: 'join',
      name: 'join',
      component: Join,
    },
  ]
}