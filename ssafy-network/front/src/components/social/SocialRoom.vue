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
                <v-btn @click="submit">Submit</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "SocialRoom",
  data() {
    return {
      nickname:"",
      chatText: null,
      chatdata: [
        { id: "seongjoo", text: "hello" },
        { id: "kyungtae", text: "hi" }
      ]
    };
  },
  mounted(){
    this.chatting();
  },
  methods: {
    chatting(){
      this.$validator.validateAll().then(res => {
        fetch(this.$store.state.dbserver + "/chats/room", {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            room:"SSAFY room",
          })
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log(error))
          .finally(this.$refs.form.reset(),
          this.$validator.reset());
      });
    },
    submit() {
      this.$validator.validateAll().then(res => {
        fetch(this.$store.state.dbserver + "/chats", {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            room:"SSAFY room",
	          user:this.nickname,
	          chat:this.chatText
          })
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log(error))
          .finally(this.$refs.form.reset(),
          this.$validator.reset() );
      });
      this.chatting();
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
