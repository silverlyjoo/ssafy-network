<template>
  <v-toolbar flat color="transparent" class="subtoolbar my-1">
    <v-spacer />
    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="goCalendar()" class="toolbartext" v-on="on">
            <v-icon color="white">calendar_today</v-icon>
          </v-btn>
        </template>
        <span>일정관리</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-menu
            bottom
            left
            content-class="dropdown-menu"
            offset-y
            transition="slide-y-transition"
          >
            <v-btn icon slot="activator" v-on="on">
              <v-badge color="red" overlap>
                <template slot="badge" v-if="unreadnoti !== 0">{{ unreadnoti }}</template>
                <v-icon class="toolbartext" color="white">notifications</v-icon>
              </v-badge>
            </v-btn>
            <v-card>
              <v-list dense>
                <div
                  v-for="(notification, idx) in notifications"
                  :key="notification.id"
                  class="pa-0"
                >
                  <v-list-tile v-if="idx<5" @click="noticedetail(notification, idx)">
                    <v-list-tile-title v-text="notification.title" class="font-weight-bold" />
                  </v-list-tile>
                </div>
                <v-list-tile class="pa-0" @click="goNotice">
                  <v-list-tile-title>더보기</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-menu>
        </template>
        <span>공지사항</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-flex align-self-center>
            <v-btn to="/user" outline color="grey" class="pa-2 ma-2" round v-on="on">
              <v-icon class="toolbartext" color="white" left>person</v-icon>
              {{$session.get("nickname")}}
            </v-btn>
          </v-flex>
        </template>
        <span>개인정보</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-flex align-self-center>
            <v-btn icon to="/admin/user" v-if="selfmembership === '관리자'" v-on="on">
              <v-icon class="adminicon">mdi-settings</v-icon>
            </v-btn>
          </v-flex>
        </template>
        <span>관리자 페이지</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-flex align-self-center>
            <v-btn icon @click="logoutForm()" v-on="on">
              <v-icon class="toolbartext" color="white">mdi-exit-to-app</v-icon>
            </v-btn>
          </v-flex>
        </template>
        <span>로그아웃</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-dialog v-model="noticedialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ detail.title }}</v-card-title>
        <v-card-title class="subtitle-1">작성자 : {{ detail.writer }}</v-card-title>
        <v-card-text style="white-space: pre;">{{ detail.content}}</v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="noticedialog = false" color="grey darken-2"
                    class="white--text">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="logoutDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">로그아웃 하시겠습니까?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2"
                    class="white--text" flat="flat" @click="logoutDialog = false">아니오</v-btn>
          <v-btn color="grey darken-2"
                    class="white--text" flat="flat" @click="logout()">예</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import { SET_NOTICES } from "@/store/notice.js";
import caxios from "@/plugins/createaxios.js";
export default {
  data() {
    return {
      logoutDialog: false,
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      dbserver: this.$store.state.dbserver,
      selfmembership: "",
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
      let ididx = this.notifications[idx].unread.indexOf(this.id);
      await (this.detail = notice);
      await this.read(notice);
      await this.$store.commit(SET_NOTICES, [
        this.id,
        this.token,
        this.dbserver
      ]);
      await (this.noticedialog = true);
    },
    goNotice() {
      this.$router.push({ name: "notice" });
    },
    isAdmin() {
      let memberUrl = this.dbserver;
      caxios(memberUrl)
        .request({
          url: `/users/admin/${this.id}/${this.token}`,
          method: "get",
          baseURL: memberUrl
        })
        .then(res => {
          this.selfmembership = res.data.membership;
        });
    },
    logoutForm() {
      this.logoutDialog = true;
    },
    logout() {
      this.$store.state.login = false;
      this.$session.clear();
      this.$router.push("/");
    },
    goCalendar() {
      this.$router.push("/note/calendar");
    }
  },
  mounted() {
    this.isAdmin();
  },
  watch: {
    notifications(from, to) {}
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
        return result;
      }
    },
    unreadnoti() {
      if (this.notifications) {
        let count = 0;
        for (let i = 0; i < this.notifications.length; i++) {
          if (this.notifications[i].unread.indexOf(this.id) !== -1) {
            count++;
          }
        }
        return count;
      }
    }
  }
};
</script>
<style>
.subtoolbar {
  /* position: relative; */
  /* top: 0px;
  left: 0px; */
  z-index: 100;
  /* display: flex; */
}
.toolbartext {
  text-shadow: 1px 1px 5px black;
  color: white;
}
.adminicon {
  color: rgb(255, 142, 142) !important;
  text-shadow: 1px 1px 3px rgb(129, 129, 129);
}
.unreads {
  background: rgba(194, 194, 194, 0.384);
}
</style>
