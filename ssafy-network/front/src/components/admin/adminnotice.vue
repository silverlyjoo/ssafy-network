<template>
  <v-container>
    <h1>Notice 관리</h1>
    <v-layout justify-center text-xs-center row class="mb-5">
      <v-btn to="/admin/user" color="grey darken-2" class="white--text">유저관리</v-btn>
      <v-btn to="/admin/chat" color="grey darken-2" class="white--text">채팅방관리</v-btn>
      <v-btn to="/admin/notice" color="grey darken-2" class="white--text">공지사항관리</v-btn>
      <v-btn to="/admin/dep" color="grey darken-2" class="white--text">부서관리</v-btn>
      <router-view></router-view>
      <v-spacer></v-spacer>
      <v-btn @click="deleteNotice" color="grey darken-2" class="white--text">삭제</v-btn>
      <v-btn to="/admin/nwrite" color="grey darken-2" class="white--text">새 공지</v-btn>
    </v-layout>
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
          <td>{{ props.item.title }}</td>
          <td class="text-xs-center">{{ props.item.writer }}</td>
          <td class="text-xs-center">{{ props.item.createdAt }}</td>
          <td class="text-xs-center">{{ props.item.read.length }}</td>
          <td class="text-xs-center">{{ props.item.unread.length }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import caxios from "@/plugins/createaxios.js";
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
          text: "제목",
          align: "left",
          value: "title"
        },
        { text: "작성자", value: "writer" },
        { text: "작성일", value: "createdAt" },
        { text: "열람수", value: "read" },
        { text: "비 열람수", value: "unread" }
      ],
      desserts: []
    };
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    getNoticeList() {
      let noticeUrl = this.dbserver;
      caxios(noticeUrl)
        .request({
          url: `/notices/${this.token}`,
          method: "get",
          baseURL: noticeUrl
        })
        .then(res => {
          this.desserts = res.data;
        });
    },
    deleteNotice() {
      let noticeUrl = this.dbserver;
      for (let index = 0; index < this.selected.length; index++) {
        caxios(noticeUrl)
          .request({
            url: `/notices`,
            method: "DELETE",
            baseURL: noticeUrl,
            data: {
              _id: this.selected[index]._id,
              token: this.token
            }
          })
          .then(res => {
            if (res.data.result) {
              this.getNoticeList();
            } else {
              alert("삭제 실패");
            }
            return res;
          });
      }
    }
  },
  mounted() {
    this.getNoticeList();
  }
};
</script>

<style>
</style>
