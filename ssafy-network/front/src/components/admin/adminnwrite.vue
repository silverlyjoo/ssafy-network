<template>
  <v-container>
    <v-card class="my-4">
      <v-container>
        <v-flex xs12>
          <v-text-field required label="Title" v-model="title"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select
            v-model="unread"
            :items="userlist"
            item-text="nickname"
            item-value="id"
            :menu-props="{ maxHeight: '700' }"
            label="Userlist"
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-tile ripple @click="toggle">
                <v-list-tile-action>
                  <v-icon :color="unread.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Select All</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-flex>
        <v-flex xs12>
          <v-textarea auto-grow label="content" v-model="content"></v-textarea>
        </v-flex>
        <v-btn @click="newNotice">Send</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import caxios from "@/plugins/createaxios.js";

export default {
  data() {
    return {
      dbserver: this.$store.state.dbserver,
      token: this.$session.get("token"),
      nickname: this.$session.get("nickname"),
      userlist: [],
      title: null,
      content: null,
      unread: []
    };
  },
  computed: {
    notice: function() {
      let object = {
        token: this.token,
        title: this.title,
        content: this.content,
        writer: this.nickname,
        unread: this.unread
      };

      return object;
    },
    icon() {
      if (this.userlist.length === this.unread.length) return "mdi-close-box";
      if (
        this.unread.length > 0 &&
        !(this.userlist.length === this.unread.length)
      )
        return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.userlist.length === this.unread.length) {
          this.unread = [];
        } else {
          this.unread = [];
          for (let i = 0; i < this.userlist.length; i++) {
            this.unread.push(this.userlist[i].id);
          }
        }
      });
    },
    getUsers() {
      let userUrl = this.dbserver;
      caxios(userUrl)
        .request({
          url: `/users/${this.token}`,
          method: "GET",
          baseURL: userUrl
        })
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            let object = {};
            this.userlist.push(res.data[i]);
          }
        });
    },
    newNotice() {
      let noticeUrl = this.dbserver;
      caxios(noticeUrl).request({
        url: `/notices`,
        method: "POST",
        baseURL: noticeUrl,
        data: this.notice
      });
      this.$router.push({ path: "/admin/notice" });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
</style>
