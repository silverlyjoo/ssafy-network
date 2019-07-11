<template>
<div>
  <ImgBanner></ImgBanner>
  <h2>메인 페이지 입니다.</h2>
</div>
</template>

<script>
import ImgBanner from "@/components/common/ImgBanner.vue";
import FirebaseService from '@/services/FirebaseService';

export default {
  components: {
    ImgBanner
  },
  mounted(){
    FirebaseService.SendLog("HomePage");
  }
}
</script>