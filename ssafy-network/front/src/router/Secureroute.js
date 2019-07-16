import SecurePage from '@/views/SecurePage.vue'
import About from '@/views/Home/AboutPage.vue'
import Login from '@/components/user/Login.vue'
import Join from '@/components/user/Join.vue'

export default {
    path: '/',
    name: 'secure',
    component: SecurePage,
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