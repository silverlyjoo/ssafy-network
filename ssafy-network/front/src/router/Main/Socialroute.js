import SocialPage from '@/views/SocialPage.vue'
import SocialRoom from '@/components/social/SocialRoom.vue'
import SocialList from '@/components/social/SocialList.vue'
import SocialNew from '@/components/social/SocialNew.vue'

export default {
    path: '/social',
    name: 'social',
    component: SocialPage,
    children : [
        {
            path: 'room/:_id',
            name: 'room',
            component: SocialRoom,
            props: true
        },
        {
            path: 'list',
            name: 'list',
            component: SocialList
        },
        {
            path: 'new',
            name: 'new',
            component: SocialNew
        },
    ]
}