<template>
  <div id="app">
    <Header v-if="mainflag"></Header>
    <v-content>
      <router-view />
    </v-content>
    <Footer v-if="mainflag"></Footer>
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
      mainflag : true
    };
  },
  mounted () {
    if (this.$router.history.current.path === '/') {
      this.mainflag = false
    }
  }
};
</script>
