<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <h1>This is Our Home page</h1>
        <!-- session 값 있을때 바로 페이지 -->
        <router-link to="/about">about</router-link>
        <router-link to="/note">note</router-link>
        <router-link to="/code">code</router-link>
        <router-link to="/social">social</router-link>
      </v-flex>
    <v-flex>
    <v-content>
      <router-view></router-view>
    </v-content>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      session: true
    };
  }
};
</script>
<style>
.home {
  background: rgb(10, 0, 56);
  color: rgb(218, 234, 248);
}
</style>
