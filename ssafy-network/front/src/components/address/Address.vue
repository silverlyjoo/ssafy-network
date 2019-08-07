<template>
  <v-container>
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          @click="expand = !expand"
        >{{ expand ? 'Close' : 'Keep' }} other rows</v-btn>
      </v-toolbar>
      <v-data-table :headers="headers" :items="desserts" :expand="expand" item-key="_id">
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.company }}</td>
            <td class="text-xs-left">{{ props.item.position }}</td>
            <td class="text-xs-left">{{ props.item.represent }}</td>
            <td class="text-xs-left">{{ props.item.telephone }}</td>
            <td class="text-xs-left">{{ props.item.fax }}</td>
            <td class="text-xs-left">{{ props.item.writer }}</td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card flat>
            <v-card-text>
              <v-layout class="beflex">
                {{ props.item.content }}
                <v-btn @click="addbookmark(props.item._id)">즐겨찾기</v-btn>
                <v-btn @click="removebookmark(props.item._id)">즐겨찾기 해제</v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">업체 등록</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">업체 등록</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="등록자" v-model="writer" readonly="readonly" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="업체명" v-model="company" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="직책" v-model="position"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="대표" v-model="represent"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="전화번호" v-model="telephone"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="팩스번호" v-model="fax"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="주소 및 설명" v-model="content"></v-text-field>
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

    <v-btn @click="filter">필터링</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      expand: false,
      dialog: false,
      writer: this.$session.get("nickname"),
      company:"",
      position:"",
      represent:"",
      telephone:"",
      fax:"",
      content:"",
      headers: [
        {
          text: "업체명",
          align: "left",
          value: "company"
        },
        { text: "직책", value: "position" },
        { text: "대표", value: "represent" },
        { text: "전화번호", value: "telephone" },
        { text: "팩스번호", value: "fax" },
        { text: "등록자", value: "writer" }
      ],
      desserts: []
    };
  },
  mounted() {
    this.getAddressList();
  },
  methods: {
    filter() {
        fetch(
        this.$store.state.dbserver + "/addresses/" +this.$session.get("id")+"/"+ this.$session.get("token"),
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
    getAddressList() {
      fetch(
        this.$store.state.dbserver + "/addresses/" + this.$session.get("token"),
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
    addbookmark(_id) {
      fetch(this.$store.state.dbserver + "/addresses/bookmark", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          _id: _id,
          id: this.$session.get("id")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("북마크 등록");
          } else {
            alert("수정 실패");
          }
        });
    },
    removebookmark(_id) {
      fetch(this.$store.state.dbserver + "/addresses/cancel", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          _id: _id,
          id: this.$session.get("id")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("북마크 해제");
          } else {
            alert("수정 실패");
          }
        });
    },
    regi() {
      fetch(this.$store.state.dbserver + "/addresses", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.$session.get("token"),
          writer: this.writer,
          company: this.company,
          position: this.position,
          represent: this.represent,
          telephone: this.telephone,
          fax: this.fax,
          content: this.content,
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("등록 완료");
            this.close();
            this.getAddressList();
          } else {
            alert("등록 실패");
          }
        });
    },
    close() {
      this.dialog = false;
      this.company = "";
      this.position = "";
      this.represent = "";
      this.telephone = "";
      this.fax = "";
    },
  }
};
</script>

<style>
.beflex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
