import CodePage from '@/views/CodePage.vue'
import CodeWriter from '@/components/code/CodeWriter.vue'

export default {
    path: '/code',
    name: 'code',
    component: CodePage,
    children: [
        {
            path: '/write',
            name: 'codewrite',
            component: CodeWriter,
        },
    ]
}