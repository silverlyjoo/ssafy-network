<template>
    <div v-for="pjt in projects">{{pjt}}</div>
</template>


<script>

export default {
  name: "ProjectList",
  data () {
      return {
          projects : [],
          userNames : ['silverlyjoo']
      };
  },
  getProjects(userName) {
      axios.get(`https://lab.ssafy.com/api/v4/users/${userName}/projects`)
      then.( (response) => {
          this.projects = response.data
          console.log(this.projects)
      })
  }

};
</script>

