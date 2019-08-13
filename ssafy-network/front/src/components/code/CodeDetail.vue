<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>글 읽기</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/code/board" style="text-decoration: none !important">
        <v-btn class="white--text" color="grey darken-2">목록</v-btn>
      </router-link>
      <v-btn
        v-if="$session.get('nickname') == data.writer || selfmembership === '관리자'"
        class="white--text"
        color="grey darken-2"
        @click="codeUpdateForm()"
      >수정</v-btn>
      <v-btn
        v-if="$session.get('nickname') == data.writer || selfmembership === '관리자'"
        class="white--text"
        color="grey darken-2"
        @click="codeDeleteForm()"
      >삭제</v-btn>
    </v-toolbar>
    
    <br>

    <v-card grid-list-md style="width:80%; margin-left:auto; margin-right:auto;">
      <v-card-text>
        <v-container>
          <v-layout wrap column>
            <v-flex xs12>
              <div style="font-family: 'Nanum Gothic', sans-serif;">
                <span class="grey--text" style="py-5">제목</span><br>
                <span style="font-size: 18px;">{{data.title}}</span>
              </div><br>
            </v-flex>
            <v-flex xs12>
              <div style="font-family: 'Nanum Gothic', sans-serif;">
                <span class="grey--text" style="py-5">선택 언어</span><br>
                <span style="font-size: 18px;">{{data.language}}</span>
              </div><br>
            </v-flex>
            <v-flex xs12>
              <codemirror :options="cmOption" v-model="data.source"></codemirror>
            </v-flex>
            <br />
            <v-flex xs12>
              <div style="font-family: 'Nanum Gothic', sans-serif;">
                <span class="grey--text" style="py-5">내용</span><br>
                <span style="white-space:pre; font-size: 18px;">{{data.content}}</span>
              </div><br>
            </v-flex><br><br><br>
            <v-layout>
              <v-flex xs2 text-xs-center class="py-3">
                <div class="py-5">
                  <h3 class="py-2"><strong>{{$session.get("nickname")}}</strong></h3> &nbsp;&nbsp;&nbsp;
                </div>
              </v-flex>
              <v-flex xs8 text-xs-center>
                <v-textarea class="py-3"
                  label="댓글"
                  box
                  v-model="comment"
                  v-validate="'required|min:2'"
                  data-vv-name="comment"
                  :error-messages="errors.collect('comment')"
                ></v-textarea>
              </v-flex>
              <v-flex xs2 text-xs-center class="py-4">
                <div class="py-4">
                  <v-btn
                    large
                    color="grey darken-2"
                    class="white--text"
                    @click="createComment()"
                  >등록</v-btn>
                </div>
              </v-flex>
            </v-layout>
            <br>
            <v-divider></v-divider>
            <Comment
              :_id="data._id"
              style="margin-left:auto; margin-right:auto;"
              class="pa-0"
            ></Comment>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

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
    </v-dialog><br>
  </div>
</template>


<script>
import Comment from "@/components/code/Comment.vue";
import caxios from "@/plugins/createaxios.js";

// 코드미러 임폴트

import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/base16-dark.css";
import CodeMirror from "codemirror";
import "codemirror/addon/edit/matchbrackets.js";

// language
// import 'codemirror/mode/c/c.js'
// import 'codemirror/mode/c++/c++.js'
import "codemirror/mode/django/django.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/vue/vue.js";

// theme css
import "codemirror/theme/monokai.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/mbo.css";

// require active-line.js
import "codemirror/addon/selection/active-line.js";

// closebrackets
import "codemirror/addon/edit/closebrackets.js";

// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";

// hint
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/selection/active-line.js";

// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";

// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
import "codemirror/keymap/emacs.js";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

export default {
  name: "CodeDetail",
  $_veeValidate: {
    validator: "new",
  },
  components: {
    Comment
  },
  $_veeValidate: {
    validator: "new"
  },
  props: {
    data: { type: Object }
  },
  data() {
    return {
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      dbserver: this.$store.state.dbserver,
      comments: [],
      comment: "",
      showComment: false,
      selectedItem: "",
      dialog: false,
      connected_id: "",
      wrtier_id: "",
      today: "",
      totalArticles: 0,
      articles: [],
      loading: true,
      pagination: {},
      selfmembership: "",
      cmOption:{},
      cmOptionJs: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        readOnly: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: "text/javascript",
        // hint.js options
        hintOptions: {
        // 매칭이 하나만 있을 때 자동으로 완전하게 보정되는지 여부
          completeSingle: false
        },
        //세가지 모드를 제공할 수 있는 단축 키다. sublime、emacs、vim
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
    };
  },
  methods: {
    codeUpdateForm() {
      this.$router.push({ name: "CodeUpdate", params: { article: this.data } });
    },
    codeDeleteForm() {
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
            this.$router.push("/code/board");
          } else {
            alert("게시글을 삭제할 수 없습니다.");
          }
        });
    },
    CommentForm() {
      this.showComment = true;
      this.comment = "";
    },
    closeCommentForm() {
      this.$validator.reset();
      this.showComment = false;
      this.comment = "";
    },
    createComment() {
      // fetch 로 데이터 전송후 closeForm 호출해야함
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("작성하지 않은 란이 있는지 확인해주세요.");
          return;
        } else {
          fetch(this.$store.state.dbserver + "/comments", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: this.$session.get("token"),
              parent_id: this.data._id,
              writer: this.$session.get("nickname"),
              comment: this.comment
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.result == true) {
                this.$store.state.commentflag = true;
              } else {
                alert("댓글을 등록할 수 없습니다.");
              }
              this.closeCommentForm();
            });
        }
      });
    },
    isAdmin() {
      let memberUrl = this.dbserver;
      caxios(memberUrl)
        .request({
          url: `/users/admin/${this.id}/${this.token}`,
          method: "get",
          baseURL: memberUrl
        })
        .then(res => {
          this.selfmembership = res.data.membership;
        });
    },
  },
  updated(){
    this.$store.state.heightflag = true;
  },
  mounted() {
    this.isAdmin();
    if (this.data.language == "javascript") {
      this.cmOption = this.cmOptionJs;
    } else if (this.data.language == "python") {
      this.cmOption = this.cmOptionPy;
    } else if (this.data.language == "vue") {
      this.cmOption = this.cmOptionVue;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap');

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
}
</style>