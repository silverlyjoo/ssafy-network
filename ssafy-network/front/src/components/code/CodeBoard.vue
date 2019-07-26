<template>
  <div class="pb-5">
    <v-card-text>
      <v-layout row style="width:80%; margin-left:auto; margin-right:auto;">
        <!-- <v-flex xs8 sm4>
          <v-text-field label="검색" v-model="search"></v-text-field>
        </v-flex>-->
      </v-layout>
    </v-card-text>
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>Code Review 게시판</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="info write-btn">글 쓰기</v-btn>
          <br />
          <br />
          <br />
        </template>
        <v-card>
          <v-toolbar class="v-toolbar theme--light indigo lighten-1">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title style="color:white;">{{ formTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="save">등록</v-btn>
              <v-btn dark flat @click="close">취소</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-container grid-list-md style="width:80%; padding:100px;">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    :items="languages"
                    :menu-props="{ top: false, offsetY: true }"
                    v-model="Language"
                    label="선택 언어"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <codemirror
                    v-model="editedItem.sourcecode"
                    :options="option"
                  >
                  </codemirror>
                  <!-- <div v-else="items.JavaScript" class="codemirror">
                    <codemirror
                      v-if="items.Python"
                      v-model="editedItem.sourcecode"
                      :options="cmOptionsPy"
                    >{{ sourcecode }}
                    </codemirror>
                  </div> -->
                  <!-- <codemirror v-model="sourcecode" :options="cmOptions">{{ sourcecode }}</codemirror> -->
                  <!-- <v-textarea id="editor" box label="Code" v-model="editedItem.code" auto-grow value></v-textarea> -->
                </v-flex>
                <v-flex xs12>
                  <v-textarea box label="내용" v-model="editedItem.content" auto-grow value></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <br />

    <v-data-table
      :headers="headers"
      :items="articles"
      :search="search"
      class="elevation-1"
      style="width:80%; margin-left:auto; margin-right:auto;"
    >
      <template v-slot:items="props">
        <td>{{ props.item.index }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.sourcecode }}</td>
        <td>{{ props.item.content }}</td>
        <td class="text-xs-center">{{ props.item.hit }}</td>
        <td class="text-xs-center">{{ props.item.writer }}</td>
        <td class="justify-center text-xs-center layout px-0">
          {{ props.item.editorremove }}
          <v-icon small class="mr-2" color="teal" @click="editItem(props.item)">edit</v-icon>
          <v-icon small color="pink" @click="deleteItem(props.item)">delete</v-icon>
        </td>
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
  import 'codemirror/mode/django/django.js'
  // import 'codemirror/mode/html/html.js'
  // import 'codemirror/mode/java.js'
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/python/python.js'
  import 'codemirror/mode/vue/vue.js'

  // theme css
  import 'codemirror/theme/monokai.css'
  import 'codemirror/theme/base16-dark.css'
  import 'codemirror/theme/base16-light.css'
  import 'codemirror/theme/paraiso-light.css'
  import 'codemirror/theme/cobalt.css'
  import 'codemirror/theme/rubyblue.css'
  import 'codemirror/theme/mbo.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'

  // closebrackets
  import'codemirror/addon/edit/closebrackets.js'

  // styleSelectedText
  import'codemirror/addon/selection/mark-selection.js'
  import'codemirror/addon/search/searchcursor.js'

  // hint
  import'codemirror/addon/hint/show-hint.js'
  import'codemirror/addon/hint/show-hint.css'
  import'codemirror/addon/hint/javascript-hint.js'
  import'codemirror/addon/selection/active-line.js'

  // highlightSelectionMatches
  import'codemirror/addon/scroll/annotatescrollbar.js'
  import'codemirror/addon/search/matchesonscrollbar.js'
  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/addon/search/match-highlighter.js'

  // keyMap
  import'codemirror/mode/clike/clike.js'
  import'codemirror/addon/edit/matchbrackets.js'
  import'codemirror/addon/comment/comment.js'
  import'codemirror/addon/dialog/dialog.js'
  import'codemirror/addon/dialog/dialog.css'
  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/addon/search/search.js'
  import'codemirror/keymap/sublime.js'
  import'codemirror/keymap/emacs.js'

  // foldGutter
  import'codemirror/addon/fold/foldgutter.css'
  import'codemirror/addon/fold/brace-fold.js'
  import'codemirror/addon/fold/comment-fold.js'
  import'codemirror/addon/fold/foldcode.js'
  import'codemirror/addon/fold/foldgutter.js'
  import'codemirror/addon/fold/indent-fold.js'
  import'codemirror/addon/fold/markdown-fold.js'
  import'codemirror/addon/fold/xml-fold.js'

// 여기까지

export default {
  data() {
    return {
      search: "",
      languages: ['JavaScript', 'Python', 'Vue',],
      Language :"",
      option:{},
      cmOptionsJs: {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: 'text/javascript',
        // hint.js options
        hintOptions:{
          // 当匹配只有一项的时候是否自动补全
          completeSingle: false
        },
        //快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        extraKeys: { "Ctrl": "autocomplete" }
      },
      cmOptionsPy: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-python',
        theme: 'mbo',
      },
      cmOptionsVue: {
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keyMap: "sublime",
        mode: 'text/x-vue',
        theme: 'base16-dark',
        extraKeys: {
          'F11'(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"))
          },
          'Esc'(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
          }
        }
      },
      editor: "",
      dialog: false,
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
          text: "코드",
          align: "center",
          sortable: false,
          value: "sourcecode"
        },
        {
          text: "내용",
          align: "center",
          sortable: false,
          value: "content"
        },
        {
          text: "조회수",
          align: "center",
          sortable: true,
          value: "hit"
        },
        {
          text: "작성자",
          align: "center",
          sortable: false,
          value: "writer"
        },
        {
          text: "수정/삭제",
          align: "center",
          sortable: false,
          value: "editorremove"
        }
      ],
      articles: [],
      editedIndex: -1,
      editedItem: {
        title: "",
        sourcecode: "",
        content: "",
        language: "",
      },
      defaultItem: {
        title: "",
        sourcecode: "",
        content: "",
        language: "",

      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "새 글 작성하기" : "글 수정하기";
    }
  },
  
  // mounted() {
  //   setTimeout(() => {
  //     (this.styleSelectedText = true), (this.cmOption.styleActiveLine = true);
  //   }, 1800);
  // },

  // mounted() {
  //   setTimeout(() => {
  //     this.styleSelectedText =  true,
  //     this.cmOption.styleActiveLine = true
  //   }, 1800)
  // },

  // mounted() {
  //   // console.log('this is current codemirror object', this.codemirror)

  //   this.editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
  //     mode:  "htmlmixed",
  //     extraKeys: {"Ctrl-Space": "autocomplete"},
  //     lineNumbers: true,
  //     autoCloseTags: true,
  //     theme: 'monokai'
  //   });

  //   this.autoFormat();
  // },

  watch: {
    dialog(val) {
      val || this.close();
    },
    Language(to,from){
      if (to == 'JavaScript') {
        this.option = this.cmOptionsJs;
        this.editedItem.language = this.languages[0];

      } else if (to == 'Python') {
        this.option = this.cmOptionsPy;
        this.editedItem.language = this.languages[2];

      } else if (to == 'Vue') {
        this.option = this.cmOptionsVue;
        this.editedItem.language = this.languages[6];

      } else if (to == '') {

      }
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.articles = [
        {
          index: 1,
          title: "I have a question about python",
          sourcecode: "",
          content: "In python, how can I define function?",
          hit: 5,
          writer: "Maestro_Of_Python"
        },
        {
          index: 2,
          title: "Vue, 꼭 해야하나요?",
          sourcecode: "",
          content:
            "다른 사람들 다 앵귤러나 리액트하는데 왜 뷰 해야하는지 모르겠네요",
          hit: 87,
          writer: "앵귤러리액트"
        },
        {
          index: 3,
          title:
            "알고리즘 시험 대비해서 링크드 리스트 만들 때, 더 쉽게 외우는 방법 없나요?",
          sourcecode: "",
          content:
            "이미 외웠긴 했는데, 더 쉽게 외울 수 있는 방법이 있나 궁금하네요",
          hit: 25,
          writer: "SW_Expert"
        },
        {
          index: 4,
          title: "자바 스프링 다 까먹었는데 큰 일이네요 ㅠㅠ",
          sourcecode: "",
          content: "다른 분들은 어떠신가요??",
          hit: 29,
          writer: "JavaMaster"
        },
        {
          index: 5,
          title: "자소서 한 번도 안 써봤는데 7월 절반이 지나갔네요 ㅠㅠ",
          sourcecode: "",
          content: "이번에 안랩하고 인바디 떴던데 이참에 한 번 쓸까봐요",
          hit: 15,
          writer: "경력3년차"
        },
        {
          index: 6,
          title: "면접볼 때 PT 면접 있잖아요, 어떻게 해요? ㅠㅠ",
          sourcecode: "",
          content:
            "제가 발표를 한 번도 해 본 적이 없는데 슬슬 걱정이네요... 다들 발표 잘 하시나요?",
          hit: 15,
          writer: "PT의신"
        },
        {
          index: 7,
          title: "오늘 조퇴하고 싶네요",
          sourcecode: "",
          content: "물론 다음 주 월요일 팀빌딩도 조퇴, 아니 결석하고 싶어요",
          hit: 111,
          writer: "출석률100%"
        },
        {
          index: 8,
          title: "지금 편성된 조에 적응을 잘 못하겠어요ㅠㅠ",
          sourcecode: "",
          content:
            "다음 주 월요일 팀빌딩으로 친해지는 시간 있다는데, 제가 소극적이라서... 친해질 수 있을지 걱정이에요... ㅠㅠ",
          hit: 45,
          writer: "핵인싸"
        },
        {
          index: 9,
          title: "IT에서 돈 많이 벌려면 뭘 준비해야 할까요",
          sourcecode: "",
          content:
            "역시 실력을 키우는 걸까요? 아니면 로또가 답일까요? 결국엔 치킨집 차릴텐데 휴...",
          hit: 22,
          writer: "IT개발자-연봉1억"
        },
        {
          index: 10,
          title: "삼성 오딧세이 좋네요 하나 사려는데 최저가 아시는 분?",
          sourcecode: "",
          content:
            '소위 말하는 "앱등이"입니다. 오딧세이 사용해보니 좋네요. 오딧세이 올해 최신판으로 사볼까 하는데 조언 부탁드려요',
          hit: 19,
          writer: "앱등이"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.articles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.articles.indexOf(item);
      confirm("삭제하시겠습니까?") && this.articles.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.articles[this.editedIndex], this.editedItem);
      } else {
        this.articles.push(this.editedItem);
      }
      this.close();
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