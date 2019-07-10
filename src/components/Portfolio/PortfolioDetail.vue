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

            <span class="subheading" id="content" v-if="translateflag">{{content}}</span>
            <span class="subheading" v-else>{{ textresult }}</span>
            <v-btn @click="translateflag=!translateflag">번역</v-btn>

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
    id: { type: String },
    title: { type: String },
    content: { type: String },
    imgSrc: { type: String }
  },
  data() {
    return {
      translateflag: true,
      api_key: this.$store.state.api_key,
      textresult: null
    };
  },
  mounted() {
    try {
      this.translate(this.content);
    } catch (err) {
      console.log('translate error')
    }
    
  },
  methods: {
    back() {
      this.$router.push("/portfolio");
    },
    async translate(content) {
      if (!content) { return }
      try {
        const taxios = await axios.create({
          baseURL: "https://translation.googleapis.com"
        });
        const getTranslate = await taxios.post("/language/translate/v2", null, {
          params: {
            source: "en",
            target: "ko",
            q: content,
            key: this.api_key
          }
        });
        this.textresult = getTranslate.data.data.translations[0].translatedText
      } catch (err) {
      }
    }
  }
};
</script>
