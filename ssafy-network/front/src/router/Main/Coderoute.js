import CodePage from '@/views/CodePage.vue'
import CodeBoard from '@/components/code/CodeBoard.vue'
import CodeWriter from '@/components/code/CodeWriter.vue'
import CodeDetail from '@/components/code/CodeDetail.vue'
import CodeUpdate from '@/components/code/CodeUpdate.vue'

export default {
    path: '/code',
    name: 'code',
    component: CodePage,
    children: [
        {
            path: 'writer',
            name: 'CodeWriter',
            component: CodeWriter,
        },
        {
            path: 'detail',
            name: 'CodeDetail',
            component: CodeDetail,
            props:true,
        },
        {
            path: 'board',
            name: 'CodeBoard',
            component: CodeBoard,
            props:true,
        },
        {
            path: 'update',
            name: 'CodeUpdate',
            component: CodeUpdate,
            props: true,
        }
    ]
}