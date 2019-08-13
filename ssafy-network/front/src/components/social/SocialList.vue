<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11>
        <v-card class="sociallist-header">
          <v-layout justify-space-around align-center>
            <v-flex xs3 class="pr-1 pl-2">
              <v-select v-model="searchoption" :items="searchoptions"></v-select>
            </v-flex>
            <v-flex xs6 class>
              <v-text-field
                v-model="chatroomsearchkeyword"
                @keyup.enter="searchRooms"
                @keyup.esc="getRooms"
              ></v-text-field>
            </v-flex>
            <button @click="searchRooms" class="buttonsize">
              <i class="fas fa-search"></i>
            </button>
            <button @click="getRooms" class="buttonsize">
              <i class="fas fa-redo"></i>
            </button>
            <button @click="newSocialRoom" class="buttonsize">
              <i class="fas fa-plus"></i>
            </button>
          </v-layout>
        </v-card>
        <v-card class="my-4">
          <v-list subheader>
            <v-subheader>Recent chat</v-subheader>
            <div class="chatheader">
              <div class="headerinfo">
                <div>제목</div>
                <div>방장</div>
                <div>인원수</div>
                <div>생성일</div>
              </div>
              <div class="headericons">
                <div>비밀방</div>
              </div>
              <div class="headericons">
                <div>삭제</div>
              </div>
            </div>
            <div
              v-for="(item, idx) in items"
              :key="idx"
              avatar
              @click="joinchat(item._id, idx)"
              class="chatlist"
            >
              <!-- <v-list-tile-content>
                {{ item.title}} - {{ item.owner}} - {{ item.createdAt}} {{item.userList.length}} / {{ item.max}}
              </v-list-tile-content>-->
              <div class="chatinfo">
                <div>
                  <span>{{ item.title }}</span>
                </div>
                <div>{{ item.owner }}</div>
                <div>{{ item.userList.length }} / {{ item.max }}</div>
                <div>{{ item.createdAt }}</div>
              </div>
              <div class="chaticons">
                <i v-if="item.password" class="fas fa-lock fa-lg lockicon chaticon"></i>
              </div>
              <div class="chaticons">
                <i
                  v-if="item.owner === nickname || selfmembership === '관리자'"
                  @click.stop="delconfirm('삭제하시겠습니까?') ? deleteroom(item._id, idx) : ''"
                  class="fas fa-trash-alt fa-lg deleteicon chaticon"
                ></i>
              </div>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-container>
            <v-card-title>
              <span class="headline">Join secret room</span>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                    ref="chtpwd"
                    v-model="typepassword"
                    @keyup.enter="joinsecret"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click.stop="joinsecret">submit</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import io from "socket.io-client";
