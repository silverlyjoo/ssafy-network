<template>
  <div class="pa-5">
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>글 읽기</v-toolbar-title>
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
                  v-model="article.title"
                  v-validate="'required'"
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
                  :options="cmOptionJs">
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
    <!-- </v-layout> -->
  </div>
</template>


<script>
export default {
  name: "CodeBoard",
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      today: "",
      totalArticles: 0,
      articles: [],
      loading: true,
      pagination:{},
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
    this.getArticles();
    this.getDay();
  },

  language(to, from) {
    if (to == "JavaScript") {
      this.option = this.cmOptionsJs;
    } else if (to == "Python") {
      this.option = this.cmOptionsPy;
    } else if (to == "Vue") {
      this.option = this.cmOptionsVue;
    }
  },

  methods: {
   
    getArticles() {
      fetch(this.$store.state.dbserver + "/boards/" + this.$session.get("token"), {
        method: "GET",
        hearders: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data => {
        this.articles = data;
        this.loading = false;
      })
    },
    getDay() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; // 1월이 0 !
      var yyyy = today.getFullYear();
      if ( dd < 10 ) {
        dd = "0" + dd;
      }
      this.month = mm;
      if (mm < 10) {
        mm = "0" + mm;
      }
      this.today = yyyy + "-" + mm + "-" + dd;
    },
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