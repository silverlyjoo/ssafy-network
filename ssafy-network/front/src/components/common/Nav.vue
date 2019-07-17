<template>
  <div>
    <div class="navLayout">
      <div class="navBg">
        <v-container>
          <aside>
            <div class="navBtn">
              <router-link to="/index" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">HOME</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>

            <v-divider class="mb-3" style="border-color: rgb(218, 234, 248);"></v-divider>

            <div class="navBtn">
              <router-link to="/note/calendar" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">NOTE</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>

            <div class="navBtn">
              <router-link to="/code" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">CODE</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>

            <div class="navBtn">
              <router-link to="/social" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">SOCIAL</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>
          </aside>
        </v-container>
      </div>
    </div>
    <div class="navBg"></div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      foldflag: this.$store.state.navFoldFlag
    };
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
  font-size: 16px;
}
.navtcolor {
  color: rgb(218, 234, 248);
}
.fold {
  display: flex;
  justify-content: flex-end;
}
.foldbtn:hover {
  background: rgba(211, 211, 211, 0.205);
  border-radius: 15px;
}
.navLayout {
  position: fixed;
  height: 100vh;
  background: rgb(24, 41, 80);
  z-index: 100;
}
.navBg {
  width: 200px;
}
</style>