import caxios from "@/plugins/createaxios.js";
export default {
  name: "SocialList",
  data() {
    return {
      items: [],
      dbserver: this.$store.state.dbserver,
      token: this.$session.get("token"),
      nickname: this.$session.get("nickname"),
      id: this.$session.get("id"),
      chatserver: this.$store.state.chatserver,
      chatroomsearchkeyword: "",
      searchoption: "방제목",
      searchoptions: ["방제목", "방장"],
      dialog: false,
      typepassword: "",
      secretjoinflag: null,
      selfmembership: null,
      fullflag: null
    };
  },
  methods: {
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
    delconfirm(msg) {
      return window.confirm(msg);
    },
    async isFull(roomId) {
      let url = this.dbserver;
      let result = await caxios(url)
        .request({
          url: `/rooms/${roomId}/${this.token}`,
          method: "GET",
          baseURL: url
        })
        .then(res => {
          // return res.data.result;
          // console.log(res.data)
          this.fullflag = res.data.result;
        });
      // return result;
    },
    deleteroom(roomId, idx) {
      let roomUrl = this.dbserver;
      caxios(roomUrl).request({
        url: "/rooms/",
        method: "DELETE",
        baseURL: roomUrl,
        data: {
          _id: roomId,
          token: this.token,
          id: this.id
        }
      });
      this.$delete(this.items, idx);
    },
    searchRooms() {
      fetch(
        this.$store.state.dbserver +
          "/search/rooms/" +
          this.searchoption +
          "/" +
          this.chatroomsearchkeyword +
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
            this.items = data;
          } else {
            alert("올바른 값을 입력하세요");
          }
        })
        .catch(error => console.log(error))
        .finally();
    },
    getRooms() {
      this.chatroomsearchkeyword = "";
      let roomURL = this.dbserver;
      caxios(roomURL)
        .request({
          url: "/rooms/" + this.token,
          method: "get",
          baseURL: roomURL
        })
        .then(res => {
          this.items = res.data;
          // console.log(res.data)
          this.items.sort(function(a, b) {
            if (new Date(a.createdAt) < new Date(b.createdAt)) {
              return 1;
            }
            if (new Date(a.createdAt) > new Date(b.createdAt)) {
              return -1;
            }
            return 0;
          });
        });
    },
    async joinchat(roomId, idx) {
      // this.isFull(roomId).then(res => {
      //   console.log(res);
      // });
      await this.isFull(roomId);
      // await console.log(this.fullflag)
      if (await this.fullflag) {
        this.fullflag = "";

        if (this.items[idx].password) {
          await (this.dialog = true);
          await this.$refs.chtpwd.focus();
          await (this.secretjoinflag = idx);
        } else {
          this.$router.push({ name: "room", params: { _id: roomId } });
        }
      } else {
        alert("꽉찬 방입니다.");
        this.fullflag = "";
      }
    },
    newSocialRoom() {
      this.$router.push({ name: "new" });
    },
    async joinsecret() {
      let secretroomid = this.items[this.secretjoinflag]._id;

      if (
        this.items[this.secretjoinflag].password ===
        this.typepassword.toString()
      ) {
        await this.isFull(secretroomid);
        if (await this.fullflag) {
          this.fullflag = "";
          this.$router.push({
            name: "room",
            params: { _id: this.items[this.secretjoinflag]._id }
          });
        } else {
          this.fullflag = "";
          alert("방이 꽉찼습니다.");
          this.dialog = false;
          this.getRooms();
        }
      } else {
        this.fullflag = "";
        alert("패스워드가 틀렸습니다.");
        this.typepassword = "";
      }
    }
  },
  mounted() {
    this.getRooms(), this.isAdmin();
  }
};
</script>

<style>
.sociallist-header {
  display: flex;
  align-items: center;
}
.buttonsize {
  width: 30px;
  height: 30px;
  background: rgb(231, 231, 231);
  box-shadow: 1px 2px 2px rgb(143, 143, 143);
}
.lockicon {
  color: rgb(177, 177, 177);
}
.deleteicon {
  color: rgb(255, 138, 138);
}
.noicon {
  color: rgba(255, 255, 255, 0);
}
.deleteicon:hover {
  color: rgb(255, 64, 64) !important;
  /* text-shadow: 3px 3px 3px rgb(255, 99, 99); */
  -webkit-text-stroke: 0.5px rgb(221, 166, 166);
}
.chatlist {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
.chatheader {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
.chatlist:hover {
  background: rgba(184, 184, 184, 0.226);
  cursor: pointer;
}
.chaticon {
  margin: 0px 10px;
}
.chatinfo {
  display: flex;
  flex: 0 0 85%;
  justify-content: space-around;
}
.headerinfo {
  display: flex;
  flex: 0 0 85%;
  justify-content: space-around;
}

.chaticons {
  flex: 0 0 7.5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.headericons {
  flex: 0 0 7.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90%;
}

.chatinfo > div {
  display: flex;
  justify-content: center;
}
.headerinfo > div {
  display: flex;
  justify-content: center;
}

.chatinfo div:nth-child(1) {
  font-weight: 600;
  flex: 0 0 40%;
  min-width: 0;
  justify-content: flex-start;
  padding: 0px 10px;
}
.chatinfo div:nth-child(1) span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chatinfo div:nth-child(2) {
  font-weight: 400;
  flex: 0 0 25%;
}
.chatinfo div:nth-child(3) {
  font-weight: 400;
  flex: 0 0 10%;
}
.chatinfo div:nth-child(4) {
  font-weight: 400;
  font-size: 90%;
  flex: 0 0 20%;
}
.headerinfo div:nth-child(1) {
  font-weight: 400;
  flex: 0 0 40%;
}
.headerinfo div:nth-child(2) {
  font-weight: 400;
  flex: 0 0 25%;
}
.headerinfo div:nth-child(3) {
  font-weight: 400;
  flex: 0 0 10%;
}
.headerinfo div:nth-child(4) {
  font-weight: 400;
  flex: 0 0 20%;
}
</style>
