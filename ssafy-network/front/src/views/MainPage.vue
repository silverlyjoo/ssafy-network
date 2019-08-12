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
import { SET_MAINHEIGHT } from "@/store.js";

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
    Nav
  },
  mounted() {
    this.changeHeight();
    this.$store.commit(SET_MAINHEIGHT, this.height);
    this.$store.commit(SET_NOTICES, [this.id, this.token, this.dbserver]);
  },
  destroyed() {},
  updated() {
    this.height = window.innerHeight;
    this.changeHeight();
    this.$store.commit(SET_MAINHEIGHT, this.height);
    this.$store.commit(SET_NOTICES, [this.id, this.token, this.dbserver]);
  },
  computed: {
    ...mapState(["mainheight"]),
    notifications() {
      return this.$store.state.notice.notifications;
    }
  },
  watch: {},
  methods: {
    async changeHeight() {
      await (this.height = document
        .getElementById("mainlayoutId")
        .offsetHeight.toString());
    }
  }
};
</script>

<style>
.mainsection {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.routingbody {
  width: 100%;
}
</style>