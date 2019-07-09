<template>
  <div class="test">
    <div style="margin-top : 20px;"></div>
    
    <v-text-field v-model="title" label="제목" ></v-text-field>
    <v-text-field v-model="body" label="내용" ></v-text-field>
    <v-btn @click="submit">작성</v-btn>
    <ImgUpload></ImgUpload>
    <div></div>
    
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";
import ImgUpload from "@/components/common/ImgUpload";


export default {
  name: 'TestComponent',
  components: {
    ImgUpload,
    LoginPage
  },
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
    },
    searchPhoto(t){
      for (let index = 0; index < this.data.length; index++) {
        if(this.data[index].title == t){
          this.img = this.data[index].body;
        }
      }
    }
  }
}
</script>