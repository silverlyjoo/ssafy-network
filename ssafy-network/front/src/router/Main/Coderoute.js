import CodePage from '@/views/CodePage.vue'
import CodeBoard from '@/components/code/CodeBoard.vue'
import CodeWriter from '@/components/code/CodeWriter.vue'
import CodeDetail from '@/components/code/CodeDetail.vue'

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
            path: 'board/detail',
            name: 'codedetail',
            component: CodeDetail,
        },
        {
            path: 'board',
            name: 'CodeBoard',
            component: CodeBoard,
        },
    ]
}