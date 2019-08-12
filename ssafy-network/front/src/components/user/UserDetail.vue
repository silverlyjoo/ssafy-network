<template>
  <v-container>
    <v-card>
      <v-layout>
        <v-flex xs4>
          <v-responsive :aspect-ratio="16/9">
            <v-img
              :src="userData.photo"
              class="profileImg ma-4"
              :aspect-ratio="1"
            ></v-img>
            <input type="file" @change="onFileChange" />
            <v-card-title class="headline">{{ userData.nickname }}</v-card-title>
          </v-responsive>
        </v-flex>
        <v-flex xs8>
          <v-container>
            <p v-for="(dt, key) in userData" :key="key">{{ key }} : {{ dt }}</p>
          </v-container>
        </v-flex>
      </v-layout>
    </v-card>
    <v-btn to="/user/update">회원정보 수정</v-btn>
  </v-container>
</template>

<script>
import caxios from "@/plugins/createaxios.js";

export default {
  data() {
    return {
      nickname: this.$session.get("nickname"),
      dbserver: this.$store.state.dbserver,
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      userData: {nickname: null},
      image: "",
    };
  },
  methods: {
    async getUserInfo() {
      let userUrl = this.dbserver;
      await caxios(userUrl)
        .request({
          baseURL: userUrl,
          method: "GET",
          url: `/users/${this.id}/${this.token}`
        })
        .then(res => {
          this.userData = res.data;
        });
    },

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      const apiUrl = "https://api.imgur.com/3/image";
      //const apiKey = "dd4e293e0b55616";
      const apiKey = "cbf88cd772389df";

      let data = new FormData();
      let content = {
        method: "POST",
        headers: {
          Authorization: "Client-ID " + apiKey,
          Accept: "application/json"
        },
        body: data,
        mimeType: "multipart/form-data"
      };

      data.append("image", files[0]);

      fetch(apiUrl, content)
        .then(response => response.json())
        .then(success => {
          this.image = success.data.link;
          alert(this.image);
        })
        .catch();
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style>
.profileImg {
  overflow: hidden;
  border-radius: 100%;
}
</style>
