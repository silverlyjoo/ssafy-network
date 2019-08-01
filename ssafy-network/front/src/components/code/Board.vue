<template>
  <div class="pb-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>Code Review 게시판</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition"> -->
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="info write-btn">글 쓰기</v-btn>
          <br><br><br>
        </template>

        <!-- <v-card> -->
          <!-- <v-toolbar class="v-toolbar theme--light indigo lighten-1">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title style="color:white;">{{ formTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="addArticle()">등록</v-btn>
              <v-btn dark flat @click="close()">취소</v-btn>
            </v-toolbar-items>
          </v-toolbar> -->

          <!-- <v-card-text>
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
                    auto-grow value></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog> -->
    </v-toolbar>

    <br>

    <v-data-table
      :headers="headers"
      :items="articles"
      :search="search"
      class="elevation-1"
      style="width:80%; margin-left:auto; margin-right:auto;"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ prop.article.index }}</td>
        <td><router-link to="/code/board/detail" style="text-decoration: none !important; color:black;">{{ prop.article.title }}</router-link></td>
        <td class="text-xs-center">{{ prop.article.hit }}</td>
        <!-- <td>{{ props.item.source }}</td> -->
        <!-- <td class="text-xs-center">{{ props.item.writer }}</td> -->
        <!-- <td class="justify-center text-xs-center layout px-0">{{ props.item.editorremove }}</td> -->

        <!-- <td class="text-xs-center"> -->

          <!-- {{ props.item.content }} -->
          <!-- {{ props.item.editorremove }} -->
          <!-- <v-icon small class="mr-2" color="teal" @click="editItem(props.item)">edit</v-icon> -->
          <!-- <v-icon small color="pink" @click="deleteItem(props.item)">delete</v-icon> -->

        <!-- </td> -->
      </template>

      <template slot="no-data">
        <v-alert :value="true" color="info" icon="info">게시글이 하나도 없습니다</v-alert>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/base16-dark.css";
import CodeMirror from "codemirror";
import "codemirror/addon/edit/matchbrackets.js";

// 코드미러 임폴트

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
  name: "CodeBoard",
  props: ["articles"],
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      search: "",
      dialog: false,
      article: {
        _id: "",
        title: "",
        source: "",
        content: "",
        selectedLanguage: "",
      },
      languages: [
        { text: "JavaScript" },
        { text: "Python" },
        { text: "Vue" },
      ],
      language: "",
      option: {},
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
      // editor: "",
      headers: [
        {
          text: "글 번호",
          align: "center",
          sortable: true,
          value: "index"
        },
        {
          text: "제목",
          align: "center",
          sortable: false,
          value: "title"
        },
        {
          text: "조회수",
          align: "center",
          sortable: true,
          value: "hit"
        },
      ],
      editedIndex: -1,
      editedItem: {
        title: "",
        source: "",
        content: "",
        language: ""
      },
      defaultItem: {
        title: "",
        source: "",
        content: "",
        language: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "새 글 작성하기" : "글 수정하기";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    language(to, from) {
      if (to == "JavaScript") {
        this.option = this.cmOptionsJs;
        // this.editedItem.language = this.languages[0];
      } else if (to == "Python") {
        this.option = this.cmOptionsPy;
        // this.editedItem.language = this.languages[1];
      } else if (to == "Vue") {
        this.option = this.cmOptionsVue;
        // this.editedItem.language = this.languages[2];
      }
      // else if (to == "") {
      // }
    }
  },

  methods: {
    articleClick(article, jsArticle, pos) {
      this.dialog = true;
      this.article._id = article._id;
      this.article.title = article.title;
      this.article.source = article.source;
      this.article.content = article.content;
      this.article.selectedLanguage = article.selectedLanguage;
    },
    getArticle() {
      fetch(this.$store.state.dbserver + "/boards/" + "/" + this.$session.get("token"), {
        method: "GET",
        hearders: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data => {
        this.events = data;
      })
    },

    // editItem(item) {
    //   this.editedIndex = this.articles.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    // deleteItem(item) {
    //   const index = this.articles.indexOf(item);
    //   confirm("삭제하시겠습니까?") && this.articles.splice(index, 1);
    // },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.articles[this.editedIndex], this.editedItem);
    //   } else {
    //     this.articles.push(this.editedItem);
    //   }
    //   this.close();
    // },
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

/**/
.CodeMirror-focused .cm-matchhighlight {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==);
  background-position: bottom;
  background-repeat: repeat-x;
}
.cm-matchhighlight {
  background-color: lightgreen;
}
.CodeMirror-selection-highlight-scrollbar {
  background-color: green;
}
/**/
</style>