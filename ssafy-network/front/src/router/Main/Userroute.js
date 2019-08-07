import UserDetail from '@/components/user/UserDetail.vue'
import UserDetailUpdate from '@/components/user/UserDetailUpdate.vue'

export default [{
        path: '/user',
        name: 'userdetail',
        component: UserDetail
    },
    {
        path: '/user/update',
        name: 'userdetailupdate',
        component: UserDetailUpdate
    }
    
]