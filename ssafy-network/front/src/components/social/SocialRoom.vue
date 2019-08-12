<template>
  <div>
    <v-content>
      <h1>Chatroom</h1>
      <v-card class="chatwindow">
        <v-container id="scrolldown" class="chats">
          <div v-for="chat in chatdata" :key="chat.id" class="chat">
            <div v-if="chat.name == nickname" class="me">
              <span class="title">{{ chat.msg }}</span>
              <!-- <span class="body-3">{{ chat.createdAt }}</span> -->
            </div>
            <div v-else class="chat">
              <span class="title">{{ chat.name }} :</span>
              <span class="subheading">{{ chat.msg }}</span>
              <!-- <span class="body-3">{{ chat.createdAt }}</span> -->
            </div>
          </div>
        </v-container>
      </v-card>

      <v-card class="userwindow">
        <v-container class="chats">
          <div v-for="user in userlist" :key="user.id">
            <span class="subheading">{{ user }}</span>
          </div>
        </v-container>
      </v-card>

      <v-card class="chatInput">
          <div><v-text-field ref="txt" v-model="chatText" @keypress.enter.prevent="SendMsg" required></v-text-field></div>
          <div><v-btn @click="SendMsg">Submit</v-btn></div>
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
      socket: "",
      userlist: []
    };
  },
  props: ["_id"],
  computed: {},
  created() {},
  mounted() {
    this.ConnectSocket();
    this.$refs.txt.focus();
  },
  beforeDestroy() {
    this.disconnect();
  },
  updated() {
    this.scrollset();
  },
  methods: {
    setBodyheight (){
      document.getElementsByTagName('body')
    },
    scrollset() {
      document.getElementById("scrolldown").scrollTop = document.getElementById(
        "scrolldown"
      ).scrollHeight;
    },
    ConnectSocket() {
      this.socket = io(this.chatserver);
      this.socket.emit("join", { _id: this._id, nickname: this.nickname });
      this.socket.on("chatlist", data => {
        if (!this.chatdata.length) {
          this.chatdata = data;
        }
        // console.log(data)
      });
      this.socket.on("broadcast", data => {
        this.chatdata.push(data);
        this.scrollset();
        // console.log('chatdata', data)
      });
      this.socket.on("userlist", data => {
        this.userlist = data;
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
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  /* width: 500px; */
}
.chatwindow {
  width: 80%;
  height: 68vh;
}
.userwindow {
  width: 20%;
  height: 68vh;
  position: absolute;
  left: 80%;
  top: 42px;
}
.me {
  color: blue;
  display: flex;
  justify-content: flex-end;
}
.chats {
  height: 70vh;
  overflow-y: auto;
  /* overflow-x: scroll; */
  overflow-anchor: none;
}
.chat {
  overflow-anchor: auto;
  height: 100px;
}
</style>
