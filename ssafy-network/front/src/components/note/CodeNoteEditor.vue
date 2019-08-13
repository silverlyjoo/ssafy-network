<template>
  <v-layout class="pa-5" column>
    <v-flex>
      <v-card grid-list-md style="width:80%; margin-left:auto; margin-right:auto;">
        <v-card-text>
          <v-container>
            <v-layout wrap column>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  v-model="notetitle"
                  v-validate="'required|min:2|max:10'"
                  data-vv-name="제목"
                  :error-messages="errors.collect('제목')"
                  ref="notetitle"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select :items="languages" v-model="notelanguage" label="선택 언어" single-line></v-select>
              </v-flex>
              <v-flex xs12>
                <codemirror v-model="notesource" :options="customOption"></codemirror>
              </v-flex>
              <br />
              <v-flex xs12>
                <v-textarea label="내용" v-model="notecontent"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex class="text-xs-right ma-5">
      <v-btn color="grey darken-2"
                    class="white--text" @click="close()">취소</v-btn>
      <v-btn color="grey darken-2"
                    class="white--text" @click="writeNoteCode()">작성</v-btn>
    </v-flex>
  </v-layout>
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
// import 'codemirror/mode/html/html.js'
// import 'codemirror/mode/java.js'
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
  name: "CodeNoteEditor",
  $_veeValidate: {
    validator: "new"
  },
  props: {
    data: { type: Object },
    title: { type: String }
  },
  data() {
    return {
      notetitle: "",
      notesource: "",
      notecontent: "",
      notelanguage: "",
      languages: [{ text: "JavaScript" }, { text: "Python" }, { text: "Vue" }],
      customOption: {},
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
      }
    };
  },
  methods: {
    writeNoteCode() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        }
        var course = this.data.course.split(".");
        var courSize = course[course.length - 1].length + 1;
        var parentCourse = this.data.course.slice(0, Number("-" + courSize));
        // 중복 체크
        fetch(
          this.$store.state.dbserver +
            "/notes/txt/" +
            this.$session.get("id") +
            "/" +
            this.notetitle +
            "/" +
            parentCourse +
            "/" +
            this.$session.get("token"),
          {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.result == false || data._id == this.data._id) {
              fetch(this.$store.state.dbserver + "/notes/txt", {
                method: "PUT",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  _id: this.data._id,
                  token: this.$session.get("token"),
                  name: this.notetitle,
                  content: this.notecontent,
                  editor: "code",
                  language: this.notelanguage,
                  source: this.notesource
                })
              })
                .then(res => res.json())
                .then(data => {
                  if (data.result == true) {
                    this.$store.state.NoteCheck = true;
                  } else {
                    alert("작성 실패..");
                  }
                  this.$router.push("/note/detail/" + this.data._id);
                });
            } else {
              alert("이미 존재하는 이름입니다.");
              this.notetitle = this.title;
              this.$refs.notetitle.focus();
            }
          });
      });
    },
    close() {
      this.$router.push("/note/detail/" + this.data._id);
    }
  },
  watch: {
    notelanguage(to, from) {
      if (to == "JavaScript") {
        this.customOption = this.cmOptionJs;
      } else if (to == "Python") {
        this.customOption = this.cmOptionPy;
      } else if (to == "Vue") {
        this.customOption = this.cmOptionVue;
      }
    }
  },
  mounted() {
    this.notetitle = this.title;
    this.notelanguage = "JavaScript";
    this.customOption = this.cmOptionJs;
  }
};
</script>

