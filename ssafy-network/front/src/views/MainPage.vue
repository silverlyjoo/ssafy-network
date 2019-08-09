<template>
  <v-layout id="mainlayoutId">
    
      <Nav></Nav>
    <div class="mainsection">
      <Header></Header>
      <div class="routingbody" id="routingbody">
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
import { mapState } from "vuex";

import { SET_NOTICES } from "@/store/notice.js";
import caxios from "@/plugins/createaxios.js";

export default {
  data() {
    return {
      login: this.$store.state.login,

      dbserver: this.$store.state.dbserver,
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      height: ""
    };
  },
  components: {
    Header,
    Footer,
    Nav,
  },
  mounted() {
    this.$store.commit(SET_NOTICES, [this.id, this.token, this.dbserver]);
    // window.addEventListener("resize", this.handleResize);
    // console.log("mountedheight", this.height);
  },
  destroyed() {
    // window.removeEventListener("resize", this.handleResize);
  },
  updated() {
    this.$store.commit(SET_NOTICES, [this.id, this.token, this.dbserver]);
    this.getheight();
    // console.log("updatedheight", this.height);
  },
  computed: {
    ...mapState(["heightflag"]),
    notifications() {
      return this.$store.state.notice.notifications;
    }
  },
  watch: {},
  methods: {
    async getheight() {
      await (this.height = document.getElementsByClassName("mainsection")[0].offsetHeight);
      // await (this.height = document.getElementById("mainlayoutId").offsetHeight);
      await (document.getElementsByClassName("navlayout")[0].style.height = this.height);

      
      console.log(this.height);
    }
  }
};
</script>

<style>
#mainlayoutId {
  display: flex;
}
.navlayout {
  display: flex;
  align-self: stretch;
}
.mainsection {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.routingbody {
  width: 100%;
}
.nav {
  align-items: stretch;
}
</style>
