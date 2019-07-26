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
                <v-text-field ref="txt" v-model="chatText" required></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn @click="SendMsg">Submit</v-btn>
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
      nickname: this.$session.get("id"),
      chatText: "testText",
      chatdata: [],
      socket: ""
    };
  },
<<<<<<< HEAD
  computed: {
    ConnectSocket() {
      this.socket = io(this.chatserver);
    },
    
  },
  mounted() {
    this.ConnectSocket, this.GetMsg;
  },
  destroyed() {
    // this.disconnect();
  },
=======
>>>>>>> 91cd953e90a1e626747ac230fc28bdeaa0685dd4
  methods: {
    SendMsg() {
      let message = { name: this.nickname, msg: this.chatText };
      this.socket.emit("chat", message);
      this.chatText = "";
      this.$refs.txt.focus();
    },
    GetMsg() {
      this.socket.on("broadcast", data => {
        this.chatdata.push(data);
        console.log('데이터', data)
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
