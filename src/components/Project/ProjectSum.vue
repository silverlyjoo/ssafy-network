<template>
  <v-container id="projectsum">
    <v-flex xs12 class="mb-3">
      <span class="headline">
        {{ userPjt[0].namespace.name}}
        's repositories
        <br />
      </span>
    </v-flex>
    <v-flex xs12>
      <v-card v-for="i in userPjt.length" class="mb-3 pa-3">
        <a :href="userPjt[i-1].web_url" style="text-decoration:none !important">
          <div class="headline mb-2">{{userPjt[i-1].path}}</div>
          <blockquote class="body-1">{{userPjt[i-1].description}}</blockquote>
        </a>
        <v-flex style="width:100%; height:200px;">
          <div id="graph-container"></div>
        </v-flex>
      </v-card>
    </v-flex>
    <!-- <div>{{ userPjt }}</div> -->
  </v-container>
</template>



<script>
import gitgraph from "@/services/graph.js"

export default {
  name: "ProjectSum",
  props: {
    userPjt: { type: Array }
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    getData(i) {
      return this.userPjt[i - 1].web_url + "/network/master?format=json";
    },
    getJSONdata(){
      const Url = "https://lab.ssafy.com/silverlyjoo/webmobile-sub2/network/master?format=json";
      let content = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      };
    }
  },

  mounted() {
    this.getJSONdata();
  }
};
</script>
<style>
#projectsum {
  text-align: left;
}
</style>


