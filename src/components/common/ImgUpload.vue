<template>
  <div>
    <v-text-field v-model="title" label="제목" ></v-text-field>
    

    <div v-if="!image">
      <input type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <img :src="image" /><br>
      <v-btn @click="removeImage">Remove image</v-btn>
    </div>
    <v-text-field v-model="image" label="이미지" ></v-text-field>
    <v-btn @click="submit">업로드</v-btn>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "ImgUpload",
  data() {
    return {
      title: '',
      image: ""
    };
  },
  methods: {
    submit(){
      FirebaseService.addData(this.title,this.image);
    },
    removeImage(){
      this.image = "";
    },
    onFileChange(e) {
      // file 세팅
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      const apiUrl = "https://api.imgur.com/3/image";
      const apiKey = "dd4e293e0b55616";

      let data = new FormData();
      let content = {
        method: "POST",
        headers: {
          Authorization: "Client-ID " + apiKey,
          Accept: "application/json"
        },
        body: data,
        mimeType: "multipart/form-data"
      };

      data.append("image", files[0]);

      fetch(apiUrl, content)
        .then(response => response.json())
        .then(success => {
          this.image = success.data.link;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

