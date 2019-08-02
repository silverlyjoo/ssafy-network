<template>
  <v-container class="ma-0 pa-0" >
    <v-layout column >
      <!-- <v-flex text-xs-center class="ma-3"><h1>WM Project</h1></v-flex> -->
       <v-flex
          v-for="(item, i) in items"
          :key="i"
          xs12
          flat
        >
          <v-card
            dark
            class="pa-4"
          >
          <v-layout row wrap fill-height>
            <v-flex fill-height>
              <v-img :src="item.src" height="500px" contain>
                <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="item.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
              </v-img>
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
import note from '@/assets/note.jpg';
import code from '@/assets/code.jpg';
import social from '@/assets/social.jpeg';
export default {
  name: "HomePage",
  data() {
    return {
      session: true,
      items: [
        {
          color: '#1F7087',
          src: note,
          title: '정리 작성',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: code,
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },{
          color: '#111111',
          src: social,
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        }
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
