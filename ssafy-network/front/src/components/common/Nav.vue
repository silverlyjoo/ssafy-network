<template>
  <vue-resizable
    :height="height"
    :min-width="minWidth"
    :max-width="maxWidth"
    :active="handlers"
    id="resizecon"
  >
    <div id="navcon">
      <div class="navitems">
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
        <div class="navBtn mb-3" @click="goNotice">
          <router-link to="/code/board" style="text-decoration: none !important">
            <v-layout align-center class="pa-2">
              <v-flex xs7 text-xs-center>
                <span class="navtext navtcolor">NOTICE</span>
              </v-flex>
            </v-layout>
          </router-link>
        </div>
        <NoteBtn></NoteBtn>

        <div class="navBtn mb-3" @click="foldnote">
          <router-link to="/code/board" style="text-decoration: none !important">
            <v-layout align-center class="pa-2">
              <v-flex xs7 text-xs-center>
                <span class="navtext navtcolor">BOARD</span>
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
                <span class="navtext navtcolor">MESSAGE</span>
              </v-flex>
            </v-layout>
          </router-link>
        </div>
      </div>
    </div>
  </vue-resizable>
</template>

<script>
import VueResizable from "vue-resizable";
import NoteBtn from "@/components/common/NoteBtn";
import { mapState } from "vuex";

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "Nav",
  components: {
    NoteBtn,
    VueResizable
  },
  data() {
    return {
      minWidth: 320,
      maxWidth: 700,
      handlers: ["r"],
      height: window.innerHeight,
      window: {
        width: 0,
        height: 0
      },
      mainheight: null
    };
  },
  methods: {
    goNotice() {
      this.$router.push({ name: "notice" });
      this.$store.state.notetreefoldflag = false;
    },
    compareHeight() {
      if (this.height > this.mainheight) {
        return this.height;
      } else {
        return this.mainheight;
      }
    },
    foldnote() {
      this.$store.state.notetreefoldflag = false;
    },
    async handleResize() {
      await (this.height = window.innerHeight);
      await (document.getElementById("navcon").style.height =
        this.compareHeight() + "px");
    },
    async changeHeight() {
      await (this.mainheight = document
        .getElementById("mainlayoutId")
        .offsetHeight.toString());
      await (document.getElementById("navcon").style.height =
        this.mainheight + "px");
      this.height = parseInt(this.compareHeight());
      // this.$store.state.heightflag = true;
    },
    async handleScroll(e) {
      await (this.mainheight = document
        .getElementById("mainlayoutId")
        .offsetHeight.toString());
      document.getElementById("navcon").style.height = this.mainheight + "px";
      this.height = parseInt(this.compareHeight());
      // this.$store.state.heightflag = true;
    }
  },
  mounted() {
    this.changeHeight();
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    this.handleResize();
  },
  updated() {},
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {},
  watch: {
    $route(from, to) {
      this.height = window.innerHeight;
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style>
#navcon {
  background: rgb(75, 75, 75);
  z-index: 100;
  padding: 15px;
  height: 100vh;
}
.navBtn:hover {
  background: rgba(212, 212, 212, 0.212);
  border-radius: 10px;
  cursor: pointer;
}
.navtext {
  font-family: "Raleway";
  font-weight: 900;
  font-size: 16px;
}
.navtcolor {
  color: rgba(233, 233, 233, 0.932);
}
.toolbartext {
  text-shadow: 1px 1px 5px black;
  color: white;
}
</style>


// .fold {
//   display: flex;
//   justify-content: flex-end;
// }
// .foldbtn:hover {
//   background: rgba(211, 211, 211, 0.205);
//   border-radius: 15px;
// }
// .navgo {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// }

// <div class="navBtn mb-3" @click="foldnote">
//       <router-link to="/address" style="text-decoration: none !important">
//         <v-layout align-center class="pa-2">
//           <v-flex xs7 text-xs-center>
//             <span class="navtext navtcolor">ADDRESS</span>
//           </v-flex>
//         </v-layout>
//       </router-link>
// </div>
// <div class="navBtn mb-3" @click="foldnote">
//       <router-link to="/vote" style="text-decoration: none !important">
//         <v-layout align-center class="pa-2">
//           <v-flex xs7 text-xs-center>
//             <span class="navtext navtcolor">VOTE</span>
//           </v-flex>
//         </v-layout>
//       </router-link>
// </div>