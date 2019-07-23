<template>
  <div>
    <v-content>
      <h1>Chatroom</h1>
      <v-card class="chatwindow">
        <v-container>
          <div v-for="chat in chatdata" :key="chat.id">
            <div>
              <span class="title">{{ chat.id }} |</span>
              <span class="subheading">{{ chat.text }}</span>
            </div>
          </div>
        </v-container>
      </v-card>
      <v-card class="chatInput">
        <v-container>
          <v-form>
            <v-layout fluid>
              <v-flex xs10 class="mr-5">
                <v-text-field v-model="nickname" required></v-text-field>
                <v-text-field v-model="chatText" required></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn @click="sendMsg">Submit</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </v-content>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "SocialRoom",
  data() {
    return {
      chatserver: this.$store.state.dbserver,
      nickname: "",
      chatText: null,
      chatdata: [],
      socket: ""
    };
  },
  created() {
    this.socket = io.connect(this.chatserver);
  },
  computed: {
    // getsocket()
  },
  mounted() {
    this.sendMsg;
  },
  methods: {
    async sendMsg() {
      let message = { name: this.nickname, msg: this.chatText };
      await this.socket.emit("chat", message);
    },
    getsocket() {
      this.socket.on("chat", data => {
        console.log(data);
      });
    }
  }
};
</script>

<style>
.chatInput {
  /* height: 200px;
  width: 500px; */
}
.chatwindow {
  width: 100%;
  height: 70vh;
}
</style>
