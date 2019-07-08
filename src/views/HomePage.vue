<template>
<div>
  <ImgBanner></ImgBanner>

  <TestComponent></TestComponent>
</div>
</template>

<script>
import TestComponent from "@/components/TestComponent.vue";
import ImgBanner from "@/components/common/ImgBanner.vue";

export default {
  components: {
    TestComponent,
    ImgBanner
  }
};
</script>
