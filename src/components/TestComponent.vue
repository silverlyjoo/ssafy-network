<template>
  <div class="test">
    <h1>Test</h1>
      <h1>{{ data[0].title }}</h1>
      <h5>{{ data[0].body }}</h5>
    
    <v-text-field v-model="title" label="제목" ></v-text-field>
    <v-text-field v-model="body" label="내용"></v-text-field>
    <v-btn @click="submit">작성</v-btn>

  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: 'TestComponent',
  data(){
    return {
      data:[],
      title:'',
      body:''
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