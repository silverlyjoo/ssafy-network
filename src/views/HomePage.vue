<template>
<div class="mainPage">
  <div class="mainLogo">WM project</div>
  <GitGraph></GitGraph>
</div>
</template>

<script>
import ImgBanner from "@/components/common/ImgBanner.vue";
import GitGraph from "@/components/Project/GitGraph.vue";

export default {
  components: {
    ImgBanner,
    GitGraph
  },
  methods: {
    pageLog() {
      console.log(this.$router.history.current)
    }
  },
  mounted() {

    this.pageLog()
  }
}
</script>
<style>
.mainPage {
  background-color:rgb(46, 46, 46);
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.mainLogo {
  color: rgb(163, 194, 240);
  font-size: 60px;
  font-family: 'Roboto Mono', monospace;
}
</style>
