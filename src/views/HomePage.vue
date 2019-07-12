<template>
  <div class="mainPage">
    <div class="mainLogo Absolute-Center">WM project</div>
    <router-link to="/project" class="projectlink linktext">project</router-link>
  </div>
</template>

<script>
import ImgBanner from "@/components/common/ImgBanner.vue";

export default {
  components: {
    ImgBanner
  },
  methods: {
    pageLog() {
      console.log(this.$router.history.current);
    }
  },
  mounted() {
    this.pageLog();
  }
};
</script>
<style>
.mainPage {
  background-color: rgb(46, 46, 46);
  position: absolute;
  width: 100vw;
  height: 100vh;
  text-align: center;
  
}
.mainLogo {
  color: rgb(82, 125, 189);
  font-size: 7vw;
  font-family: "Roboto Slab", serif;
  font-weight: 300;
  /* line-height: 50vw */
}
.Absolute-Center {
  margin-top: 50vh;
}
.linktext {
  color: white;
  text-decoration: none;
  font-family: 'Roboto';
  font-size: 5vw;
  font-weight: 200;
}
.projectlink {
  position: absolute;
  
}
</style>
