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
import FirebaseService from '@/services/FirebaseService';

export default {
  components: {
    ImgBanner,
    GitGraph
  },
  mounted(){
    FirebaseService.SendLog("HomePage");
  }
}
</script>
