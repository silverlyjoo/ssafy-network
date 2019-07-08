<template>
  <div id="app">
    <div style="height:100px"></div>
    <Header></Header>
    
    <v-content>
    <router-view/>
    </v-content>
    <div style="height:100px"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>
