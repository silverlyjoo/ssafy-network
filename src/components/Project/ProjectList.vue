<template>
  <div>
    <div>
        <div v-for="userPjt in projects">
                <ProjectSum :userPjt="userPjt"></ProjectSum>
        </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import console from "console";
import ProjectSum from "@/components/Project/ProjectSum"

export default {
  name: "ProjectList",
  data() {
    return {
      projects: [],
      userNames: ["silverlyjoo"]
    };
  },
  methods: {
    getProjects(userName) {
      axios
        .get(`https://lab.ssafy.com/api/v4/users/${userName}/projects`)
        .then(response => {
          this.projects.push(response.data);
          //   console.log('object', object)
        });
      console.log(this.projects);
    }
  },
  mounted() {
    for (let i = 0; i < this.userNames.length; i++) {
      this.getProjects(this.userNames[i]);
    }
  },
  components : {
      ProjectSum
  }
};
</script>

