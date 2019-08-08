<!-- tiptap 버전 -->
<template>
  <v-container >
    <MarkdownDetail v-if="!choiceEditor && noteData != null" :data="noteData" ></MarkdownDetail>
    <CodeNoteDetail v-if="choiceEditor && noteData != null" :data="noteData" ></CodeNoteDetail>
  </v-container>
</template>

<script>
import CodeNoteDetail from "@/components/note/CodeNoteDetail.vue";
import MarkdownDetail from "@/components/note/MarkdownDetail.vue";

export default {
  name:"NoteDetail",
  components:{
    CodeNoteDetail,
    MarkdownDetail
  },
  data(){
    return{
      _id:"",
      noteData:{},
      choiceEditor:false,
    }
  },
  methods:{
    async getNoteOne(){
      await fetch(this.$store.state.dbserver + "/notes/txt/"+ this._id +"/"+this.$session.get("token"), {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(data => {
              if(data.result == false){
                alert("잘못된 데이터 입니다.")
              }else{
                this.noteData = data;
                if(data.editor == "markdown"){
                  this.choiceEditor = false;
                }else{
                  this.choiceEditor = true;
                }
              }
      });
    }
  },
  created(){
    this._id = this.$route.params._id;
    this.getNoteOne();
  },
  updated(){
    this.$store.state.heightflag=true;
  },
  watch:{
    '$route'(to,from){
      this._id = this.$route.params._id;
      this.getNoteOne();
    }
  }
}
</script>

