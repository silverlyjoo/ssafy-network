<template>
  <v-container>
    <v-list subheader>
      <v-subheader>userlist</v-subheader>
      <v-list-tile
        v-for="user in userList"
        :key="user.id"
        avatar
      >
        <v-list-tile-content>
          <v-list-tile-title v-html="user.id"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.name"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.nickname"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.membership"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.region"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="user.year"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      nickname: "",
      region: "",
      year: "",
      userList: []
    };
  },
  mounted(){
    this.getUserList();
  },
  methods: {
    getUserList() {
      fetch(this.$store.state.dbserver + "/users/" + this.$session.get("token"), {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.userList = data;
          } else {
            alert("관리자 권한이 없습니다");
          }
        })
        .catch(error => console.log(error))
        .finally();
    },
    updateUser(){
      fetch(this.$store.state.dbserver + "/users", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          name: "model달기 귀찮아요",
          id: this.$session.get("id"),
          pwd: "패스워드는 확인 하나 해주세요",
          nickname: "닉네임은 중복확인 한번 해주세요",
          region: "year은 반드시 숫자",
          year: 1,
          membership: "관리자,회원,비회원 중에 하나가 되게",
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("수정 성공!!!");
            this.$store.state.CalendarCheck = true;
          } else {
            alert("수정 실패...");
          }
          this.dialog = false;
          this.$validator.reset();
        });
    }
  }
};
</script>

<style>
</style>
