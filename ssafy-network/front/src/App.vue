<template>
  <div id="app">
    <div v-if="login">
      <v-layout>
        <div class="navLayout">
          <div class="navBg">
            <Nav></Nav>
          </div>
        </div>
        <div class="navBg"></div>
        <div class="mainsection">
          <Header></Header>
          <router-view></router-view>
          <Footer></Footer>
        </div>
      </v-layout>
    </div>
    <div v-else>
      <MainPage></MainPage>
    </div>
  </div>
</template>
<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Nav from "@/components/common/Nav";
import MainPage from "@/components/common/MainPage";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Nav,
    MainPage
  },
  data() {
    return {
      login: true
    };
  }
};
</script>
<style>
.navLayout {
  position: fixed;
  height: 100vh;
  background: rgb(24, 41, 80);
  z-index: 100;
}
.navBg {
  width: 200px;
}
.mainsection {
  width: calc(100vw - 200px);
}
</style>
