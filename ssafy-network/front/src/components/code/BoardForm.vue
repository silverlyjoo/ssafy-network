<template>
  <v-layout column>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="info write-btn">글 쓰기</v-btn>
        <br><br><br>
      </template>
      <v-card>
        <v-toolbar class="v-toolbar theme--light indigo lighten-1">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title style="color:white;">{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="addArticle()">등록</v-btn>
            <v-btn dark flat @click="close()">취소</v-btn>
          </v-toolbar-items>
        </v-toolbar>

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
                  auto-grow value></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "BoardForm",
  props: {

  },
  data() {
    return {
      dialog: false,
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
      ]
    };
  },
  methods: {
    close() {
      this.article.title = "";
      this.article.source = "";
      this.article.content = "";
      this.article.selectedLanguage = "";
      this.$validator.reset();
    },
    addArticle() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        } else {
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
      })
    }
  }
}
</script>