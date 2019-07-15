<template>
  <div id="app">
    <v-layout>
      <v-flex xs2 class="Nav">
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
.Nav {
  height: 100vh;
}
</style>
