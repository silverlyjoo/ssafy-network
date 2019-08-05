<template>
  <v-layout column>
    <v-flex v-for="com in comments" :key="com.title" >
      <v-card class="pa-3">
        <v-layout row wrap>
        <v-flex justify-left>
          <v-icon>subdirectory_arrow_right</v-icon>
          {{com.comment}}
        </v-flex>
        <v-flex justify-end text-xs-right>
          <v-icon>person_outline</v-icon>
          {{com.writer}} &nbsp;&nbsp;&nbsp;
          <v-icon @click="updateForm(com)">edit</v-icon>
          <v-icon @click="deleteForm(com)">delete</v-icon>
        </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-dialog v-model="showUpdate" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">댓글 수정</v-card-title>
        <v-card-text>
          <v-text-field v-model="selectedItem.comment" label="내용"></v-text-field>
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
  </v-layout>
</template>

<script>
export default {
  props: {
    comments: {}
  },
  data() {
    return {
      showUpdate: false,
      showDelete: false,
      selectedItem: ""
    };
  },
  methods: {
    updateForm(comment) {
      this.showUpdate = true;
      this.selectedItem = comment;
    },
    deleteForm(comment) {
      this.showDelete = true;
      this.selectedItem = comment;
    },
    closeUpdateForm() {
      this.showUpdate = false;
      this.selectedItem = "";
    },
    closeDeleteForm() {
      this.showDelete = false;
      this.selectedItem = "";
    },
    updateComment() {
      // fetch 로 데이터 전송후 closeForm 호출해야함
      fetch({
        
      })
    },
    deleteComment() {
      // fetch 로 데이터 전송후 closeForm 호출해야함
    }
  },
  updated(){
    this.$store.state.heightflag = true;
  }
};
</script>
