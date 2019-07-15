<template>
  <v-toolbar color="indigo lighten-1">
    <v-toolbar-title class="white--text">SSAFY WM</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn icon>
      <v-icon>dashboard</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>person</v-icon>
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
    })
  }
</script>
<style>


</style>
