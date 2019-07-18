import CodePage from '@/views/CodePage.vue'
import CodeBoard from '@/components/code/CodeBoard.vue'
import CodeWriter from '@/components/code/CodeWriter.vue'

export default {
    path: '/code',
    name: 'code',
    component: CodePage,
    children: [
        {
            path: 'board',
            name: 'board',
            component: CodeBoard,
        },
        {
            path: 'write',
            name: 'write',
            component: CodeWriter,
        }
    ]
}