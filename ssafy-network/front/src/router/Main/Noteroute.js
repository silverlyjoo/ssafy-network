import NotePage from '@/views/NotePage.vue'
import NoteWriter from '@/components/note/NoteWriter2.vue'
import NoteDetail from '@/components/note/NoteDetail.vue'
import NoteUpdate from '@/components/note/NoteUpdate.vue'
import NoteCalendar from '@/components/note/NoteCalendar.vue'

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
          },{
            path:'calendar',
            name: 'calendar',
            component: NoteCalendar
          }
    ]
}