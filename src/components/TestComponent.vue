<template>
  <div class="test">
    <div style="margin-top : 20px;"></div>
    <h1>Test</h1>
    
    <v-text-field v-model="title" label="제목" ></v-text-field>
    <v-text-field v-model="body" label="내용"></v-text-field>
    <v-btn @click="submit">작성</v-btn>
    <ImgUpload></ImgUpload>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import ImgUpload from "@/components/common/ImgUpload"
export default {
  name: 'TestComponent',
  components: {
    ImgUpload
  },
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