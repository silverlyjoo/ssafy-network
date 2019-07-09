<template>
  <div>
    <v-responsive>
      <v-container class="text-xs-center">
        <v-layout align-center>
          <v-flex aspect-ratio="1.7">
            <h3 class="display-3">{{title}}</h3>

            <br />
            <br />

            <v-img :src="imgSrc" height="50%" width="80%" style="margin: 0 auto;"></v-img>

            <br />
            <br />

            <v-divider class="my-3"></v-divider>

            <br />
            <br />

            <span class="subheading" id="content">{{content}}</span>
            <v-btn @click="translate(content)">번역</v-btn>

            <br />
            <br />
            <br />

            <div>
              <v-btn class="my-1" color="dark" large @click="back()" exact>돌아가기</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "PortfolioDetail",
  props: {
    id : {type:String},
    title: { type: String },
    content: { type: String },
    imgSrc: { type: String }
  },
  data() {
    return {
      translateflag: true,
      client_id: this.$store.state.client_id,
      client_secret: this.$store.state.client_secret,
      textresult: null
    };
  },
  methods: {
    back() {
      this.$router.push("/portfolio");
    },
    translate(content) {
      console.log(content);
      const taxios = axios.create({
        baseURL: "https://openapi.naver.com",
        withCredentials: false,
        headers: {
          'Accept': "application/json",
          "X-Naver-Client-Id": this.client_id,
          "X-Naver-Client-Secret": this.client_secret,
          "Access-Control-Allow-Origin": "*"
        }
      });
      let data = {
          source: "en",
          target: "ko",
          text: content
      }

      // console.log(data);
      taxios.post("/v1/papago/n2mt", data=data)
      .then((response) => {
        console.log(response)
      })

      // axios.post( )
    }
  }
};
</script>
