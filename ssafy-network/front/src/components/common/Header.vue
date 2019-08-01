<template>
  <!-- <div class="subtoolbar">
    <h4 class="toolbartext title">SSAFY WM</h4>
  </div>-->

  <v-toolbar flat color="transparent" class="subtoolbar">
    <h4 class="toolbartext title">SSAFY WM</h4>
    <v-spacer />
    <v-toolbar-items>
      <v-btn icon @click="goCalendar()" class="toolbartext">
        <v-icon color="white">dashboard</v-icon>
      </v-btn>
      <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
        <v-btn icon slot="activator">
          <v-badge color="red" overlap>
            <template slot="badge">{{ unreadnoti }}</template>
            <v-icon class="toolbartext" color="white">notifications</v-icon>
          </v-badge>
        </v-btn>
        <v-card>
          <v-list dense>
            <v-list-tile v-for="notification in notifications" :key="notification.id" @click="onClick" class="pa-0">
              <v-list-tile-title v-if="notification.unread.indexOf(id) !== -1" v-text="notification.content" class="unreads"/>
              <v-list-tile-title v-else v-text="notification.content"/>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn icon>
        <v-icon class="toolbartext" color="white">person</v-icon>
      </v-btn>
      <v-btn icon to="/admin" v-if="selfmembership === '관리자'">
        <v-icon class="adminicon">mdi-settings</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon class="toolbartext" color="white">mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import caxios from "@/plugins/createaxios.js";
export default {
  data() {
    return {
      notifications: [
      ],
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      dbserver : this.$store.state.dbserver,
      selfmembership: '',
      unreadnoti: null
    };
  },
  methods: {
    getNotification () {
      let noticeUrl = this.dbserver;
      caxios(noticeUrl)
      .request({
        url: `/notices/${this.id}/${this.token}`,
        method: 'get',
        baseURL : noticeUrl
      })
      .then(res => {
        // console.log(res.data)
        this.notifications = res.data
        return res
      })
      .then(res => {
        let unreads = 0
        for (let i=0; i<res.data.length; i++) {
          if (res.data[i].unread.indexOf(this.id) !== -1) {
            unreads++
          }
        }
        this.unreadnoti = unreads
      })
    },
    isAdmin() {
      let memberUrl = this.dbserver;
      caxios(memberUrl)
        .request({
          url: `/users/admin/${this.id}/${this.token}`,
          method: "get",
          baseURL: memberUrl
        })
        .then(res => {
          this.selfmembership = res.data.membership
        });
    },
    logout() {
      this.$store.state.login = false;
      this.$session.clear();
      this.$router.push("/");
    },
    goCalendar() {
      this.$router.push("/note/calendar");
    },
    onClick() {
      alert("1!");
    }
  },
  mounted () {
    this.isAdmin(),
    this.getNotification()
  },
};
</script>
<style>
.subtoolbar {
  /* position: relative; */
  /* top: 0px;
  left: 0px; */
  z-index: 100;
  /* display: flex; */
}
.toolbartext {
  text-shadow: 1px 1px 5px black;
  color: white;
}
.adminicon {
  color: rgb(255, 142, 142) !important;
  text-shadow: 1px 1px 3px rgb(129, 129, 129);
}
.unreads {
  background: rgba(194, 194, 194, 0.384);
}
</style>
