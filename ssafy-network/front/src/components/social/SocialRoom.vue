<template>
  <div>
    <v-content>
      <h1>Chatroom</h1>
      <v-card class="chatwindow">
        <v-container>
          <!-- <v-btn @click="connect">연결</v-btn> -->
          <div v-for="chat in chatdata" :key="chat.id">
            <div>
              <span class="title">{{ chat.from.name }} |</span>
              <span class="subheading">{{ chat.msg }}</span>
            </div>
          </div>
        </v-container>
      </v-card>
      <v-card class="chatInput">
        <v-container>
          <v-form>
            <v-layout fluid>
              <v-flex xs10 class="mr-5">
                <v-text-field ref="nic" v-model="nickname" required></v-text-field>
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
      chatText: "",
      chatdata: [],
      socket: ""
    };
  },
  computed: {
    ConnectSocket() {
      let socket = io.connect(this.chatserver);
      socket.on("chat", data => {
        this.chatdata.push(data);
      });
      return socket;
    }
  },
  mounted() {
    (this.socket = this.ConnectSocket),
      this.socket.on("chat", data => {
        console.log(data);
        this.chatdata.push(data);
      });
  },
  destroyed() {
    this.disconnect();
  },
  methods: {
    sendMsg() {
      let message = { name: this.nickname, msg: this.chatText };
      this.socket.emit("chat", message);
      this.nickname = "";
      this.chatText = "";
      this.$refs.nic.focus();
    },
    disconnect() {
      this.socket.on("disconnect");
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
