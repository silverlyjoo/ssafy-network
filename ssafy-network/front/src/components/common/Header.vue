<template>
  <v-toolbar color="indigo lighten-1">
    <v-toolbar-title class="white--text">WeMe</v-toolbar-title>

    <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn icon>
      <v-icon color="white">dashboard</v-icon>
    </v-btn>
    <v-menu bottom origin="center center" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon  v-on="on">
          <v-icon color="white">notifications</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" @click="goPage()">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn icon>
      <v-icon color="white">person</v-icon>
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