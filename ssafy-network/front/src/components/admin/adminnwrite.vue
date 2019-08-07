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
            :menu-props="{ maxHeight: '700' }"
            label="Userlist"
            multiple
          ></v-select>
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
      // notice: null
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

      return object
    }
  },
  methods: {
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
            this.userlist.push(res.data[i].nickname);
          }
          console.log(this.userlist);
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
        // this.$router.push({path:'/admin/notice'})
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
</style>
