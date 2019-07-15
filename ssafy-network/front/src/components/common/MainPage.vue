<template>
  <v-container justify-center align-content-center class="py-0">
    <v-layout column class="mains" justify-center>
      <v-flex xs8 class="flex1" align-center>
          <div style="height: 50vh; width:40vw">
            <v-img :src="require('@/assets/ssafy.png')" />
          </div>
      </v-flex>
      <v-flex xs4 class="flex1" align-center>
        <h1 style="color: rgb(218, 234, 248);">you are not logged-in</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "mainpage",
  data() {
    return {};
  },
  methods: {
    changeBGC() {
      var css = "body { background: rgb(24, 41, 80); }",
        head = document.head || document.getElementsByTagName("head")[0],
        style = document.createElement("style");

      head.appendChild(style);
      style.type = "text/css";
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }
  },
  mounted() {
    this.changeBGC();
  }
};
</script>
<style>
.mains {
  height: 100vh;
}
.flex1 {
    display: flex;
    justify-content: center;
}
</style>
