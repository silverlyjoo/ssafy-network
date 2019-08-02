<template>
  <v-container>
    <v-btn @click="updateUser">회원</v-btn>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :pagination.sync="pagination"
      select-all
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.nickname }}</td>
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.region }}</td>
          <td class="text-xs-center">{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.membership }}</td>
        </tr>
      </template>
    </v-data-table>
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
      selected: [],
      headers: [
        {
          text: "닉네임",
          align: "left",
          value: "nickname"
        },
        { text: "아이디", value: "id" },
        { text: "이름", value: "name" },
        { text: "지역", value: "region" },
        { text: "기수", value: "year" },
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
    updateUser() {
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
            membership: "회원"
          })
        }).then(res => {
          if (res.data.result) {
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
