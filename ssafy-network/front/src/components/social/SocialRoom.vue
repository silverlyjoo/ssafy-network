<template>
  <div>
    <v-content>
      <!-- <h1>Chatroom</h1> -->

      <div class="chatcontainer">
        <v-card class="chatwindow" id="scrolldown">
          <v-container class="chats">
            <div v-for="chat in chatdata" :key="chat.id">
              <div v-if="chat.name == nickname" class="chatcon me">
                <span class="chatmsg">{{ chat.msg }}</span>
                <span class="chattime">{{ chat.createdAt }}</span>
              </div>

              <div v-else-if="chat.name =='System'" class="systemchat">{{ chat.msg}}</div>

              <div v-else class="chatcon you">
                <span class="chatname">{{ chat.name }}</span>
                <span class="chatmsg">{{ chat.msg }}</span>
                <span class="chattime">{{ chat.createdAt }}</span>
              </div>
            </div>
          </v-container>
        </v-card>

        <v-card class="userwindow">
          <v-container class="chats">
            <div v-for="user in userlist" :key="user.id">
              <span class="subheading" v-if="user === nickname" style="color:rgb(233, 87, 87);">{{ user }} (나)</span>
              <span class="subheading" v-else>{{ user }}</span>
            </div>
          </v-container>
        </v-card>
      </div>

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
.chatcontainer {
  height: 80vh;
  display: flex;
  
}
.chatwindow {
  flex: 0 0 85%;
  overflow: auto;
  background: rgb(238, 247, 255) !important;
}
.userwindow {
  flex: 0 0 15%;
  overflow: auto;
  background: rgb(238, 247, 255) !important;
}

.chats {
  overflow: auto;
  width: 100%;
  background: rgb(238, 247, 255);
}
.chatcon {
  max-width: 70%;
  border: solid 1px rgb(231, 231, 231);
  box-shadow: 2px 2px 2px rgb(121, 121, 121);
  border-radius: 15px;
  padding: 10px;
  word-break: break-all;
  white-space: normal;
  background: rgb(255, 254, 227);
}
.me {
  color: rgb(133, 133, 133);
  display: flex;
  /* flex: 0 0 80%; */
  flex-wrap: wrap;
  text-align: end;
  margin: 0 0 15px auto;
}
.you {
  background: rgb(255, 255, 255);
  color: rgb(133, 133, 133);
  display: flex;
  /* flex: 0 0 80%; */
  flex-wrap: wrap;
  margin: 0 auto 15px 0;
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
.systemchat {
  font-size: 90%;
  margin-bottom: 14px;
  margin-top: 14px;
  text-align: center;
  color: rgb(233, 87, 87);
}

.chatInput {
  height: 12vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* width: 500px; */
}
.chatInput > div:nth-child(1) {
  flex: 0 0 80%;
}
</style>
