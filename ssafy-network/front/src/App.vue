<template>
  <div id="app">
    <v-layout>
      <v-flex xs2 class="navLayout">
        <Nav></Nav>
      </v-flex>

      <v-flex xs10>
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Nav from "@/components/common/Nav";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Nav
  },
  data() {
    return {};
  }
};
</script>
<style>
.navLayout {
  height: 100vh;
  background:rgba(230, 230, 230, 0.295);
}
</style>
