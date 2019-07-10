<template>
  <div id="app">
    <Imgbanner></Imgbanner>
    <Header></Header>
    <div style="height:100px"></div>

    <v-content>
      <router-view />
    </v-content>
    <div style="height:100px"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import ImgBanner from "@/components/common/ImgBanner.vue";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    ImgBanner
  },
  data() {
    return {
      //
    };
  }
};
</script>
