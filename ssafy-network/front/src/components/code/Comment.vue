<template>
  <v-container>
    <v-layout column v-if="comments[0] != null">
      <v-flex v-for="com in comments" :key="com.title">
        <v-card class="pa-3">
          <v-layout row wrap>
            <v-flex xs1 justify-left text-xs-left>
              <strong>{{com.writer}}</strong> &nbsp;&nbsp;&nbsp;
            </v-flex>
            <v-flex v-if="updateflag" xs8 justify-left>&nbsp;&nbsp;&nbsp; {{com.comment}} &nbsp;&nbsp;&nbsp; (수정됨)</v-flex>
            <v-flex v-else xs8 justify-left>&nbsp;&nbsp;&nbsp;{{com.comment}}</v-flex>
            <v-flex xs2 justify-center text-xs-center>{{com.createdAt}}</v-flex>
            <v-flex xs1 justify-center text-xs-center>
              <v-icon v-if="com.writer == $session.get('nickname')" @click="updateForm(com)">edit</v-icon>
              <v-icon v-if="com.writer == $session.get('nickname')" @click="deleteForm(com)">delete</v-icon>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex>
        <v-card class="pa-3" grid-list-md style="margin-left:auto; margin-right:auto;">
          <v-alert :value="true" color="grey darken-2" icon="info">댓글이 없습니다.</v-alert>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="showUpdate" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">댓글 수정</v-card-title>
        <v-card-text>
          <v-text-field v-model="changecomment" label="내용"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="grey darken-2" text @click="closeUpdateForm()">취소</v-btn>
          <v-btn class="white--text" color="grey darken-2" text @click="updateComment()">수정</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDelete" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">댓글 삭제</v-card-title>
        <v-card-text>댓글을 삭제 하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="grey darken-2" text @click="closeDeleteForm()">취소</v-btn>
          <v-btn class="white--text" color="grey darken-2" text @click="deleteComment()">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    _id: { type: String }
  },
  data() {
    return {
      showUpdate: false,
      showDelete: false,
      selectedItem: "",
      comments: {},
      changecomment: "",
    };
  },
  computed: mapState(["commentflag"]),
  methods: {
    updateForm(comment) {
      this.showUpdate = true;
      this.selectedItem = comment;
      this.changecomment = comment.comment;
    },
    deleteForm(comment) {
      this.showDelete = true;
      this.selectedItem = comment;
    },
    closeUpdateForm() {
      this.showUpdate = false;
      this.selectedItem = "";
      this.getComments();
    },
    closeDeleteForm() {
      this.showDelete = false;
      this.selectedItem = "";
      this.getComments();
    },

    updateComment() {
      // fetch 로 데이터 전송후 closeForm 호출해야함
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("작성하지 않은 란이 있는지 확인해주세요.");
          return;
        } else {
          fetch(this.$store.state.dbserver + "/comments", {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              _id: this.selectedItem._id,
              token: this.$session.get("token"),
              comment: this.changecomment
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.result == true) {
                this.$validator.reset();
              } else {
                alert("댓글을 수정할 수 없습니다.");
              }
              this.closeUpdateForm();
            });
        }
      });
    },
    deleteComment() {
      // fetch 로 데이터 전송후 closeForm 호출해야함
      fetch(this.$store.state.dbserver + "/comments", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.selectedItem._id,
          token: this.$session.get("token")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
          } else {
            alert("게시글을 삭제할 수 없습니다.");
          }
          this.closeDeleteForm();
        });
    },
    getComments() {
      fetch(
        this.$store.state.dbserver +
          "/comments/" +
          this._id +
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
          if (data.error != null) {
            alert("잘못된 값입니다.");
          } else {
            this.comments = data;
          }
        });
    }
  },
  updated() {
    this.$store.state.heightflag = true;
  },
  mounted() {
    this.getComments();
  },
  watch: {
    commentflag(to, from) {
      if (from == false && to == true) {
        this.$store.state.commentflag = false;
        this.getComments();
      }
    }
  }
};
</script>
