<template>
  <v-content justify-center align-content-center class="py-0">
    <MainHeader></MainHeader>
    <v-layout column class="mains" justify-center>


      <div v-if="path === '/'" class="flex1" >
        <v-flex xs6 class="flex1" align-center>
          <div class="mainlogo">
            <v-img :src="require('@/assets/ssafy.png')" style="border-radius: 20px;"/>
          </div>
        </v-flex>
        <v-flex xs12 class="flex1 mb-4" align-center>
          <h1 style="color: grey; margin-top: 5rem;">안녕하세요 SSAFY 학생전용 네트워크 입니다.</h1>
        </v-flex>
      </div>

      <div v-else>
        <v-flex xs12>
          <router-view></router-view>
        </v-flex>
      </div>
    </v-layout>
  </v-content>
</template>

<script>
import MainHeader from '@/components/user/MainHeader'
export default {
  name: "mainpage",
  data() {
    return {
      path: window.location.pathname
    };
  },
  components: {
    MainHeader
  },
  methods: {
    getPath() {
      this.path = window.location.pathname;
    }
  },
  watch : {
    '$route' (to, from) {
      this.getPath();
    }
  },
  mounted() {
    this.getPath();
  }
};
</script>
<style>
.mains {
  min-height: 100vh;
  background: rgb(236, 236, 236);
}
.flex1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mainlogo {
  width: 40vw;
  height: 40vh;
}
@media (min-width: 1024px) {
  .mainlogo {
    width: 410px;
    height: 318px;
  }
}
</style>
