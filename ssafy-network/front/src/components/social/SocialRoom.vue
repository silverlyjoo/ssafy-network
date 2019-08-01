<template>
  <div>
    <v-content>
      <h1>Chatroom</h1>
      <v-card class="chatwindow">
        <v-container id="scrolldown" class="chats">
          <div v-for="chat in chatdata" :key="chat.id" class="chat">
            <div v-if="chat.from.name == nickname" class="me">
              <span class="title">{{ chat.msg }}</span>
              <span class="body-3">{{ chat.time }}</span>
            </div>
            <div v-else class="chat">
              <span class="title">{{ chat.from.name }} :</span>
              <span class="subheading">{{ chat.msg }}</span>
              <span class="body-3">{{ chat.time }}</span>
            </div>
          </div>
        </v-container>
      </v-card>
      <v-card class="chatInput">
        <v-container>
          <v-form>
            <v-layout fluid>
              <v-flex xs10 class="mr-5">
                <v-text-field
                  ref="txt"
                  v-model="chatText"
                  @keypress.enter.prevent="SendMsg"
                  required
                ></v-text-field>
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
      nickname: this.$session.get("nickname"),
      chatText: "",
      chatdata: [],
      socket: ""
    };
  },
  props: ["_id"],
  computed: {},
  created() {},
  mounted() {
    this.ConnectSocket();
  },
  destroyed() {
    this.disconnect();
  },
  methods: {
    scrollset() {
      document.getElementById("scrolldown").scrollTop = document.getElementById(
        "scrolldown"
      ).scrollHeight;
    },
    ConnectSocket() {
      this.socket = io(this.chatserver);
      this.socket.emit("join", { _id: this._id, nickname: this.nickname });
      this.socket.on("broadcast", data => {
        this.chatdata.push(data);
      this.scrollset()
      });
    },
    disconnect() {
      this.socket = io(this.chatserver);
      this.socket.emit("leave", { _id: this._id, nickname: this.nickname });
    },
    async SendMsg() {
      let message = { name: this.nickname, msg: this.chatText, room: this._id };
      // console.log(message);
      await this.socket.emit("chat", message);
      this.chatText = "";
      await this.$refs.txt.focus();
    }
  }
};
</script>

<style>
.chatInput {
  height: 100px;
  /* width: 500px; */
}
.chatwindow {
  width: 100%;
  height: 68vh;
}
.me {
  color: blue;
  display: flex;
  justify-content: flex-end;
}
.chats {
  height: 65vh;
  overflow-y: auto;
  overflow-x: scroll;
  overflow-anchor: none;
}
.chat {
  overflow-anchor: auto;
  height: 100px;
}
</style>
