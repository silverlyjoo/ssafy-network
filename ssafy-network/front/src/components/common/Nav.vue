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
              <v-layout align-center class="pa-2 mb-3" @click="goNote()">
                <v-flex xs7 text-xs-center>
                  <span class="navtext navtcolor">NOTE</span>
                </v-flex>
              </v-layout>
              <v-treeview
                v-model="tree"
                :open="open"
                :items="items"
                activatable
                item-key="name"
                open-on-click
                v-if="click"
                light=true
              >
                <template v-slot:label="{ item, open,selected }">
                  <v-btn flat @contextmenu="show">
                    <v-icon v-if="!item.file">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
                    <v-icon v-else>{{ files[item.file] }}</v-icon>
                    {{item.name}}
                  </v-btn>
                </template>
              </v-treeview>
              <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
                <v-list>
                  <v-list-tile v-for="menuItem in menuItems" :key="menuItem" @click="clickAction">
                    <v-list-tile-title>{{menuItem}}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>

            <div class="navBtn">
              <router-link to="/code/board" style="text-decoration: none !important">
                <v-layout align-center class="pa-2 mb-3">
                  <v-flex xs7 text-xs-center>
                    <span class="navtext navtcolor">CODE</span>
                  </v-flex>
                </v-layout>
              </router-link>
            </div>

            <div class="navBtn">
              <router-link to="/social/list" style="text-decoration: none !important">
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
      showMenu: false,
      x: 0,
      y: 0,
      menuItems: ["파일 추가", "폴더 추가"],
      foldflag: this.$store.state.navFoldFlag,
      click: false,
      open: [],
      files: {
        html: "mdi-language-html5",
        js: "mdi-nodejs",
        json: "mdi-json",
        md: "mdi-markdown",
        pdf: "mdi-file-pdf",
        png: "mdi-file-image",
        txt: "mdi-file-document-outline",
        xls: "mdi-file-excel"
      },
      tree: [],
      items: [
        {
          name: ".git"
        },
        {
          name: "node_modules"
        },
        {
          name: "public",
          children: [
            {
              name: "static",
              children: [
                {
                  name: "logo.png",
                  file: "png"
                }
              ]
            },
            {
              name: "favicon.ico",
              file: "png"
            },
            {
              name: "index.html",
              file: "html"
            }
          ]
        }
      ]
    };
  },
  methods: {
    goNote() {
      this.$router.push("/note/calendar");
      this.click = !this.click;
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },clickAction(e){
      alert(e);
    }
  }
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
  background: rgb(128, 149, 202);
  z-index: 100;
}
.navBg {
  width: 200px;
}
</style>
