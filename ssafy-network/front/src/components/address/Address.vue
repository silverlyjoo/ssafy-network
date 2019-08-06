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
            <td class="text-xs-left">{{ props.item.cellphone }}</td>
            <td class="text-xs-left">{{ props.item.fax }}</td>
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
    <v-btn @click="filter">필터링</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      expand: false,
      headers: [
        {
          text: "업체명",
          align: "left",
          value: "company"
        },
        { text: "직책", value: "position" },
        { text: "대표", value: "represent" },
        { text: "전화번호", value: "telephone" },
        { text: "휴대전화", value: "cellphone" },
        { text: "팩스번호", value: "fax" }
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
    }
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
