<template>
  <div>
    <v-toolbar fixed dark>


      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
          <v-layout>
            <v-flex align-self-center>
              <v-btn flat @click="goLink('/')">
            <v-icon color="white">home</v-icon>
              </v-btn>
            </v-flex>
              <v-flex align-self-center>
                <span class="subheading text-uppercase">
                  WM blog
                </span>
              </v-flex>
          </v-layout>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/post" exact>POST</v-btn>
        <v-btn flat to="/portfolio" exact>PORTFOLIO</v-btn>
        <v-btn flat to="/login" exact>LOGIN</v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Silverlyjoo</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="goLink(item.link)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
  </div>
</template>
        

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: null,
      items: [
        { title: "post", icon: "dashboard", link: "/post" },
        { title: "Protfolio", icon: "dashboard", link: "/portfolio" },
        { title: "Login", icon: "dashboard", link: "/login" }
      ],
      mini: false,
      right: null
    };
  },
  methods: {
    goLink(linkUrl) {
      this.$router.push(linkUrl);
    }
  }
};
</script>

