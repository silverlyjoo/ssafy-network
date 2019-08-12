<template>
  <v-container>
    <h1>admin page</h1>
    <v-layout justify-center text-xs-center row>
      <v-btn to="/admin/user">유저관리</v-btn>
      <v-btn to="/admin/chat">채팅방관리</v-btn>
      <v-btn to="/admin/notice">공지사항관리</v-btn>
      <v-btn to="/admin/dep">부서관리</v-btn>
      <v-spacer></v-spacer>
      <v-select
        v-model="membership"
        label="등급"
        :items="memberships"
        required
        style="max-width:20vh;"
      ></v-select>
      <v-btn @click="updateUserMembership">등급 변경</v-btn>
    </v-layout>
    <router-view></router-view>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="_id"
      select-all
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>{{ props.item.nickname }}</td>
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.department }}</td>
        <td class="text-xs-left">{{ props.item.position }}</td>
        <td class="text-xs-left">{{ props.item.membership }}</td>
      </template>
    </v-data-table>
    <v-layout justify-center text-xs-center row>
      <v-text-field v-model="superdepartment"></v-text-field>
      <v-btn @click="getDepartmentList">부서 검색</v-btn>
      <v-select
        v-model="first"
        label="부서찾기"
        :items="firsts"
        @change="getChildList"
      ></v-select>
      <v-select
        v-if="showbtn"
        v-model="second"
        label="부서찾기"
        :items="seconds"
        @change="pull"
      ></v-select>
      <v-btn v-if="!showbtn" @click="updateDePo">직급 변경</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      superdepartment: "",
      first: "",
      firsts: [],
      second: "",
      seconds: [],
      showbtn: true,
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      dbserver: this.$store.state.dbserver,
      pagination: {
        sortBy: "name"
      },
      
      membership: "회원",
      memberships: ["비회원", "회원", "관리자"],
      selected: [],
      headers: [
        {
          text: "닉네임",
          align: "left",
          value: "nickname"
        },
        { text: "아이디", value: "id" },
        { text: "이름", value: "name" },
        { text: "부서", value: "department" },
        { text: "기수", value: "position" },
        { text: "등급", value: "membership" }
      ],
      desserts: []
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    updateDePo(){
      this.updateUserDepartment();
      this.updateUserPosition();
    },
    pull() {
      this.superdepartment = this.first;
      this.firsts = this.seconds;
      this.first = this.second;
      this.getChildList();
    },
    getDepartmentList() {
      fetch(
        this.$store.state.dbserver +
          "/company/join/" +
          this.superdepartment,
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
            this.firsts = data.children;
            this.first = this.firsts[0];
          }
        });
    },
    getChildList() {
      fetch(
        this.$store.state.dbserver +
          "/company/join/" +
          this.first,
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
          if (data.result == false) {
            this.showbtn = false;
          } else {
            this.seconds = data.children;
          }
        });
    },
    getUserList() {
      fetch(
        this.$store.state.dbserver + "/users/" + this.$session.get("token"),
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
            this.desserts = data;
          } else {
            alert("관리자 권한이 없습니다");
          }
        })
        .catch(error => console.log(error))
        .finally();
    },
    updateUserDepartment() {
      for (let index = 0; index < this.selected.length; index++) {
        fetch(this.$store.state.dbserver + "/users/department", {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.$session.get("token"),
            _id: this.selected[index]._id,
            department: this.superdepartment
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result == true) {
              this.getUserList();
            } else {
              alert("수정 실패");
            }
          });
      }
    },
    updateUserPosition() {
      for (let index = 0; index < this.selected.length; index++) {
        fetch(this.$store.state.dbserver + "/users/position", {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.$session.get("token"),
            _id: this.selected[index]._id,
            position: this.first,
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result == true) {
              this.getUserList();
            } else {
              alert("수정 실패");
            }
          });
      }
    },
    updateUserMembership() {
      for (let index = 0; index < this.selected.length; index++) {
        fetch(this.$store.state.dbserver + "/users/membership", {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.$session.get("token"),
            _id: this.selected[index]._id,
            membership: this.membership
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result == true) {
              this.getUserList();
            } else {
              alert("수정 실패");
            }
          });
      }
    },
    deleteUser() {
      fetch(this.$store.state.dbserver + "/users", {
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
    searchUsers() {
      fetch(
        this.$store.state.dbserver +
          "/search/users/" +
          "id" +
          "/" +
          "t" +
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
            this.userList = data;
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
