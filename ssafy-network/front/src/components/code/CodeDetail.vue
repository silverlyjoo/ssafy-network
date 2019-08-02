<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>글 읽기</v-toolbar-title>
      <v-spacer></v-spacer>
        <router-link to="/code/board" style="text-decoration: none !important"><v-btn class="white--text" color="grey darken-2">목록</v-btn></router-link>
        <v-btn class="white--text" color="grey darken-2">수정</v-btn>
        <router-link to="/code/board" style="text-decoration: none !important"><v-btn class="white--text" color="grey darken-2">삭제</v-btn></router-link>
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
  </div>
</template>


<script>


export default {
  name: "CodeDetail",
  $_veeValidate: {
    validator: "new",
  },
  props:{
    data : {type:Object}
  },
  data() {
    return {
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
        { text: "python" },
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
    
  },
  methods: {
   
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