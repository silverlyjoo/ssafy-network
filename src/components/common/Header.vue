<template>
  <div>
    <v-dialog v-model="dialog_login" max-width="500" v-if="loginCondition">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" v-model="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn round color="blue" dark v-on:click="loginWithFacebook" style="width:100%;">
                  <v-icon size="25" class="mr-2">fab fa-facebook-f</v-icon>facebook 로그인
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="red" flat to="/joinform" @click="dialog_login = false">회원가입</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog_login = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="loginUser">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-toolbar fixed app clipped-right>
      <v-toolbar-title>
        <v-layout>
          <v-flex align-self-center>
            <router-link to="/" style="text-decoration:none!important">
              <v-img src="./Favicon.png" style="width:37px;"></v-img>
            </router-link>
          </v-flex>
          &nbsp;&nbsp;
          <v-flex align-self-center>
            <router-link to="/" style="text-decoration:none!important">
              <span>SSAFY</span>
            </router-link>
          </v-flex>
        </v-layout>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="loginCondition">
        <v-btn flat @click="dialog_login = true">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="!loginCondition">
        <v-btn flat @click="logout()">{{this.$store.state.user}} : LogOut</v-btn>
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
import FirebaseService from "@/services/FirebaseService";

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
      dialog_login: false,
      email: "",
      password: "",
      loginCondition: true
    };
  },
  methods: {
    goPage(pageLink) {
      this.$router.push(pageLink);
    },
    async loginUser() {
      const user = await FirebaseService.loginUser(this.email, this.password);
      if (user == true) {
        this.$store.state.user = FirebaseService.loginSuccess();
        this.loginCondition = false;
      } else {
        alert("로그인 실패...");
      }
      this.email = "";
      this.password = "";
      this.dialog_login = false;
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;
      // console.log(this.$store.state.user.displayName)
    },
    logout() {
      FirebaseService.logout();
      this.email = "";
      this.password = "";
      this.loginCondition = true;
    }
  }
};
</script>

