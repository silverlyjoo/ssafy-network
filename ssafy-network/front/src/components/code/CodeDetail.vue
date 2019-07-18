<template>
  <div>
    <v-responsive>
      <v-container class="text-xs-center">
        <v-layout align-center>
          <v-flex aspect-ratio="1.7">
            <h3 class="display-3">CRUD 中 R{{title}}</h3>

            <v-divider class="my-3"></v-divider>

            <span class="subheading">{{writer}}</span>

            <div class="back-btn">
              <v-btn class="my-1" color="primary" @click="update()" exact>수정하기</v-btn>
              <v-btn class="my-1" color="primary" @click="back()" exact>목록</v-btn>
              <v-btn class="my-1" color="primary" @click="remove()" exact>삭제하기</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>
<script>
export default {
  name: "CodeDetail",
  props: {
    title: { type: String },
    writer: { type: String },
    hit: { type: String }
  },
  data() {
    return {};
  },
  methods: {
    update() {
      this.$router.push("/code/write");
    },
    back() {
      this.$router.push("/code/board");
    },
    remove() {
      this.$router.push("/code/board");
    }
  }
};
</script>

<style>
    .back-btn {
        float: right;
    }
</style>