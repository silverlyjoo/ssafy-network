import NotePage from '../views/NotePage.vue'
import NoteWriter from '@/components/note/NoteWriter.vue'
import NoteDetail from '@/components/note/NoteDetail.vue'
import NoteUpdate from '@/components/note/NoteUpdate.vue'
export default {
    path: '/note',
    name: 'notepage',
    component: NotePage,
    children:[
        {
            path: '/notewrite',
            name: 'notewrite',
            component: NoteWriter,
          },
          {
            path: '/notedetail',
            name: 'notedetail',
            component: NoteDetail,
          }, {
            path: '/noteupdate',
            name: 'noteupdate',
            component: NoteUpdate,
          },
    ]
}