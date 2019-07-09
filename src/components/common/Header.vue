<template>
  <div>
    <v-toolbar fixed app clipped-right>
      <v-toolbar-title>
        <router-link to="/" style="text-decoration:none!important">SSAFY</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-toolbar-items>
        <v-dialog v-model="dialog_login" width="500">
            <template v-slot:activator="{ on }">
              <v-btn flat v-if="item.title === 'Login'" v-on="on">Login</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>로그인</v-card-title>
              <v-card-text class="text-xs-center">로그인하세요</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">accept</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-for="item in items" :key="item.title">
        <v-btn flat @click="goPage(item.link)" exact>{{item.title}}</v-btn>

        
      </v-toolbar-items>
      <span>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      </span>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" fixed light temporary right>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_left</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="@/assets/logo.png" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>SSAFY</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile v-for="item in items" :key="item.title" @click="goPage(item.link)" exact>
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
        { title: "Post", icon: "dashboard", link: "/post" },
        { title: "Projects", icon: "dashboard", link: "/project" },
        { title: "Portfolio", icon: "person", link: "/portfolio" }
        // { title: "Login", icon: "exit_to_app", link: "/login" }
      ],
      mini: false,
      right: null,
      clipped: false,
      dialog_login: false
    };
  },
  methods: {
    goPage(pageLink) {
      this.$router.push(pageLink);
    }
  }
};
</script>

