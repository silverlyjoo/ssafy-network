import CodePage from '@/views/CodePage.vue'
import CodeWriter from '@/components/code/CodeWriter.vue'
import CodeDetail from '@/components/code/CodeDetail.vue'
import CodeBoard from '@/components/code/CodeBoard.vue'

export default {
    path: '/code',
    name: 'code',
    component: CodePage,
    children: [
        {
            path: 'write',
            name: 'CodeWriter',
            component: CodeWriter,
            props:true,
        },
        {
            path: 'board/detail',
            name: 'codedetail',
            component: CodeDetail,
            props: true
        },
        {
            path: 'board',
            name: 'codeboard',
            component: CodeBoard,
        },
    ]
}