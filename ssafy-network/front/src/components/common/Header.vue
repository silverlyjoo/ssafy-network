<template>
  <v-toolbar color="indigo lighten-1">
    <v-toolbar-title class="white--text title">SSAFY WM</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn icon @click="goCalendar()">
      <v-icon color="white">dashboard</v-icon>
    </v-btn>
    <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
          >
    <v-btn icon slot="activator">
      <v-badge
              color="red"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
      <v-icon color="white">notifications</v-icon>
            </v-badge>
    </v-btn>
    <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
    </v-menu>
    <v-btn icon>
      <v-icon color="white">person</v-icon>
    </v-btn>
    <v-btn icon @click="logout">
      <v-icon color="white">mdi-exit-to-app</v-icon>
    </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data: () => ({
      notifications: [
      '메세지 11',
      '메세지 22',
      '메세지 33',
      '메세지 44',
      '메세지 55'
    ],
    }),
    methods:{
logout(){
      this.$store.state.login = false;
      this.$session.clear();
      this.$router.push('/');
    },
    goCalendar(){
      this.$router.push("/note/calendar");
    },onClick(){
      alert("1!");
    }
    }
    
  }
</script>
<style>


</style>
