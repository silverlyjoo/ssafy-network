<template>
  <v-container>
    <v-card>
      <v-layout>
        <v-flex xs4>
          <v-responsive :aspect-ratio="16/9">
            <v-img
              :src="'https://img.kbs.co.kr/kbs/620/nsimg.kbs.co.kr/data/news/2018/01/24/3597946_Z5L.jpg'"
              class="profileImg ma-4"
              :aspect-ratio="1"
            ></v-img>
            <v-card-title class="headline">{{ nickname }}</v-card-title>
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
      userData: null
    };
  },
  methods: {
    async getUserInfo() {
      let userUrl = this.dbserver;
      //   await console.log(userUrl);
      await caxios(userUrl)
        .request({
          baseURL: userUrl,
          method: "GET",
          url: `/users/${this.id}/${this.token}`
        })
        .then(res => {
          this.userData = res.data;
        });
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
