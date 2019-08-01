<template>
  <v-layout fill-height>
    <vue-resizable
      :height ="height"
      :min-width="minWidth"
      :max-width="maxWidth"
      :active="handlers"
    >
      <Nav class="nav"></Nav>
    </vue-resizable>
    <div class="mainsection" >
      <Header></Header>
      <div class="routingbody" id="routingbody">
        <router-view></router-view>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </v-layout>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Nav from "@/components/common/Nav";
import VueResizable from "vue-resizable";
import { mapState } from "vuex";

export default {
  data() {
    return {
      login: this.$store.state.login,
      height: "",
      minWidth: 320,
      maxWidth: 700,
      handlers: ['r'],
    };
  },
  components: {
    Header,
    Footer,
    Nav,
    VueResizable
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },computed:mapState(["heightflag"]),
  watch:{
    heightflag(to,from){
      if(from == false && to == true){
        this.handleResize();
        this.$store.state.heightflag = false;
      }
    }
  },
  methods:{
    handleResize(){
      this.height = document.getElementById('routingbody').offsetHeight;
      if(this.height < 800){
        this.height = window.innerHeight;
      }else{
         this.height += this.height*0.1;
      }
    }
  }


};
</script>

<style>
.mainsection {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.nav {
  width: 100%;
  height: 100%;
}
</style>
