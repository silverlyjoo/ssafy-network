import NotePage from '@/views/NotePage.vue'
import NoteWriter from '@/components/note/NoteWriter.vue'
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
            props:true
          },
          {
            path: 'detail/:_id',
            name: 'notedetail',
            component: NoteDetail,
            props:true
          }, {
            path: 'update',
            name: 'noteupdate',
            component: NoteUpdate,
            props:true
          },{
            path:'calendar',
            name: 'notecalendar',
            component: NoteCalendar
          }
    ]
}