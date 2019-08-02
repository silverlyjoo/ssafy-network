<template>
  <v-container>
    <v-card class="my-4">
      <v-list subheader>
        <v-subheader>Notices</v-subheader>
        <v-list-tile
          v-for="(notice, idx) in notifications"
          :key="idx"
          class="mb-3"
          @click="noticedetail(notice, idx)"
        >
          <v-list-tile-content v-if="notice.read.indexOf(id) !== -1">
            <v-list-tile-title v-html="notice.title" class="title"></v-list-tile-title>
            <v-list-tile-title v-html="notice.content" class="body-1"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content v-else>
            <v-list-tile-title v-html="notice.title" class="title font-weight-bold"></v-list-tile-title>
            <v-list-tile-title v-html="notice.content" class="body-1 font-weight-bold"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

    <v-dialog v-model="noticedialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ detail.title }}</v-card-title>
        <v-card-title class="subtitle-1">작성자 : {{ detail.writer }}</v-card-title>

        <v-card-text>{{ detail.content}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="noticedialog = false">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import caxios from "@/plugins/createaxios.js";
export default {
  data() {
    return {
      notifications: [],
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      dbserver: this.$store.state.dbserver,
      unreadnoti: null,
      noticedialog: false,
      detail: {
        title: null,
        content: null,
        writer: null,
        createdAt: null,
        _id: null
      }
    };
  },
  computed: {},
  methods: {
    read() {
      let noticeUrl = this.dbserver;
      caxios(noticeUrl).request({
        url: `/notices`,
        method: "PUT",
        baseURL: noticeUrl,
        data: {
          token: this.token,
          _id: this.detail._id,
          id: this.id
        }
      });
    },
    getNotification() {
      let noticeUrl = this.dbserver;
      caxios(noticeUrl)
        .request({
          url: `/notices/${this.id}/${this.token}`,
          method: "get",
          baseURL: noticeUrl
        })
        .then(res => {
          // console.log(res.data)
          this.notifications = res.data;
        });
    },
    async noticedetail(notice, idx) {
      await (this.noticedialog = true);
      await (this.detail = notice);
      await this.read();
      await this.notifications[idx].read.push(this.id)
    }
  },
  mounted() {
    this.getNotification();
  },
  watch: {
    noticedialog: function(val) {
      if (val === false) {
        this.detail = {
          title: null,
          content: null,
          writer: null,
          createdAt: null
        };
      }
    }
  }
};
</script>

<style>
</style>
