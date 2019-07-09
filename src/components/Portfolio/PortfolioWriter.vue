<template>
  <v-container fluid grid-list-md>
    <form>
      <v-text-field
        v-model="title"
        v-validate="'required|max:50'"
        :counter="50"
        :error-messages="errors.collect('name')"
        label="Title"
        data-vv-name="name"
        required
      ></v-text-field>
      <br>
      <br>
    </form>

    <v-textarea v-model="content" box label="Content" auto-grow value></v-textarea>
    <v-btn @click="submit">글 쓰기</v-btn>
    <v-btn @click="goback">취소</v-btn>
  </v-container>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import FirebaseService from "@/services/FirebaseService";

Vue.use(VeeValidate);

export default {
  name: "PortfolioWriter",
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    name: "",
    dictionary: {
      custom: {
        name: {
          required: () => "Title can not be empty",
          max: "The title field may not be greater than 50 characters"
        },
      }
    },
    title: '',
    content:'',
    image: ''
  }),

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    submit() {
      if(this.title == ""){
        alert("제목을 입력하세요");
      }
      else if(this.image == ""){
        alert("이미지를 선택하세요");
      }
      else if(this.content == ""){
        alert("내용을 입력하세요");
      }
      else{
        FirebaseService.addData(this.title,this.image,this.content);
        alert("업로드 되었습니다");
        this.title = "";
        this.image = "";
        this.content = "";
      }
    },
    clear() {
      this.name = "";
      this.$validator.reset();
    },
    goback() {
        // 
    }
  }
};
</script>