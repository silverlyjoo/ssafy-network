<template>
  <v-container>
    <v-list subheader>
      <v-subheader>chatlist</v-subheader>
      <v-list-tile
        v-for="room in roomList"
        :key="room.title"
        avatar
      >
        <v-list-tile-content>
          <v-list-tile-title v-html="room.title"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="room.max"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="room.owner"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title v-html="room.createdAt"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      max: "",
      owner: "",
      createdAt: "",
      roomList: []
    };
  },
  mounted(){
    this.getRoomList();
  },
  methods: {
    getRoomList() {
      fetch(this.$store.state.dbserver + "/rooms/" + this.$session.get("token"), {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.roomList = data;
          } else {
            alert("오류");
          }
        })
        .catch(error => console.log(error))
        .finally();
    },
    updateRoom(){
      fetch(this.$store.state.dbserver + "/rooms", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          title: "model달기 귀찮아요",
          max: "패스워드는 확인 하나 해주세요",
          owner: "닉네임은 중복확인 한번 해주세요"
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("수정 성공!!!");
          } else {
            alert("수정 실패...");
          }
        });
    },
    deleteRoom() {
      fetch(this.$store.state.dbserver + "/rooms", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: "오브젝트 아이디",
          token: this.$session.get("token")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("삭제 성공!!!");
          } else {
            alert("성공 실패...");
          }
        });
    },
    searchRooms() {
      fetch(this.$store.state.dbserver + "/search/rooms/" +'max'+'/'+'10'+'/'+ this.$session.get("token"), {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.roomList = data;
          } else {
            alert("올바른 값을 입력하세요");
          }
        })
        .catch(error => console.log(error))
        .finally();
    }
  }
};
</script>

<style>
</style>
