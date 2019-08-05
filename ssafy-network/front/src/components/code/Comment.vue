<template>
  <v-layout justify-center>
    <v-flex v-for="com in comments" :key="com.title">
      <v-card class="mx-auto">
        <v-card-title>{{com.title}}</v-card-title>
        <v-card-text>{{com.writer}}</v-card-text>
        <v-card-actions>
          <v-btn @click="updateForm(com)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn @click="deleteForm(com)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="showUpdate" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">댓글 수정</v-card-title>
        <v-card-text>
          <v-text-field v-model="selectedItem.title" label="제목"></v-text-field>
          <v-text-field v-model="selectedItem.comment" label="내용"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeUpdateForm()">취소</v-btn>
          <v-btn color="green darken-1" text @click="updateComment()">수정</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDelete" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">댓글 삭제</v-card-title>
        <v-card-text>댓글을 삭제 하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteForm()">취소</v-btn>
          <v-btn color="green darken-1" text @click="deleteComment()">수정</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    comments: []
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
    },
    deleteComment() {
      // fetch 로 데이터 전송후 closeForm 호출해야함
    }
  }
};
</script>
