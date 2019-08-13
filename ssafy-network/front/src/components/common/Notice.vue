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
            <v-list-tile-title v-html="notice.title" class="title b"></v-list-tile-title>
            <v-list-tile-title v-html="notice.content" class="body-1 b"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content v-else>
            <v-list-tile-title v-html="notice.title" class="title a"></v-list-tile-title>
            <v-list-tile-title v-html="notice.content" class="body-1 a"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

    <v-dialog v-model="noticedialog" max-width="500">
      <v-card>
        <v-card-title class="headline">{{ detail.title }}</v-card-title>
        <v-card-title class="subtitle-1">작성자 : {{ detail.writer }}</v-card-title>

        <v-card-text style="white-space: pre;">{{ detail.content}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="noticedialog = false">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { SET_NOTICES } from "@/store/notice.js";
import caxios from "@/plugins/createaxios.js";

export default {
  data() {
    return {
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
  computed: {
    notifications() {
      let result = [];
      let notices = this.$store.state.notice.notifications;
      if (notices) {
        for (let i = 0; i < notices.length; i++) {
          // console.log(notices[i])
          if (notices[i].unread.indexOf(this.id) !== -1) {
            this.$set(result, result.length, notices[i]);
          }
        }
        return notices;
      }
    }
  },
  methods: {
    async read(notice) {
      let noticeUrl = this.dbserver;
      await caxios(noticeUrl).request({
        url: `/notices`,
        method: "PUT",
        baseURL: noticeUrl,
        data: {
          token: this.token,
          _id: notice._id,
          id: this.id
        }
      });
    },
    async noticedetail(notice, idx) {
      await (this.detail = notice);
      await this.read(notice);
      await this.$store.commit(SET_NOTICES, [this.id, this.token, this.dbserver]);
      await (this.noticedialog = true);

    }
  },
  mounted() {
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
.a {
  font-weight: 800;
}
.b {
  color: rgb(165, 165, 165);
}
</style>
