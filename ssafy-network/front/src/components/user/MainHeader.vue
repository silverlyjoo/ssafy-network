<template>
  <v-toolbar color="transparent" flat fixed>
    <v-toolbar-items>
      <v-btn flat to="/" class="white--text headline">SSAFY WM</v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn flat class="white--text title" to="/about">About Us</v-btn>
      <v-btn flat class="white--text title" to="/login">Sign In</v-btn>
      <v-btn flat class="white--text title" to="/join">Sign Up</v-btn>
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
</style>
