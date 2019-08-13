<template>
  <v-container style="width:80%; margin-left:auto; margin-right:auto;">
    <v-card>
      <v-layout>
        <v-flex xs4 class="py-3">
          <v-responsive :aspect-ratio="16/9" class="py-3">
            <v-img
              :src="userData.photo"
              class="profileImg ma-4"
              :aspect-ratio="1"
            ></v-img>
            <p class="headline text-xs-center">{{ userData.nickname }}</p>
          </v-responsive>
        </v-flex>
        <v-flex xs8 class="pl-5">
          <v-container>
            <p class="display-1 text-xs-center">회원정보</p><br><br>
            <v-layout wrap column>
                <p class="title">이름 : {{userData.name}}</p><br>
                <p class="title">ID : {{userData.id}}</p><br>
                <p class="title">NickName : {{userData.nickname}}</p><br>
                <p class="title">지역 : {{userData.department}}</p><br>
                <p class="title" style="display=inline-block;">기수 : {{userData.position}}</p>
            </v-layout>
          </v-container>
          <div class="text-xs-right pa-3">
            <v-btn to="/user/update" color="grey darken-2" class="white--text">회원정보 수정</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
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
