<template>
  <v-layout>
    <Nav></Nav>

    <div class="mainsection">
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </v-layout>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Nav from "@/components/common/Nav";

export default {
  data() {
    return {
      login: this.$store.state.login
    };
  },
  components: {
    Header,
    Footer,
    Nav
  }
};
</script>

<style>
.mainsection {
  width: calc(100vw - 200px);
}
</style>
