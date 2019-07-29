import AdminPage from '@/views/AdminPage.vue'
import userlist from '@/components/admin/userlist'
import chatlist from '@/components/admin/chatlist'

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
    }

]