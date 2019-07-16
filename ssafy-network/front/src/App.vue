<template>
  <div id="app">
    <v-layout>
      <Nav></Nav>
      <div class="mainsection">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
      </div>
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
    return {
      login: this.$store.state.login
    };
  }
};
</script>

<style>
.mainsection {
  width: calc(100vw - 200px);
}
</style>
