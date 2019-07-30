<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11>
        <v-card class="my-4 chatlistbox">
          <v-list subheader>
            <v-subheader>Recent chat</v-subheader>
            <v-list-tile v-for="item in items" :key="item.title" avatar @click="joinchat(item._id)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-title v-html="item.owner"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn to="/social/room">Start chat</v-btn>
    <v-btn to="/social/new">New chat</v-btn>
  </v-container>
</template>

<script>
import io from "socket.io-client";
import caxios from "@/plugins/createaxios.js";
export default {
  name: "SocialList",
  data() {
    return {
      items: [],
      dbserver: this.$store.state.dbserver,
      token: this.$session.get("token"),
      chatserver: this.$store.state.chatserver
    };
  },
  methods: {
    getRooms() {
      let roomURL = this.dbserver;
      caxios(roomURL)
        .request({
          url: "/rooms/" + this.token,
          method: "get",
          baseURL: roomURL
        })
        .then(res => {
          this.items = res.data;
          // console.log("res", res.data);
        });
    },
    joinchat(roomId) {
      this.$router.push({ name: "room", params: { _id: roomId } });

      console.log(roomId);
    }
  },
  mounted() {
    this.getRooms();
  }
};
</script>

<style>
.chatlistbox {
  height: 45rem;
}
</style>
