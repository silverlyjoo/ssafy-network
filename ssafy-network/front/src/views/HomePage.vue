<template>
  <v-container >
    <v-layout column class="ma-2">
      <v-flex text-xs-center class="ma-3"><h1>WM Project</h1></v-flex>
       <v-flex
          v-for="(item, i) in items"
          :key="i"
          xs12
          flat
        >
          <v-card
            :color="item.color"
            dark
            class="pa-4"
          >
          <v-layout row wrap>
            <v-flex xs6>
              <v-img :src="item.src" height="500px" contain></v-img>
            </v-flex>
            <v-flex xs6>
              <v-card-title primary-title>
                <div class="headline">{{item.title}}</div>
                <div>{{item.artist}}</div>
              </v-card-title>
            </v-flex>
          </v-layout>
          </v-card>
        </v-flex>
    <v-flex>
    <v-content>
      <router-view></router-view>
    </v-content>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      session: true,
       items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
        ],
    };
  }
};
</script>
<style>
.home {
  background: rgb(10, 0, 56);
  color: rgb(218, 234, 248);
}
</style>
