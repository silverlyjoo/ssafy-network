<template>
  <div>
    <v-content>
      <h1>Chatroom</h1>
      <v-card class="chatwindow">
        <v-container>
          <div v-for="chat in chatdata" :key="chat.id">
            <div v-if="chat.from.name == nickname" class='me'>
              <span class="title"> {{ chat.msg }}</span>
              <span class="body-3"> {{ chat.time }}</span>
            </div>
            <div v-else>
              <span class="title">{{ chat.from.name }} :</span>
              <span class="subheading"> {{ chat.msg }}</span>
              <span class="body-3"> {{ chat.time }}</span>
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
  computed: {},
  created() {
    },
  mounted() {
    this.ConnectSocket();
  },
  destroyed() {
    // this.disconnect();
  },
  methods: {
    ConnectSocket() {
      this.socket = io(this.chatserver+"/room/asd");
      this.socket.on("broadcast", data => {
        this.chatdata.push(data);
      });
    },
    SendMsg() {
      let message = { 'name':this.nickname, 'msg': this.chatText };
      // this.chatdata.push(message)
      this.socket.emit("chat", message);
      this.chatText = this.chatText + '+1';
      this.$refs.txt.focus();
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
.me {
  color: blue;
  display: flex;
  justify-content: flex-end;
}
</style>
