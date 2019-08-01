<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>글 작성하기</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click="addArticle()">등록</v-btn>
        <v-btn dark flat @click="close()">취소</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout>
      <v-card>
        <v-card-text>
          <v-container grid-list-md style="width:80%; padding:100px;">
            <v-layout wrap column>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="제목"
                  v-model="article.title"
                  v-validate="'required'"
                  data-vv-name="title"
                  :error-messagges="errors.collect('title')"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  :items="languages"
                  v-model="article.selectedLanguage"
                  label="선택 언어"
                  single-line
                  v-validate="'required'"
                  data-vv-name="selectedLanguage"
                  :error-messages="errors.collect('selectedLanguage')"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <codemirror
                  v-model="article.source"
                  :options="option">
                </codemirror>
              </v-flex>
             <v-flex xs12 sm6 md4>
               <v-textarea
                 label="내용"
                 v-model="article.content"
                 v-validate="'required'"
                 :error-messages="errors.collect('content')"
                 data-vv-name="content"
                 auto-grow value>
                </v-textarea>
              </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
    </v-layout>
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
  name: "CodeWriter",
  $_veeValidate: {
    validator: "new",
  },
  props: {  
  },
  data() {
    return {
      cmOptionsJs: {
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
      cmOptionsPy: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-python",
        theme: "mbo"
      },
      cmOptionsVue: {
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
  }
}
</script>