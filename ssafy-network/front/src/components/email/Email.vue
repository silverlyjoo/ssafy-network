<template>
  <v-container>
    <div>
      <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Email-PAGE</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="writeMail" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="grey darken-2" dark v-on="on">메일 쓰기</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">메일 쓰기</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-switch v-model="switch1" label="검색방법 변경"></v-switch>

                <v-layout wrap>
                  <v-layout v-if="switch1">
                    <v-flex xs3 class="pr-1 pl-2">
                      <v-select v-model="searchoption" :items="searchoptions"></v-select>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="keyword" @keyup.enter="searchUser"></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                      <v-btn @click="searchUser" color="grey darken-2" class="white--text ml-4">검색</v-btn>
                    </v-flex>
                  </v-layout>

                  <v-layout v-else>
                    <v-flex xs6>
                      <v-text-field v-model="parent" label="소속 부서" @keyup.enter="parentCheck"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-btn @click="parentCheck" color="grey darken-2" class="white--text">검색</v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-select
                        v-model="department"
                        label="부서"
                        :items="departments"
                        @change="childsearch"
                        required
                        style="max-width:20vh;"
                      ></v-select>
                    </v-flex>
                    <v-flex xs4>
                      <v-select
                        v-model="position"
                        label="기수"
                        :items="positions"
                        @change="search"
                        required
                        style="max-width:20vh;"
                      ></v-select>
                    </v-flex>
                    <v-flex xs4>
                      <v-select
                        v-model="person"
                        label="사람"
                        :items="people"
                        @change="addreceive"
                        required
                        style="max-width:20vh;"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-flex xs12>
                    <v-text-field label="수신인(닉네임)" v-model="receive" readonly="readonly" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 text-xs-right>
                    <v-btn @click="remove" color="grey darken-2" class="white--text">수신인 삭제</v-btn>
                    <v-btn
                      @click="removereceive"
                      color="grey darken-2"
                      class="white--text"
                    >수신인 전부 삭제</v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs12>
                    <v-text-field label="제목" v-model="title"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea counter label="내용" v-model="content"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-2" flat @click="close">취소</v-btn>
              <v-btn color="grey darken-2" flat @click="send">발송</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          color="grey darken-2"
          dark
          @click="expand = !expand"
        >{{ expand ? '여러 개의' : '하나의' }} 쪽지 확인</v-btn>
      </v-toolbar>
      <br />
      <v-data-table :headers="headers" :items="mails" :expand="expand" item-key="_id">
        <template v-slot:items="props">
          <tr>
            <td
              @click="props.expanded = !props.expanded"
              class="text-xs-center"
            >{{ props.item.writer }}</td>
            <td
              @click="props.expanded = !props.expanded"
              class="text-xs-center"
            >{{ props.item.title }}</td>
            <td
              @click="props.expanded = !props.expanded"
              class="text-xs-center"
            >{{ props.item.createdAt }}</td>
            <td class="justify-center layout px-0">
              <v-btn
                color="grey darken-2"
                class="white--text py-1"
                @click="mailDeleteForm(props.item)"
              >메일 삭제</v-btn>
            </td>
          </tr>
        </template>

        <template v-slot:expand="props">
          <v-card flat>
            <v-layout class="py-3">
              <v-flex
                xs12
                text-xs-left
                class="py-3 display-1"
              >&nbsp; &nbsp; &nbsp; {{ props.item.content }}</v-flex>
            </v-layout>
          </v-card>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">경고</v-card-title>
          <v-card-text>메일을 삭제하시겠습니까?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text" color="grey darken-2" text @click="dialog = false">취소</v-btn>
            <v-btn class="white--text" color="grey darken-2" text @click="deleteMail()">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <br />
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      switch1: true,
      selectedItem: "",
      expand: false,
      writeMail: false,
      dialog: false,
      title: "",
      parent: "",
      keyword: "",
      method: "",
      searchoption: "닉네임",
      searchoptions: ["닉네임", "아이디"],
      content: "",
      receive: [],
      department: "",
      departments: [],
      position: "",
      positions: [],
      person: "",
      people: [],
      headers: [
        {
          text: "발신자",
          align: "center",
          sortable: false,
          value: "writer"
        },
        { text: "제목", align: "center", value: "title", sortable: false },
        { text: "시간", align: "center", value: "createdAt", sortable: false },
        { text: "삭제", align: "center", sortable: false }
      ],
      mails: []
    };
  },
  mounted() {
    this.getMailList();
  },
  methods: {
    searchUser() {
      if (this.searchoption == "닉네임") {
        this.method = "nickname";
      } else {
        this.method = "id";
      }
      this.person = "";
      fetch(
        this.$store.state.dbserver +
          "/search/users/" +
          this.method +
          "/" +
          this.keyword +
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
          if (data.result == false) {
            alert("검색된 유저가 없습니다");
          } else {
            this.receive.push(data.nickname);
          }
        });
    },
    parentCheck() {
      this.keyword = "";
      this.department = "";
      this.departments = [];
      this.position = "";
      this.positions = [];
      this.person = "";
      this.people = [];
      fetch(this.$store.state.dbserver + "/company/join/" + this.parent, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.departments = data.children;
            this.department = this.departments[0];
          }
        });
    },
    childsearch() {
      this.position = "";
      this.positions = [];
      this.person = "";
      this.people = [];
      fetch(this.$store.state.dbserver + "/company/join/" + this.department, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.positions = data.children;
          }
        });
    },
    addreceive() {
      this.keyword = "";
      this.receive.push(this.person);
    },
    removereceive() {
      this.receive = [];
    },
    remove() {
      if (this.person != "" && this.receive.indexOf(this.person) != -1) {
        this.receive.splice(this.receive.indexOf(this.person), 1);
      }
      if (this.keyword != "" && this.receive.indexOf(this.keyword) != -1) {
        this.receive.splice(this.receive.indexOf(this.keyword), 1);
      }
    },
    search() {
      if (this.department != "" && this.position != "") {
        this.person = "";
        this.people = [];
        fetch(
          this.$store.state.dbserver +
            "/users/department/" +
            this.department +
            "/position/" +
            this.position +
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
            this.people = data;
          })
          .catch(error => console.log(error))
          .finally();
      }
    },
    getMailList() {
      fetch(
        this.$store.state.dbserver +
          "/mails/" +
          this.$session.get("nickname") +
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
            this.mails = data;
          }
        })
        .catch(error => console.log(error))
        .finally();
    },
    send() {
      fetch(this.$store.state.dbserver + "/mails", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          writer: this.$session.get("nickname"),
          title: this.title,
          content: this.content,
          receive: this.receive
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("전송 완료");
            this.close();
            this.getMailList();
          } else {
            alert("전송 실패");
          }
        });
    },

    mailDeleteForm(item) {
      this.dialog = true;
      this.selectedItem = item;
    },

    close() {
      this.writeMail = false;
      this.parent = "";
      this.title = "";
      this.content = "";
      this.receive = [];
      this.department = "";
      this.departments = [];
      this.position = "";
      this.positions = [];
      this.person = "";
      this.people = [];
      this.keyword = "";
    },
    deleteMail() {
      fetch(this.$store.state.dbserver + "/mails/", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          _id: this.selectedItem._id,
          nickname: this.$session.get("nickname")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            this.getMailList();
          } else {
            alert("삭제 실패");
          }
          this.dialog = false;
        });
    }
  }
};
</script>

<style>
</style>
