<template>
  <v-footer height="100px" color="indigo lighten-1">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="white" flat round>{{ link }}</v-btn>
      <v-flex indigo lighten-2 py-3 text-xs-center white--text xs12>
        &copy;2019 —
        <strong>SSAFY(WM 팀)</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Services", "Contact Us"]
  })
};
</script>