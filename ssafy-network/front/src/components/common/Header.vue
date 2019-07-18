<template>
  <v-toolbar color="indigo lighten-1">
    <v-toolbar-title class="white--text title">SSAFY WM</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn icon >
      <v-icon color="white">dashboard</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="white">notifications</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="white">person</v-icon>
    </v-btn>
    <v-btn icon @click="logout">
      <v-icon color="white">mdi-exit-to-app</v-icon>
    </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me 1' },
        { title: 'Click Me 2' },
        { title: 'Click Me 3' },
        { title: 'Click Me 4' }
      ]
    }),
    methods:{
logout(){
      this.$store.state.login = false;
      this.$session.clear();
      this.$router.push('/');
    }
    }
    
  }
</script>
<style>


</style>
