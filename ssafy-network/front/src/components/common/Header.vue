<template>
  <!-- <div class="subtoolbar">
    <h4 class="toolbartext title">SSAFY WM</h4>
  </div>-->

  <v-toolbar flat color="transparent" class="subtoolbar">
    <h4 class="toolbartext title">SSAFY WM</h4>
    <v-spacer />
    <v-toolbar-items>
      <v-btn icon @click="goCalendar()">
        <v-icon color="white">dashboard</v-icon>
      </v-btn>
      <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
        <v-btn icon slot="activator">
          <v-badge color="red" overlap>
            <template slot="badge">{{ notifications.length }}</template>
            <v-icon color="white">notifications</v-icon>
          </v-badge>
        </v-btn>
        <v-card>
          <v-list dense>
            <v-list-tile v-for="notification in notifications" :key="notification" @click="onClick">
              <v-list-tile-title v-text="notification" />
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn icon>
        <v-icon class="toolbartext" color="white">person</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon class="toolbartext" color="white">mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    notifications: [
      "메세지 11",
      "메세지 22",
      "메세지 33",
      "메세지 44",
      "메세지 55"
    ]
  }),
  methods: {
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
  }
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
</style>
