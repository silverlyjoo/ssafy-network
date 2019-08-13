<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>글 작성하기</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn class="white--text" color="grey darken-2" @click="addArticle()">등록</v-btn>
        <router-link to="/code/board" style="text-decoration: none !important"><v-btn class="white--text" color="grey darken-2">취소</v-btn></router-link>
    </v-toolbar>
    
    <br>

    <v-card grid-list-md style="width:80%; margin-left:auto; margin-right:auto;">
      <v-card-text>
        <v-container>
          <v-layout wrap column>
            <v-flex xs12>
              <v-text-field
                label="제목"
                v-model="article.title"
                v-validate="'required|min:6'"
                :error-messages="errors.collect('title')"
                data-vv-name="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                :items="languages"
                v-model="article.selectedLanguage"
                label="선택 언어"
                single-line
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <codemirror
                v-model="article.source"
                :options="customOption">
              </codemirror>
            </v-flex>
            <br>
            <v-flex xs12>
              <v-textarea
                label="내용"
                v-model="article.content"
                v-validate="'required'"
                :error-messages="errors.collect('content')"
                data-vv-name="content"
              >
              </v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

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

// 여기까지

export default {
  name: "CodeWriter",
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      article: {
        title: "",
        source: "",
        content: "",
        selectedLanguage: "",
      },
      languages: [
        { text: "javascript" },
        { text: "python" },
        { text: "vue" },
      ],
      customOption:{},
      cmOptionJs: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: "text/javascript",
        hintOptions: {
          completeSingle: false
        },
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
    }
  },
  methods: {
    goBoard() {
      this.$router.push("/code/board");
    },
    addArticle() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("작성하지 않은 란이 있는지 확인해주세요.");
          return;
        } else {
          fetch(this.$store.state.dbserver + "/boards", { method: "POST",
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: this.$session.get("token"),
              language: this.article.selectedLanguage,
              writer: this.$session.get("nickname"),
              title: this.article.title,
              source: this.article.source,
              content: this.article.content
            })
            }).then(res => res.json())
          .then(data => {
            if(data.result == true){
              this.$router.push("/code/board");
            }else{
            alert("게시글을 등록할 수 없습니다...");
            }
          });
        }
      })
    },
  },
  watch:{
    'article.selectedLanguage'(to, from){
      if (to == "javascript") {
      this.customOption = this.cmOptionJs;
    } else if (to == "python") {
      this.customOption = this.cmOptionPy;
    } else if (to == "vue") {
      this.customOption = this.cmOptionVue;
    }
    }
  },
  mounted(){
    this.article.selectedLanguage ="javascript";
    this.customOption = this.cmOptionJs;
  }
}
</script>