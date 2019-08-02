<template>
  <v-container>
    <v-card class="my-4">
      <v-flex xs12 sm6 md3>
        <v-text-field label="Regular"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-text-field label="Regular"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-text-field label="Regular"></v-text-field>
      </v-flex>
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

      return;
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
          console.log(res.data);
        });
    },
    newNotice() {
      //   let noticeUrl = this.dbserver;
      //   caxios(noticeUrl).request({});
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
</style>
