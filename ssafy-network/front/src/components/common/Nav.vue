<template>
  <vue-resizable
    :height="height"
    :min-width="minWidth"
    :max-width="maxWidth"
    :active="handlers"
    class="navlayout"
  >
    <div class="navcon">
      <div class="navitems">
        <div class="navBtn mb-3" @click="foldnote">
          <router-link to="/index" style="text-decoration: none !important">
            <v-layout align-center class="pa-2">
              <v-flex text-xs-center>
                <!-- <h4 class="toolbartext title">{{navheight}}</h4> -->
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
      </div>
    </div>
  </vue-resizable>
</template>

<script>
import VueResizable from "vue-resizable";

import NoteBtn from "@/components/common/NoteBtn";

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
      height: 100,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  methods: {
    foldnote() {
      this.$store.state.notetreefoldflag = false;
      this.$store.state.heightflag = true;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  mounted() {

  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed :{
    // navheight () {
    //   let routeheight = document.getElementById('mainlayoutId').offsetHeight
    //   console.log(routeheight)
    //   return routeheight
    // }
  },
  watch: {
    'window.height' (from, to) {
      document.getElementsByClassName('navcon')[0].style.height = this.window.height
    }
  }
};
</script>

<style>
.navcon {
  background: rgb(75, 75, 75);
  z-index: 100;
  padding: 15px;
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