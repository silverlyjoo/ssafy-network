<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>글 수정하기</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="white--text" color="grey darken-2" @click="updateArticle()">수정</v-btn>
      <router-link :to='{name : "CodeDetail" , params:{data : articleData }}' style="text-decoration: none !important; color:black;">
        <v-btn class="white--text" color="grey darken-2" @click="backDetail()">취소</v-btn>
      </router-link>
    </v-toolbar>
    <br />
    <v-card grid-list-md style="width:80%; margin-left:auto; margin-right:auto;">
      <v-card-text>
        <v-container>
          <v-layout wrap column>
            <v-flex xs12>
              <v-text-field
                label="제목"
                v-model="articleData.title"
                v-validate="'required|min:6'"
                :error-messages="errors.collect('title')"
                data-vv-name="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select :items="languages" v-model="selectLanguage" label="선택 언어" single-line></v-select>
            </v-flex>
            <v-flex xs12>
              <codemirror v-model="articleData.source" :options="customOption"></codemirror>
            </v-flex>
            <br />
            <v-flex xs12>
              <v-textarea
                label="내용"
                v-model="articleData.content"
                v-validate="'required'"
                :error-messages="errors.collect('content')"
                data-vv-name="content"
              ></v-textarea>
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
  name: "CodeUpdate",
  $_veeValidate: {
    validator: "new"
  },
  props: {
    article: {}
  },
  data() {
    return {
      languages: [{ text: "javascript" }, { text: "python" }, { text: "vue" }],
      customOption: {},
      articleData: {},
      selectLanguage: "",
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
      }
    };
  },
  methods: {
    goBoard() {
      this.$router.push("/code/board");
    },
    updateArticle() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 확인해주세요.");
          return;
        } else {
          fetch(this.$store.state.dbserver + "/boards", {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              _id: this.articleData._id,
              token: this.$session.get("token"),
              language: this.selectLanguage,
              title: this.articleData.title,
              source: this.articleData.source,
              content: this.articleData.content
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.result == true) {
                this.$router.push("/code/board");
              } else {
                alert("글을 수정할 수 없습니다.");
              }
              this.$validator.reset();
            });
        }
      });
    },
    backDetail() {

    }
  },
  watch: {
    selectLanguage(to, from) {
      if (to == "javascript") {
        this.customOption = this.cmOptionJs;
      } else if (to == "python") {
        this.customOption = this.cmOptionPy;
      } else if (to == "vue") {
        this.customOption = this.cmOptionVue;
      }
    }
  },
  mounted() {
    this.articleData = this.article;
    if (this.articleData.language == "javascript") {
      this.selectLanguage = "javascript";
      this.customOption = this.cmOptionJs;
    } else if (this.articleData.language == "python") {
      this.selectLanguage = "python";
      this.customOption = this.cmOptionPy;
    } else if (this.articleData.language == "vue") {
      this.selectLanguage = "vue";
      this.customOption = this.cmOptionVue;
    }
  }
};
</script>