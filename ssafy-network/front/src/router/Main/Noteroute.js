import NotePage from '@/views/NotePage.vue'
import NoteWriter from '@/components/note/NoteWriter.vue'
import NoteDetail from '@/components/note/NoteDetail.vue'
import MarkdownUpdate from '@/components/note/MarkdownUpdate.vue'
import CodeNoteUpdate from '@/components/note/CodeNoteUpdate.vue'
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
            props:true,
            
          }, {
            path: 'markupdate',
            name: 'markdownupdate',
            component: MarkdownUpdate,
            props:true
          }, {
            path: 'codenoteupdate',
            name: 'codenoteupdate',
            component: CodeNoteUpdate,
            props:true
          },{
            path:'calendar',
            name: 'notecalendar',
            component: NoteCalendar
          }
    ]
}