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
              <blockquote class="body-1">{{userPjt[i-1].description}}</blockquote></a>
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
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style>
#projectsum {
  text-align: left;
}
</style>


