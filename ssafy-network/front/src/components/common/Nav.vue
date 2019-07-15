<template>
  <v-container>
    <aside>
      <div class="navBtn">
        <router-link to="/" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-3">
            <v-flex xs4 text-xs-center>
              <v-icon medium>home</v-icon>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span>HOME</span>
            </v-flex>
          </v-layout>
        </router-link>
      </div>
      <v-divider class="mb-3"></v-divider>

      <div class="navBtn">
        <router-link to="/note" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-3">
            <v-flex xs4 text-xs-center>
              <i class="far fa-sticky-note fa-lg grey--text text--darken-2"></i>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span>Note</span>
            </v-flex>
          </v-layout>
        </router-link>
      </div>

      <div class="navBtn">
        <router-link to="/code" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-3">
            <v-flex xs4 text-xs-center>
              <i class="fas fa-code fa-lg grey--text text--darken-2"></i>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span>Code</span>
            </v-flex>
          </v-layout>
        </router-link>
      </div>

      <div class="navBtn">
        <router-link to="/social" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-3">
            <v-flex xs4 text-xs-center>
              <i class="fas fa-share-alt-square fa-lg grey--text text--darken-2"></i>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span>Social</span>
            </v-flex>
          </v-layout>
        </router-link>
      </div>
    </aside>
  </v-container>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
.navBtn:hover {
  background: rgba(173, 173, 173, 0.397);
}
</style>
