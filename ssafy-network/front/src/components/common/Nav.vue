<template>
  <v-container>
    <aside class="pt-5">
      <div class="pa-3 mb-5">
        <v-img :src="require('@/assets/ssafy.png')"/>
      </div>
      <div class="navBtn">
        <router-link to="/" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-5">
            <v-flex xs4 text-xs-center>
              <i class="fas fa-home fa-2x navtcolor"></i>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span class="navtext navtcolor">HOME</span>
            </v-flex>
          </v-layout>
        </router-link>
      </div>

      <v-divider class="mb-5" style="border-color: rgb(218, 234, 248);"></v-divider>

      <div class="navBtn">
        <router-link to="/note" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-5">
            <v-flex xs4 text-xs-center>
              <i class="far fa-sticky-note fa-2x navtcolor"></i>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span class="navtext navtcolor">NOTE</span>
            </v-flex>
          </v-layout>
        </router-link>
      </div>

      <div class="navBtn">
        <router-link to="/code" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-5">
            <v-flex xs4 text-xs-center>
              <i class="fas fa-code fa-2x navtcolor"></i>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span class="navtext navtcolor">CODE</span>
            </v-flex>
          </v-layout>
        </router-link>
      </div>

      <div class="navBtn">
        <router-link to="/social" style="text-decoration: none !important">
          <v-layout align-center class="pa-2 mb-5">
            <v-flex xs4 text-xs-center>
              <i class="fas fa-share-alt-square fa-2x navtcolor"></i>
            </v-flex>
            <v-flex xs8 text-xs-center>
              <span class="navtext navtcolor">SOCIAL</span>
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
  background: rgba(173, 173, 173, 0.212);
  border-radius: 10px;
}
.navtext {
  font-family: "Raleway";
  font-weight: 900;
  font-size: 20px;
}
.navtcolor {
  color: rgb(218, 234, 248);
}
</style>
