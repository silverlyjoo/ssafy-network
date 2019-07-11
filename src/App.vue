<template>
  <div id="app">
    <Header></Header>
    <v-content>
      <router-view />
    </v-content>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      //
    };
  }
};
</script>
