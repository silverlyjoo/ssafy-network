import SocialPage from '@/views/SocialPage.vue'
import SocialRoom from '@/components/social/SocialRoom.vue'

export default {
    path: '/social',
    name: 'social',
    component: SocialPage,
    children : [
        {
            path: 'chatroom',
            name: 'chatroom',
            component: SocialRoom
        }
    ]
}