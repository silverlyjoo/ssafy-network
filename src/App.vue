<template>
  <div id="app">
    <div style="height:30px"></div>
    <ImgBanner></ImgBanner>
    <Header></Header>

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
