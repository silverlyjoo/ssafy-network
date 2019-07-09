<template>
<div>
  <ImgBanner></ImgBanner>
  <ImgUpload></ImgUpload>
  <LoginPage></LoginPage>
</div>
</template>

<script>
import ImgBanner from "@/components/common/ImgBanner.vue";
import ImgUpload from "@/components/common/ImgUpload.vue";
import LoginPage from "@/views/LoginPage";

export default {
  components: {
    ImgBanner,
    ImgUpload,
    LoginPage
  }
}
</script>
