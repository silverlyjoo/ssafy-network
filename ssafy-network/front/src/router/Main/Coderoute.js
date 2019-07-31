import CodePage from '@/views/CodePage.vue'
import BoardForm from '@/components/code/BoardForm.vue'
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