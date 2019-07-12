<template>
  <div class="about">
    <h1>This is an Home page</h1>
    <!-- session 값 있을때 바로 페이지 -->
    <router-link to="/about">about</router-link>
    <router-view></router-view>
    <div v-if="session"></div>
    <!-- session 값 없을때 로그인 창 -->
    <div v-else></div>
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
