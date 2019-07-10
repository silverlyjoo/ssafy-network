<template>
  <v-container fluid grid-list-md>
    <form class="title">
      <v-text-field
        v-model="title"
        v-validate="'required|max:50'"
        :counter="50"
        :error-messages="errors.collect('name')"
        label="Title"
        data-vv-name="name"
        required
      ></v-text-field>
      <br />
      <br />
    </form>

    <v-flex>
      <h3 class="image">&nbsp; &nbsp; &nbsp; &nbsp; Image</h3>
      <v-divider class="my-3 divider"></v-divider>
      <div class="btn-box">
        <v-btn @click="myImage">My image</v-btn>
        <v-btn @click="randomImage">Random image</v-btn>
      </div>
      <div class="btn-box" v-if="ImgShow">
        <input type="file" @change="onFileChange" />
      </div>
    </v-flex>

    <br />
    <br />

    <div class="content">
      <v-textarea model="content" box label="Content" auto-grow value></v-textarea>
      <v-btn @click="submit">글 쓰기</v-btn>
      <v-btn @click="goback">취소</v-btn>
    </div>
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
        }
      }
    },
    title: "",
    content: "",
    image: "",
    ImgShow: false
  }),

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    submit() {
      if (this.title == "") {
        alert("제목을 입력하세요");
      } else if (this.image == "") {
        alert("이미지를 선택하세요");
      } else if (this.content == "") {
        alert("내용을 입력하세요");
      } else {
        FirebaseService.addPortfolio(this.title, this.image, this.content);
        alert("업로드 되었습니다");
        this.title = "";
        this.image = "";
        this.content = "";
      }
    },
    myImage() {
      this.ImgShow = true;
    },
    randomImage() {
      this.ImgShow = false;
      this.image = "https://source.unsplash.com/random";
    },
    goback() {
      //
    },
    onFileChange(e) {
      // file 세팅
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      const apiUrl = "https://api.imgur.com/3/image";
      //const apiKey = "dd4e293e0b55616";
      const apiKey = "cbf88cd772389df";

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
        .catch();
    }
  }
};
</script>

<style>
.title {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.image {
  width: 50%;
  opacity: 0.35;
  text-align: center;
}

.btn-box {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.divider {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.content {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>