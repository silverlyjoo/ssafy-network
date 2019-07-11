<template>
<div>
  <ImgBanner></ImgBanner>
  <h2>메인 페이지 입니다.</h2>
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
  }
}
</script>
