<template>
  <div>
    <v-layout row wrap justify-center class="text-xs-right">
      <v-flex xs10 class="px-2">
        <v-spacer></v-spacer>


        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn small v-on="on">새 프로젝트</v-btn>
        </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Gitlab 팀원 추가</v-card-title>
            <v-card-text class="text-xs-center">Gitlab 연동하는거</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialog = false">accept</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs10>
        <div v-for="userPjt in projects">
          <ProjectSum :userPjt="userPjt"></ProjectSum>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import axios from "axios";
import console from "console";
import ProjectSum from "@/components/Project/ProjectSum";

export default {
  name: "ProjectList",
  data() {
    return {
      projects: [],
      userNames: ["silverlyjoo"],
      dialog: false
    };
  },
  methods: {
    getProjects(userName) {
      axios
        .get(`https://lab.ssafy.com/api/v4/users/${userName}/projects?private_token=fwjHN_fSR1p_Pk6tcCJq`)
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
  components: {
    ProjectSum
  }
};
</script>

