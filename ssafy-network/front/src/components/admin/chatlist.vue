<template>
  <v-container>
    <h1>admin page</h1>
        <v-btn to="/admin/user">유저관리</v-btn>
        <v-btn to="/admin/chat">채팅방관리</v-btn>
        <v-btn to="/admin/notice">공지사항관리</v-btn>
        <v-btn to="/admin/dep">부서관리</v-btn>
        <router-view></router-view>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="roomList"
      item-key="_id"
      select-all
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.max }}</td>
        <td class="text-xs-center">{{ props.item.owner }}</td>
        <td class="text-xs-center">{{ props.item.createdAt }}</td>
      </template>
    </v-data-table>
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
      roomList: [],
      selected: [],
      headers: [
        {
          text: "방 제목",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "최대 인원수",  align: "center", value: "max" },
        { text: "방장",  align: "center", sortable: false, value: "owner" },
        { text: "생성 날짜", align: "center", value: "createdAt" }
      ]
    };
  },
  mounted() {
    this.getRoomList();
  },
  methods: {
    getRoomList() {
      fetch(
        this.$store.state.dbserver + "/rooms/" + this.$session.get("token"),
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
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
    updateRoom() {
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
      fetch(
        this.$store.state.dbserver +
          "/search/rooms/" +
          "max" +
          "/" +
          "10" +
          "/" +
          this.$session.get("token"),
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
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
