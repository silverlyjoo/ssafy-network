<template>
  <v-container id="projectsum">
    <v-flex xs12 class="mb-3">
      <span class="headline">{{ userPjt[0].namespace.name}}</span>
      <span class="title">
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
          <div class="network-graph" :data-url="data" data-commit-url></div>
        </v-flex>
      </v-card>
    </v-flex>
    <!-- <div>{{ userPjt }}</div> -->
  </v-container>
</template>


<script>
export default {
  name: "ProjectSum",
  props: {
    userPjt: { type: Array }
  },
  data() {
    return {
      data: ''
    };
  },
  methods: {
    getData(i) {
      return this.userPjt[i - 1].web_url + "/network/master?format=json";
    },
    getJSONdata(){
      const Url = "https://lab.ssafy.com/mwh5026/testproject/network/master?format=json";
      let content = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin':'*',
          'private_token' : 'fwjHN_fSR1p_Pk6tcCJq'
        }
      };

      fetch(Url,content)
        .then((response) => {
          if(response.ok){
            return response.json();
          }
          throw new Error("네트워크 에러");
        }).then((json) => {
          this.data.push(json);
        }).catch((error) => {
          console.log(error);
        });
    }
  },

  mounted() {
    //this.getJSONdata();
  }
};
</script>
<style>
#projectsum {
  text-align: left;
}
</style>


