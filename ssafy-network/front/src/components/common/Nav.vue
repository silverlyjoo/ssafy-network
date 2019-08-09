<template>
  <div>
    <div class="navLayout">
      <v-container class="navcon" id = "nav">
        <aside class="navgo">
          <div class="navBtn mb-3" @click="foldnote">
            <router-link to="/index" style="text-decoration: none !important">
              <v-layout align-center class="pa-2">
                <v-flex text-xs-center>
                  <h4 class="toolbartext title">SSAFY WM</h4>
                </v-flex>
              </v-layout>
            </router-link>
          </div>

          <v-divider class="mb-3" style="border-color: rgb(218, 234, 248); width: 90%;"></v-divider>

          <NoteBtn></NoteBtn>

          <div class="navBtn mb-3" @click="foldnote">
            <router-link to="/code/board" style="text-decoration: none !important">
              <v-layout align-center class="pa-2">
                <v-flex xs7 text-xs-center>
                  <span class="navtext navtcolor">CODE</span>
                </v-flex>
              </v-layout>
            </router-link>
          </div>

          <div class="navBtn mb-3" @click="foldnote">
            <router-link to="/social/list" style="text-decoration: none !important">
              <v-layout align-center class="pa-2">
                <v-flex xs7 text-xs-center>
                  <span class="navtext navtcolor">SOCIAL</span>
                </v-flex>
              </v-layout>
            </router-link>
          </div>
          <div class="navBtn mb-3" @click="foldnote">
            <router-link to="/email" style="text-decoration: none !important">
              <v-layout align-center class="pa-2">
                <v-flex xs7 text-xs-center>
                  <span class="navtext navtcolor">E-MAIL</span>
                </v-flex>
              </v-layout>
            </router-link>
          </div>
          <!-- <div class="navBtn mb-3" @click="foldnote">
            <router-link to="/address" style="text-decoration: none !important">
              <v-layout align-center class="pa-2">
                <v-flex xs7 text-xs-center>
                  <span class="navtext navtcolor">ADDRESS</span>
                </v-flex>
              </v-layout>
            </router-link>
          </div> -->
          <!-- <div class="navBtn mb-3" @click="foldnote">
            <router-link to="/vote" style="text-decoration: none !important">
              <v-layout align-center class="pa-2">
                <v-flex xs7 text-xs-center>
                  <span class="navtext navtcolor">VOTE</span>
                </v-flex>
              </v-layout>
            </router-link>
          </div> -->

        </aside>
      </v-container>
    </div>
  </div>
</template>

<script>
import NoteBtn from "@/components/common/NoteBtn";

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "Nav",
  components: { NoteBtn },
  data() {
    return {};
  },
  methods: {
    foldnote() {
      this.$store.state.notetreefoldflag = false;
      this.$store.state.heightflag = true;
    }
  },
  mounted() {}
};
</script>
<style>
.navcon {
  padding: 15px;
}
.navBtn:hover {
  background: rgba(212, 212, 212, 0.212);
  border-radius: 10px;
  
}
.navtext {
  font-family: "Raleway";
  font-weight: 900;
  font-size: 16px;
}
.navtcolor {
  color: rgba(233, 233, 233, 0.932);
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
  position: relative;
  height: 100%;
  background: rgb(75, 75, 75);
  z-index: 100;
}
.navgo {
  display : flex;
  flex-direction: column;
  justify-content: space-around;
  
}
.toolbartext {
  text-shadow: 1px 1px 5px black;
  color: white;
}
</style>
