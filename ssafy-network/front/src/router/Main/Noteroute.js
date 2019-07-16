import NotePage from '@/views/NotePage.vue'
import NoteWriter from '@/components/note/NoteWriter.vue'
import NoteDetail from '@/components/note/NoteDetail.vue'
import NoteUpdate from '@/components/note/NoteUpdate.vue'
export default {
    path: '/note',
    name: 'notepage',
    component: NotePage,
    children:[
        {
            path: 'write',
            name: 'notewrite',
            component: NoteWriter,
          },
          {
            path: 'detail',
            name: 'notedetail',
            component: NoteDetail,
          }, {
            path: 'update',
            name: 'noteupdate',
            component: NoteUpdate,
          },
    ]
}