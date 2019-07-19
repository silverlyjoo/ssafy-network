<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "App",

  data() {
    return {};
  },
  mounted(){
    if (this.$session.get("token")!=null) {
      this.$store.state.login = true;
      this.$router.push('index');
    }else{
      this.$store.state.login = false;
    }
  }
};
</script>

<style>
</style>
