import HomePage from '../views/HomePage.vue'
import About from '../views/Home/AboutPage.vue'

export default {
    path: '/',
    name: 'home',
    component: HomePage,
    children: [
        {
          path: 'about',
          name: 'about',
          component: About,
        }
      ]
}