<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-layout column class="ma-0">
      <!-- <v-flex text-xs-center class="ma-3"><h1>WM Project</h1></v-flex> -->
      <v-flex v-for="(item, i) in items" :key="i" xs12 flat min-height="400">
        <v-card class="mx-auto" min-height="400">
          <v-img :src="item.src" min-height="400" height="600px" wdith="100%">
            <div style="width: 100%; height: 100%;">
              <div class="contents">
                <div>{{ item.title }}</div>
                <div>{{ item.content }}</div>
              </div>
            </div>
            <!-- <v-container fluid pa-2>
              <v-layout>
                <v-flex xs12 align-end flexbox :class="item.cssType">
                  <span class="display-1 white--text" v-text="item.title"></span>
                  <br />
                  <span class="title white--text" v-text="item.content"></span>
                </v-flex>
              </v-layout>
            </v-container>-->
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import note from "@/assets/note.jpg";
import code from "@/assets/code.jpg";
import social from "@/assets/social.jpeg";
export default {
  name: "HomePage",
  data() {
    return {
      session: true,
      items: [
        {
          color: "#1F7087",
          src: note,
          title: "Task 정리 및 스케줄 관리",
          content: "폴더 구조로 정리 가능 ",
          cssType: "textright"
        },
        {
          color: "#952175",
          src: code,
          title: "코드 리뷰 & QnA",
          content: "코드 에디터를 통한 질문 등록 및 게시판 형태",
          cssType: "textleft"
        },
        {
          color: "#111111",
          src: social,
          title: "Social 채팅",
          content: "멀티 채팅 가능",
          cssType: "textright"
        }
      ]
    };
  }
};
</script>
<style>
.home {
  background: rgb(10, 0, 56);
  color: rgb(218, 234, 248);
}
.textright {
  margin-top: 20%;
  margin-right: 10%;
  text-align: right;
}
.textleft {
  margin-top: 20%;
  margin-left: 10%;
  text-align: left;
}
.contents {
  position: absolute;
  left: 10rem;
  top: 8rem;
  max-width: 50rem;
  height: 15rem;
  background: rgba(54, 54, 54, 0.459);
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 0px 80px;
}

.contents > div:nth-child(1) {
  font-size: 200%;
  font-weight: 600;
  color:white;
  margin-bottom: 20px;
}
.contents > div:nth-child(2) {
  font-size: 180%;
  font-weight: 300;
  color:white;
}
</style>
