<template>
  <div class="test">
    <div style="margin-top : 20px;"></div>
    <h1>Test</h1>
    
    <!-- <v-text-field v-model="title" label="제목" ></v-text-field>
    <v-text-field v-model="body" label="내용"></v-text-field>
    <v-btn @click="submit">작성</v-btn> -->
    
    <!-- <v-btn @click='searchPhoto("아이린")'>아이린</v-btn>
    <v-img :src='img'></v-img> -->
    
      <input type="file" @change="onFileSelected">
      <button @click="onUpload"></button>

    
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import $ from "jquery";

export default {
  name: 'TestComponent',
  data(){
    return {
      data:[],
      title:'',
      body:'',
      image :''
    };
  },mounted(){
    this.getData();
  },methods:{
    async getData(){
      this.data = await FirebaseService.getData();
    },
    submit(){
      FirebaseService.addData(this.title,this.body);
    },
    searchPhoto(t){
      for (let index = 0; index < this.data.length; index++) {
        if(this.data[index].title == t){
          this.img = this.data[index].body;
        }
        
      }
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0]
    },
    onUpload(){

    }
  }
}
</script>