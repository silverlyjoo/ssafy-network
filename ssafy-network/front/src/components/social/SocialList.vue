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
              <v-text-field v-model="chatroomsearchkeyword"></v-text-field>
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
            <v-list-tile
              v-for="(item, idx) in items"
              :key="item.title"
              avatar
              @click="joinchat(item._id, idx)"
              class="mb-3"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-title v-html="item.owner"></v-list-tile-title>
                <v-list-tile-title v-html="item.createdAt"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="item.password">
                <i class="fas fa-lock lockicon"></i>
              </v-list-tile-action>
            </v-list-tile>
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
      chatserver: this.$store.state.chatserver,
      chatroomsearchkeyword: "",
      searchoption: "title",
      searchoptions: ["title", "owner"],
      dialog: false,
      typepassword: "",
      secretjoinflag: null
    };
  },
  methods: {
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
      if (this.items[idx].password) {
        // console.log(idx)
        await (this.dialog = true);
        await this.$refs.chtpwd.focus();
        await (this.secretjoinflag = idx);
      } else {
        this.$router.push({ name: "room", params: { _id: roomId } });
      }
    },
    newSocialRoom() {
      this.$router.push({ name: "new" });
    },
    joinsecret() {
      if (
        this.items[this.secretjoinflag].password ===
        this.typepassword.toString()
      ) {
        this.$router.push({
          name: "room",
          params: { _id: this.items[this.secretjoinflag]._id }
        });
      } else {
        alert("비밀번호가 틀렸습니다.");
        this.typepassword = "";
      }
    }
  },
  mounted() {
    this.getRooms();
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
.flexcenter {
  display: flex;
  justify-content: center;
}
.lockicon {
  color: rgb(177, 177, 177);
}
</style>
