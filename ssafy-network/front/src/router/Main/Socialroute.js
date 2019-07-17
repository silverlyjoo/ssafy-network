import SocialPage from '@/views/SocialPage.vue'
import SocialRoom from '@/components/social/SocialRoom.vue'
import SocialList from '@/components/social/SocialList.vue'

export default {
    path: '/social',
    name: 'social',
    component: SocialPage,
    children : [
        {
            path: 'chatroom',
            name: 'chatroom',
            component: SocialRoom
        },
        {
            path: 'chatlist',
            name: 'chatlist',
            component: SocialList
        },
    ]
}