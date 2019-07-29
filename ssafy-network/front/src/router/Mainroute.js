import MainPage from '@/views/MainPage.vue'


import Adminroute from '@/router/Main/Adminroute.js';
import Homeroute from '@/router/Main/Homeroute.js';
import Coderoute from '@/router/Main/Coderoute.js';
import Socialroute from '@/router/Main/Socialroute.js';
import Noteroute from '@/router/Main/Noteroute.js';

export default {
    path: '/easteregg',
    name: 'mainpage',
    component: MainPage,
    children:[
        Homeroute,
        Coderoute,
        Socialroute,
        Noteroute,
        ...Adminroute
      ]
}

