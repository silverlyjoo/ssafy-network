<template>
  <div class="home">
    <h1>This is an Home page</h1>
    <!-- session 값 있을때 바로 페이지 -->
    <router-link to="/about">about</router-link>
    <router-link to="/note">note</router-link>
    <router-link to="/code">code</router-link>
    <router-link to="/social">social</router-link>
    <router-view></router-view>
  </div>
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
