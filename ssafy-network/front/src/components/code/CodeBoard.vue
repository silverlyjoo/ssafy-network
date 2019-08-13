<template>
  <div class="pa-3" >    
    <v-toolbar flat color="grey lighten-5" style="width:80%; margin-left:auto; margin-right:auto;">
      <v-toolbar-title>Code Review 게시판</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/code/writer" style="text-decoration: none !important"><v-btn class="white--text" color="grey darken-2">글 쓰기</v-btn></router-link>
      <br><br><br>
    </v-toolbar>
    <br>

    <div>
      <div v-if="searchedFlag">
        <v-data-table
          :headers="headers"
          :items="searchedArticles"
          :search="search"
          :server-items-length="totalArticles"
          hide-actions
          :pagination.sync="pagination"
          :loading="loading"
          class="elevation-1"
          style="width:80%; margin-left:auto; margin-right:auto;"
        >
          <template v-slot:items="props">
            <td @click="addHit(props.item._id)" class="text-xs-center header">
              <router-link
                :to='{name : "CodeDetail" , params: { data : props.item } }'
                style="text-decoration: none !important; color:black;"
              >
                {{ props.item.title }}
              </router-link>
            </td>
            <td class="text-xs-center">{{ props.item.writer }}</td>
            <td class="text-xs-center">{{ props.item.createdAt }}</td>
            <td class="text-xs-center">{{ props.item.hit }}</td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="grey darken-2" icon="info" class="ma-3 pa-3">게시글이 없습니다</v-alert>
          </template>
        </v-data-table>
      </div>
      <div v-else>
        <v-data-table
          :headers="headers"
          :items="articles"
          :search="search"
          :server-items-length="totalArticles"
          hide-actions
          :pagination.sync="pagination"
          :loading="loading"
          class="elevation-1"
          style="width:80%; margin-left:auto; margin-right:auto;"
        >
          <template v-slot:items="props">
            <td @click="addHit(props.item._id)" class="text-xs-center header">
              <router-link
                :to='{name : "CodeDetail" , params: { data : props.item } }'
                style="text-decoration: none !important; color:black;">
                {{ props.item.title }}
              </router-link>
            </td>
            <td class="text-xs-center">{{ props.item.writer }}</td>
            <td class="text-xs-center">{{ props.item.createdAt }}</td>
            <td class="text-xs-center">{{ props.item.hit }}</td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="grey darken-2" icon="info" class="ma-3 pa-3">게시글이 없습니다</v-alert>
          </template>
        </v-data-table>
      </div>
      <br>
      <div class="text-xs-center pt-2">
        <v-pagination
          v-model="pagination.page"
          :length="pages"
          :total-visible="7"
          dark
          color="grey darken-2"
        >
        </v-pagination>
      </div>
    </div>

    <br><br>

    <v-layout justify-space-around align-center style="width:80%; margin-left:auto; margin-right:auto;">
      <v-flex xs3 text-xs-center class="px-5">
        <v-select v-model="searchOption2" :items="searchOptions2"></v-select>
      </v-flex>
      <v-flex xs7 class>
        <v-text-field v-model="articleSearchKeyword" @keyup.enter="searchArticles" @keyup.esc="getArticles"></v-text-field>
      </v-flex>
      <v-flex xs1 class="px-5">
        <v-icon @click="searchArticles" large>
          search
        </v-icon>
      </v-flex>
      <v-flex xs1 class="px-3">
        <v-icon @click="getArticles" large>
          cached
        </v-icon>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "CodeBoard",
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      searchedArticles: [],
      searchedFlag: false,
      articleSearchKeyword: "",
      searchOption2: "제목",
      searchOptions2: ["언어", "작성자", "제목", "코드", "내용"],
      loading: true,
      search: "",
      today: "",
      totalArticles: 0,
      articles: [],
      pagination:{
        'sortBy': 'createdAt',
        'descending': true,
        'rowsPerPage': 10,
        'totalItems': 0,
      },
      selected: [],
      headers: [
        {
          text: "제목",
          align: "center",
          sortable: false,
          value: "title",
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
          value: "createdAt",
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
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  methods: {
    searchArticles() {
      fetch(
        this.$store.state.dbserver +
          "/search/boards/" +
          this.searchOption2 +
          "/" +
          this.articleSearchKeyword +
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
          if (data) {
            this.searchedArticles = data;
            this.searchedFlag = true;
            this.searchedArticles.sort(function(a,b) {
              if (new Date(a.createdAt) < new Date(b.createdAt)) {
                return 1;
              }
              if (new Date(a.createdAt) > new Date(b.createdAt)) {
                  return -1;
              }
              return 0;
            });
          } else {
            alert("올바른 값을 입력하세요");
          }
        })
        .catch(error => console.log(error))
        .finally();
    },
    getArticles() {
      this.articleSearchKeyword = "",
      fetch(this.$store.state.dbserver + "/boards/" + this.$session.get("token"), {
        method: "GET",
        hearders: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data => {
        this.articles = data;
        this.searchedArticles.sort(function(a,b) {
          if (new Date(a.createdAt) < new Date(b.createdAt)) {
            return 1;
          }
          if (new Date(a.createdAt) > new Date(b.createdAt)) {
              return -1;
          }
          return 0;
        });
        this.pagination.totalItems = this.articles.length;
        this.loading = false;
        this.searchedFlag = false;
      })
    },
    addHit(id) {
      fetch(this.$store.state.dbserver + "/boards/hit", {
        method: "PUT",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id : id,
          token : this.$session.get("token"),
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.result == true) {
          this.getArticles();
        }
      });
    },
  },
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
}
.header{
  overflow: hidden; 
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10vw;
  max-height: 10vh;
}
.code-detail {
  text-decoration: none !important;
  color:black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>