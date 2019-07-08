<template>
  <div class="test">
    <div style="margin-top : 20px;"></div>
    <h1>Test</h1>
    
    <v-text-field v-model="title" label="제목" ></v-text-field>
    <v-text-field v-model="body" label="내용"></v-text-field>
    <v-btn @click="submit">작성</v-btn>

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
    }
  }
}
</script>