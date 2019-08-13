<template>
  <v-container>
    <h1>Department 관리</h1>
    <v-layout justify-center text-xs-center row>
      <v-btn to="/admin/user" color="grey darken-2" class="white--text">유저관리</v-btn>
      <v-btn to="/admin/chat" color="grey darken-2" class="white--text">채팅방관리</v-btn>
      <v-btn to="/admin/notice" color="grey darken-2" class="white--text">공지사항관리</v-btn>
      <v-btn to="/admin/dep" color="grey darken-2" class="white--text">부서관리</v-btn>
      <router-view></router-view>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn dark v-on="on" color="grey darken-2" class="white--text">부서 등록</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">부서 등록</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="first" label="상위부서"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="department" label="부서명"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="child" label="하위부서"></v-text-field>
                  <v-btn @click="push">하위 부서 등록</v-btn>
                  <v-btn @click="remove">하위 부서 삭제</v-btn>
                  <v-text-field
                    v-if="children.length > 0"
                    v-model="children"
                    label="하위부서"
                    readonly="readonly"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">취소</v-btn>
            <v-btn color="blue darken-1" flat @click="regi">등록</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <br><br>
    <div>
      <v-toolbar flat color="white" style="margin-left:auto; margin-right:auto;">
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-2"
          class="white--text"
          @click="expand = !expand"
        >{{ expand ? '단일' : '다중' }} 열기</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :expand="expand"
        item-key="_id"
        style="margin-left:auto; margin-right:auto;"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-center">{{ props.item.parent }}</td>
            <td class="text-xs-center">{{ props.item.department }}</td>
            <td class="text-xs-center">
              <!-- <v-btn @click="updateDep(props.item._id)" color="grey darken-2" class="white--text">수정</v-btn> -->
              <!-- <v-btn @click="deleteDep(props.item._id)" color="grey darken-2" class="white--text">삭제</v-btn> -->
              <v-icon @click="updateDep(props.item._id)">edit</v-icon>
              <v-icon @click="deleteDep(props.item._id)">delete</v-icon>
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card flat>
            <v-card-text>
              <v-layout class="beflex">{{ props.item.children }}</v-layout>
            </v-card-text>
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
      first: "",
      department: "",
      child: "",
      children: [],
      expand: false,
      dialog: false,
      headers: [
        {
          text: "상위부서",
          align: "center",
          sortable: false,
          value: "parent"
        },
        { text: "부서명", align: "center", sortable: false, value: "department" },
        { text: "수정/삭제", align: "center", sortable: false }
      ],
      desserts: []
    };
  },
  methods: {
    push() {
      if (this.child != "") {
        this.children.push(this.child);
        this.child = "";
      }
    },
    remove() {
      if (this.children.indexOf(this.child) != -1) {
        this.children.splice(this.children.indexOf(this.child), 1);
      }
    },
    getCompany() {
      fetch(
        this.$store.state.dbserver + "/company/" + this.$session.get("token"),
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
        });
    },
    updateDep(_id) {
      fetch(
        this.$store.state.dbserver +
          "/company/" +
          _id +
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
            this.dialog = true;
            this.first = data.parent;
            this.department = data.department;
            this.children = data.children;
          }
        });
    },
    deleteDep(_id) {
      fetch(this.$store.state.dbserver + "/company", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: _id,
          token: this.$session.get("token")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("삭제 성공!!!");
            this.getCompany();
          } else {
            alert("성공 실패...");
          }
        });
    },
    regi() {
      if (this.children.length > 0) {
        fetch(this.$store.state.dbserver + "/company", {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.$session.get("token"),
            department: this.department,
            parent: this.first,
            children: this.children
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result == true) {
              alert("추가 성공!!!");
              this.close();
              this.getCompany();
            } else {
              alert("추가 실패...");
            }
          });
      }
    },
    close() {
      this.dialog = false;
      this.first = "";
      this.department = "";
      this.child = "";
      this.children = [];
    }
  },
  mounted() {
    this.getCompany();
  }
};
</script>

<style>
</style>