<template>
  <div id="app">
    <div v-if="login">
      <v-layout>
        <div v-if="foldflag">
          <div class="navLayout">
            <div class="navBg">
              <Nav></Nav>
            </div>
          </div>
          <div class="navBg"></div>
        </div>
        <!-- <div v-else>
          <div class="navLayoutf">
            <div class="navBgf">
              <Nav></Nav>
            </div>
          </div>
          <div class="navBgf"></div>
        </div> -->
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
      login: this.$store.state.login,
      foldflag: this.$store.state.navFoldFlag
    };
  },
  watch: {
    check() {
      this.foldflag = this.$store.state.navFoldFlag;
      console.log(this.$store.state.navFoldFlag);
    }
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
.navLayoutf {
  position: fixed;
  height: 100vh;
  background: rgb(64, 120, 253);
  z-index: 100;
}
.navBgf {
  width: 100px;
}
.mainsection {
  width: calc(100vw - 200px);
}
</style>
