<template>
  <v-container>
    <div>
      <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Email-PAGE</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="grey darken-2" dark v-on="on">메일 쓰기</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">메일 쓰기</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs4>
                    <v-select
                      v-model="department"
                      label="부서"
                      :items="departments"
                      @change="search"
                      required
                      style="max-width:20vh;"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-select
                      v-model="position"
                      label="직책"
                      :items="positions"
                      @change="search"
                      required
                      style="max-width:20vh;"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-select
                      v-model="person"
                      label="직원"
                      :items="people"
                      required
                      style="max-width:20vh;"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="수신인(닉네임)" v-model="receive" readonly="readonly" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 text-xs-right>
                    <v-btn @click="addreceive" color="grey darken-2" class="white--text">수신인 등록</v-btn>
                    <v-btn @click="removereceive" color="grey darken-2" class="white--text">수신인 삭제</v-btn>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs12>
                    <v-text-field label="제목" v-model="title"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="내용" v-model="content"></v-text-field>
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
      <v-data-table :headers="headers" :items="desserts" :expand="expand" item-key="_id">
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-center">{{ props.item.writer }}</td>
            <td class="text-xs-center">{{ props.item.title }}</td>
            <td class="text-xs-center">{{ props.item.createdAt }}</td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card flat>
            <v-layout class="py-3">
              <v-flex xs3 text-xs-center class="py-3 display-1">
                <strong>내용</strong>
              </v-flex>
              <v-flex xs6 text-xs-left class="py-3 display-1">
                &nbsp; &nbsp; &nbsp; {{ props.item.content }}
              </v-flex>
              <v-flex xs3 text-xs-left>
                <v-btn
                  @click="deleteMail(props.item._id)"
                  color="grey darken-2"
                  class="white--text"
                  justify-right
                >메일 삭제</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      expand: false,
      dialog: false,
      title: "",
      content: "",
      receive: [],
      department: "",
      departments: ["인사", "영업", "개발", "기획"],
      position: "",
      positions: [
        "사원",
        "주임",
        "대리",
        "과장",
        "차장",
        "부장",
        "이사",
        "상무",
        "전무",
        "부사장",
        "사장",
        "회장"
      ],
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
        { text: "시간", align: "center", value: "createdAt", sortable: false }
      ],
      desserts: []
    };
  },
  mounted() {
    this.getMailList();
  },
  methods: {
    addreceive() {
      this.receive.push(this.person);
    },
    removereceive() {
      this.receive = [];
    },
    search() {
      if (this.department != "" && this.position != "") {
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
            this.desserts = data;
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
    close() {
      this.dialog = false;
      this.title = "";
      this.content = "";
      this.receive = [];
      this.department = "";
      this.position = "";
      this.person = "";
    },
    deleteMail(_id) {
      fetch(this.$store.state.dbserver + "/mails/", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          _id: _id,
          nickname: this.$session.get("nickname")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("메일 삭제");
            this.getMailList();
          } else {
            alert("삭제 실패");
          }
        });
    }
  }
};
</script>

<style>
</style>
