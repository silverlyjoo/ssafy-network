<template>
  <v-toolbar color="transparent" flat fixed>
    <v-toolbar-items>
      <v-btn flat to="/" class="headline"><span class="mainheadertext">SSAFY WM</span></v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn flat class="title" to="/about"><span class="mainheadertext">About Us</span></v-btn>
      <v-btn flat class="title" to="/login"><span class="mainheadertext">Sign In</span></v-btn>
      <v-btn flat class="title" to="/join"><span class="mainheadertext">Sign Up</span></v-btn>
    </v-toolbar-items>
  </v-toolbar>
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
  })
};
</script>
<style>
.mainheadertext {
  color: #ffffff;
  /* background: #ffffff; */
  text-shadow: 1px 1px 0 #969696, 2px 2px 2px #aba8a8;
}
</style>
