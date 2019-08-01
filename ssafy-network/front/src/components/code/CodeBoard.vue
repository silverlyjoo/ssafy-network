<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>Code Review 게시판</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/code/writer" style="text-decoration: none !important"><v-btn class="white--text" color="grey darken-2">글 쓰기</v-btn></router-link>
      <br><br><br>
    </v-toolbar>

    <br>

    <v-data-table
      :headers="headers"
      :items="articles"
      class="elevation-1"
      style="width:80%; margin-left:auto; margin-right:auto;"
    >
      <template v-slot:top>
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
        <v-alert :value="true" color="grey darken-2" icon="info">게시글이 하나도 없습니다</v-alert>
      </template>
    </v-data-table>
  </div>
</template>


<script>
export default {
  name: "CodeBoard",
  $_veeValidate: {
    validator: "new",
  },
  props: [
    // "articles"
  ],
  data() {
    return {
      articles: [],
      click: false,
      article: {
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
      // language: "",
      // option: {},
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
      // editedIndex: -1,
      // editedItem: {
      //   title: "",
      //   source: "",
      //   content: "",
      //   language: ""
      // },
      // defaultItem: {
      //   title: "",
      //   source: "",
      //   content: "",
      //   language: ""
      // }
    };
  },
  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? "새 글 작성하기" : "글 수정하기";
  //   }
  // },

  watch: {
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
      // this.dialog = true;
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
      this.article.title = "";
      this.article.source = "";
      this.article.content = "";
      this.article.selectedLanguage = "";
      this.$validator.reset();
    },
    addArticle() {
      fetch(this.$store.state.dbserver + "/boards",{method: "POST",
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          language: this.article.language,
          writer: this.article.writer,
          title: this.article.title,
          source: this.article.source,
          content: this.article.content
        })
        }).then(res => res.json())
    .then(data => {
        if(data.result == true){
        alert("게시글이 등록되었습니다.");
        }else{
        alert("게시글을 등록할 수 없습니다...");
        }
        this.close();
    });
    }
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