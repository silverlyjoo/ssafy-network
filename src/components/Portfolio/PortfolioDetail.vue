<template>
  <div>
    <v-responsive>
      <v-container class="text-xs-center">
        <v-layout align-center>
          <v-flex aspect-ratio="1.7">
            <h3 class="display-3">{{title}}</h3>

            <br>
            <br>

            <v-img :src="imgSrc" height="50%" width="80%" style="margin: 0 auto;"></v-img>

            <br>
            <br>

            <v-divider class="my-3"></v-divider>

            <br>
            <br>

            <span class="subheading">{{content}}</span>

            <br>
            <br>
            <br>

            <div>
              <v-btn class="my-1" color="dark" large @click="back()" exact>돌아가기</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>
<script>
export default {
  name: "PortfolioDetail",
  props: {
    title: { type: String },
    content: { type: String },
    imgSrc: { type: String }
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.push("/portfolio");
    }
  }
};
</script>
