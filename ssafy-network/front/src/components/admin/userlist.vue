<template>
  <v-container>
    <h1>admin page</h1>
    <v-btn to="/admin/user">유저관리</v-btn>
    <v-btn to="/admin/chat">채팅방관리</v-btn>
    <v-btn to="/admin/notice">공지사항관리</v-btn>
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
        <v-select v-model="department" label="부서" :items="departments" required style="max-width:20vh;"></v-select>
        <v-btn @clck="updateUserDepartment">부서 변경</v-btn>
        <v-spacer></v-spacer>
        <v-select v-model="position" label="직책" :items="positions" required style="max-width:20vh;"></v-select>
        <v-btn @click="updateUserPosition">직책 변경</v-btn>
        <v-spacer></v-spacer>
        <v-select v-model="membership" label="등급" :items="memberships" required style="max-width:20vh;"></v-select>
        <v-btn @click="updateUserMembership">등급 변경</v-btn>
        <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      dbserver: this.$store.state.dbserver,
      pagination: {
        sortBy: "name"
      },
      department:"개발",
      departments:["인사", "영업", "개발", "기획"],
      position:"사원",
      positions:["사원","주임","대리","과장","차장","부장","이사","상무","전무","부사장","사장","회장"],
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
        { text: "직책", value: "position" },
        { text: "등급", value: "membership" }
      ],
      desserts: []
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
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
            department: this.department
          })
        }).then(res => res.json())
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
            position: this.position
          })
        }).then(res => res.json())
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
        }).then(res => res.json())
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
