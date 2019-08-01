<template>
  <div class="subtoolbar">
    <h4 class="toolbartext title">SSAFY WM</h4>
  </div>

  <!-- <v-toolbar flat color="transparent" class="subtoolbar">
    <h4 class="toolbartext title">SSAFY WM</h4>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn icon >
      <v-icon class="toolbartext" color="white">dashboard</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon class="toolbartext" color="white">notifications</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon class="toolbartext" color="white">person</v-icon>
    </v-btn>
    <v-btn icon @click="logout">
      <v-icon class="toolbartext" color="white">mdi-exit-to-app</v-icon>
    </v-btn>
    </v-toolbar-items>
  </v-toolbar>-->
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me 1" },
      { title: "Click Me 2" },
      { title: "Click Me 3" },
      { title: "Click Me 4" }
    ]
  }),
  methods: {
    logout() {
      this.$store.state.login = false;
      this.$session.clear();
      this.$router.push("/");
    }
  }
};
</script>
<style>
.subtoolbar {
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 100;
  display: flex;
}
.toolbartext {
  text-shadow: 1px 1px 5px black;
  color: white;
}
</style>
