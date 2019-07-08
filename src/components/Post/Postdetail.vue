<template>
  <div>
    <v-responsive>
      <v-container class="text-xs-center">
        <v-layout align-center>
          <v-flex aspect-ratio="1.7">
            <h2 class="display-2" style="text-align:left">{{titles}}</h2>
            <br />

            <v-layout>
              <v-flex xs10 align-self-center style="text-align:left">
                <span class="subheading">{{writers}}</span>
                <span class="body-2 grey--text">{{date}}</span>
              </v-flex>
              <v-flex xs2>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <!-- <v-list-tile  @click=""> -->
                    <v-list-tile>Edit</v-list-tile>
                    <v-list-tile>Delete</v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-layout>

            <v-divider class="my-3"></v-divider>

            <p>{{contents}}</p>
            <br />
            <br />

            <div>
              <v-btn color="primary" dark class="mb-2" @click="back()" exact>목록보기</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>
<script>
export default {
  name: "Postdetail",
  props: {
    date: { type: String },
    titles: { type: String },
    writers: { type: String },
    contents: { type: String }
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.push("/post");
    }
  }
};
</script>
<style>
</style>