<template>
  <v-layout fill-height>
    <vue-resizable
      :min-height="height"
      :max-height="height"
      :min-width="minWidth"
      :max-width="maxWidth"
    >
      <Nav class="nav"></Nav>
    </vue-resizable>
    <div class="mainsection">
      <Header></Header>
      <div class="routingbody">
        <router-view></router-view>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </v-layout>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Nav from "@/components/common/Nav";
import VueResizable from "vue-resizable";

export default {
  data() {
    return {
      login: this.$store.state.login,
      height: "",
      minWidth: 250,
      maxWidth: 700
    };
  },
  components: {
    Header,
    Footer,
    Nav,
    VueResizable
  },
  created() {
    this.height = window.innerHeight;
  }
};
</script>

<style>
.mainsection {
  width: 100%;
  height: 100vh;
  overflow: auto;
}
.nav {
  width: 100%;
  height: 100vh;
  background-color: aqua;
}
</style>
