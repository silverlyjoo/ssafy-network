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
      :server-items-length="totalArticles"
      :pagination.sync="pagination"
      class="elevation-1"
      style="width:80%; margin-left:auto; margin-right:auto;"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.writer }}</td>
        <td class="text-xs-center">{{ props.item.createdAt }}</td>
        <td class="text-xs-center">{{ props.item.hit }}</td>
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
  data() {
    return {
      totalArticles: 0,
      articles: [],
      loading: true,
      pagination:{},
      headers: [
        {
          text: "제목",
          align: "center",
          sortable: true,
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