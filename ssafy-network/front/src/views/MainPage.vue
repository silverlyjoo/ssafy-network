<template>
  <v-layout>
    <Nav></Nav>

    <div class="mainsection">
      <Header></Header>
      <div class="routingbody"><router-view></router-view></div>
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
  width: 100%;
}
</style>
