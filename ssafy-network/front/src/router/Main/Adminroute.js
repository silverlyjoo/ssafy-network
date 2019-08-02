import AdminPage from '@/views/AdminPage.vue'
import userlist from '@/components/admin/userlist'
import chatlist from '@/components/admin/chatlist'
import adminnotice from '@/components/admin/adminnotice'
import adminnwrite from '@/components/admin/adminnwrite'

export default [{
        path: '/admin',
        name: 'admin',
        component: AdminPage
    },
    {
        path: '/admin/user',
        name: 'adminuserlist',
        component: userlist
    },
    {
        path: '/admin/chat',
        name: 'adminchatlist',
        component: chatlist
    },
    {
        path: '/admin/notice',
        name: 'adminnotice',
        component: adminnotice
    },
    {
        path: '/admin/nwrite',
        name: 'adminnwrite',
        component: adminnwrite
    }
]