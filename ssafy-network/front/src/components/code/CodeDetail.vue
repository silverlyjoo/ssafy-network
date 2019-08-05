<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>글 읽기</v-toolbar-title>
      <v-spacer></v-spacer>
        <router-link to="/code/board" style="text-decoration: none !important"><v-btn class="white--text" color="grey darken-2">목록</v-btn></router-link>
        <v-btn v-if="$session.get('nickname') == data.writer" class="white--text" color="grey darken-2" @click="updateForm()">수정</v-btn>
        <v-btn v-if="$session.get('nickname') == data.writer" class="white--text" color="grey darken-2" @click="deleteForm()">삭제</v-btn>
    </v-toolbar>
    <!-- <v-layout> -->
    <br>
      <v-card grid-list-md style="width:80%; margin-left:auto; margin-right:auto;">
        <v-card-text>
          <v-container>
            <v-layout wrap column>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  readonly
                  v-model="data.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="languages"
                  label="선택 언어"
                  single-line
                  readonly
                  v-model="data.language"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <codemirror
                  :options="cmOptionJs"
                  v-model="data.source">
                </codemirror>
              </v-flex>
              <br>
             <v-flex xs12>
               <v-textarea
                 label="내용"
                 readonly
                 v-model="data.content"
                >
                </v-textarea>
              </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
    <!-- </v-layout> -->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">경고</v-card-title>
        <v-card-text>삭제하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="grey darken-2" text @click="dialog = false">취소</v-btn>
          <v-btn class="white--text" color="grey darken-2" text @click="deleteArticle()">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br>

    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>댓글</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="white--text" color="grey darken-2">댓글쓰기</v-btn>
    </v-toolbar>

    <Comment :comments="comments" style="width:80%; margin-left:auto; margin-right:auto;"></Comment>
    <v-dialog v-model="showCommentForm" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">댓글 작성</v-card-title>
        <v-card-text>
          <v-text-field v-model="selectedItem.title" label="제목"></v-text-field>
          <v-text-field v-model="selectedItem.comment" label="내용"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeCommentForm()">취소</v-btn>
          <v-btn color="green darken-1" text @click="createComment()">생성</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import Comment from "@/components/code/Comment.vue"

export default {
  name: "CodeDetail",
  components:{
    Comment
  },
  $_veeValidate: {
    validator: "new",
  },
  props:{
    data : {type:Object}
  },
  data() {
    return {
      showCommentForm: false,
      comments:[],
      dialog: false,
      connected_id: "",
      wrtier_id: "",
      today: "",
      totalArticles: 0,
      articles: [],
      loading: true,
      pagination:{},
      cmOptionJs: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
         readOnly:true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: "text/javascript",
        // hint.js options
        hintOptions: {
          // 当匹配只有一项的时候是否自动补全
          completeSingle: false
        },
        //快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        extraKeys: { Ctrl: "autocomplete" }
      },
      cmOptionPy: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-python",
        theme: "mbo"
      },
      cmOptionVue: {
        autoCloseBrackets: true,
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keyMap: "sublime",
        mode: "text/x-vue",
        theme: "base16-dark",
        extraKeys: {
          F11(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          Esc(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          }
        }
      },
      languages: [
        { text: "JavaScript" },
        { text: "Python" },
        { text: "Vue" },
      ],
      headers: [
        {
          text: "제목",
          align: "center",
          sortable: false,
          value: "title"
        },
        {
          text: "작성자",
          align: "center",
          sortable: false,
          value: "writer",
        },
        {
          text: "작성일",
          align: "center",
          sortable: true,
          value: "writer",
        },
        {
          text: "조회수",
          align: "center",
          sortable: true,
          value: "hit",
        }
      ],
    };
  },

  mounted() {
    this.getComments();
  },
  methods: {
    getComments(){
      fetch(this.$store.state.dbserver + "/comments/" + this.data._id + "/" + this.$session.get("token"), {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.error != null){
          alert("잘못된 값입니다.")
        }else{
          this.comments = data;
        }
      });
    },
    updateForm(){
      this.$router.push({name:"CodeUpdate" , params:{article:this.data}});
    },
    deleteForm(){
      this.dialog = true;
    },
    deleteArticle() {
      fetch(this.$store.state.dbserver + "/boards", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.data._id,
          token: this.$session.get("token")
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.result == true) {
          alert("게시글을 삭제하였습니다.")
          this.$router.push("/code/board");
        } else {
          alert("게시글을 삭제할 수 없습니다.")
        }
      })
    }
  }
};
</script>

<style>
.board-title {
  color: grey;
}
.board {
  height: 100%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.write-btn {
  float: right;
  /* padding-right: 100px; */
}
</style>