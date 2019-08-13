<template>
  <v-container>
    <h1>Chat 관리</h1>
    <v-layout justify-start text-xs-center row class="mb-5">
      <v-btn to="/admin/user" color="grey darken-2" class="white--text">유저관리</v-btn>
      <v-btn to="/admin/chat" color="grey darken-2" class="white--text">채팅방관리</v-btn>
      <v-btn to="/admin/notice" color="grey darken-2" class="white--text">공지사항관리</v-btn>
      <v-btn to="/admin/dep" color="grey darken-2" class="white--text">부서관리</v-btn>
      <router-view></router-view>
    </v-layout>
    <v-card>
      <div class="getchatlist">
        <v-flex xs3 class="pr-3 pl-2">
          <v-select v-model="method" :items="methods"></v-select>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="keyword" @keyup.enter="searchRooms"></v-text-field>
        </v-flex>
        <v-flex xs3 class="mx-3">
          <v-btn @click="searchRooms" color="grey darken-2" class="white--text">검색</v-btn>
        </v-flex>
        <v-btn @click="deleteRoom" color="grey darken-2" class="white--text ml-4">삭제</v-btn>
      </div>
    </v-card>
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
      method: "방제목",
      methods: ["방제목", "최대인원", "방장"],
      keyword: "",
      option: "",
      headers: [
        {
          text: "방 제목",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "최대 인원수", align: "center", value: "max" },
        { text: "방장", align: "center", sortable: false, value: "owner" },
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
    deleteRoom() {
      for (let index = 0; index < this.selected.length; index++) {
        fetch(this.$store.state.dbserver + "/rooms", {
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            _id: this.selected[index]._id,
            token: this.$session.get("token")
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result == true) {
              this.getRoomList();
            } else {
              alert("삭제 실패...");
            }
          });
      }
    },
    searchRooms() {
      fetch(
        this.$store.state.dbserver +
          "/search/rooms/" +
          this.method +
          "/" +
          this.keyword +
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
.getchatlist {
  display: flex;
  align-items: center;
  padding: 0px 1.5rem;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}
</style>
