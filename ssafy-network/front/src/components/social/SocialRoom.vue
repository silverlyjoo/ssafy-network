<template>
  <div>
    <v-content>
      <h1>Chatroom</h1>
      <v-card class="chatwindow">
        <v-container id="scrolldown" class="chats">
          <div v-for="chat in chatdata" :key="chat.id">
            <div class="chatalign">
              <div v-if="chat.name == nickname" class="chatcon chat me">
                <span class="chatmsg">{{ chat.msg }}</span>
                <span class="chattime">{{ chat.createdAt }}</span>
                <!-- <span class="body-3">{{ chat.createdAt }}</span> -->
              </div>
              <!-- <div
              v-else-if="chat.name =='System'"
              style="text-align: center; color: red;"
              class="chat"
              >{{ chat.msg}}</div>-->
              <div v-else class="chatcon chat you">
                <span class="chatname">{{ chat.name }}</span>
                <span class="chatmsg">{{ chat.msg }}</span>
                <span class="chattime">{{ chat.createdAt }}</span>
                <!-- <span class="body-3">{{ chat.createdAt }}</span> -->
              </div>
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
        <div>
          <v-text-field ref="txt" v-model="chatText" @keypress.enter.prevent="SendMsg" required></v-text-field>
        </div>
        <div>
          <v-btn @click="SendMsg" color="grey darken-2" class="white--text">Submit</v-btn>
        </div>
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
    setBodyheight() {
      document.getElementsByTagName("body");
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
.chats {
  height: 70vh;
  overflow-y: auto;
  /* overflow-x: scroll; */
  overflow-anchor: none;
}
.me {
  color: rgb(133, 133, 133);
  display: flex;
  justify-content: flex-end;
  flex: 0 0 80%;
  flex-wrap: wrap;
  text-align: end;
}
.you {
  color: rgb(133, 133, 133);
  display: flex;
  justify-content: flex-start;
  flex: 0 0 80%;
  flex-wrap: wrap;
}
.chat {
  /* overflow-anchor: auto; */
  /* height: 100px; */
  word-break: break-all;
  white-space: normal;
  margin: 5px 0px;
}
.chatname {
  flex: 0 0 100%;
  font-size: 115%;
}
.chatmsg {
  font-size: 105%;
  color: black;
  font-weight: 500;
  flex: 0 0 100%;
}
.chattime {
  font-size: 80%;
  flex: 0 0 100%;
  text-align: end;
}
.chatcon {
  width: 80%;
  margin: 5px 0px;
  border: solid 1px black;
  border-radius: 10px;
  padding: 10px;
}
.chatalign {
  display: flex;
  justify-content: flex-end;
}
</style>
