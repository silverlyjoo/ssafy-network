import MainPage from '@/views/MainPage.vue'

import Userroute from '@/router/Main/Userroute.js'
import Voteroute from '@/router/Main/Voteroute.js'
import Emailroute from '@/router/Main/Emailroute.js'
import Addressroute from '@/router/Main/Addressroute.js'
import Adminroute from '@/router/Main/Adminroute.js';
import Homeroute from '@/router/Main/Homeroute.js';
import Coderoute from '@/router/Main/Coderoute.js';
import Socialroute from '@/router/Main/Socialroute.js';
import Noteroute from '@/router/Main/Noteroute.js';
import Notice from '@/router/Main/Notice.js';


export default {
    path: '/easteregg',
    name: 'mainpage',
    component: MainPage,
    children:[
        Homeroute,
        Coderoute,
        Socialroute,
        Noteroute,
        ...Adminroute,
        Notice,
        ...Addressroute,
        ...Emailroute,
        ...Voteroute,
        ...Userroute
      ]
}

