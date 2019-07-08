<template>
  <div>
    <div v-for="pjt in projects">{{pjt}}</div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: "ProjectList",
  data() {
    return {
      projects: [],
      userNames: ["silverlyjoo"]
    };
  },
  getProjects(userName) {
    axios.get(`https://lab.ssafy.com/api/v4/users/${userName}/projects`)
    .then(response => {
      this.projects.push(response.data);
      console.log(this.projects);
    });
  },
  mounted() {
    for (let i = 0; i < this.userNames.length; i++) {
      this.getProjects(this.userNames[i]);
    }
  }
};
</script>

