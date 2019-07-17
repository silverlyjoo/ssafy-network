<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11>
        <v-card class="my-4 chatlistbox">
          <v-list subheader>
            <v-subheader>Recent chat</v-subheader>
            <v-list-tile v-for="item in items" :key="item.title" avatar @click>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn to="/social/room">Start chat</v-btn>
    <v-btn to="/social/new">New chat</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "SocialList",
  data() {
    return {
      items: [
        {
          active: true,
          title: "Jason Oner"
        },
        {
          active: true,
          title: "Ranee Carlson"
        },
        {
          title: "Cindy Baker"
        },
        {
          title: "Ali Connors"
        }
      ]
    };
  }
};
</script>

<style>
.chatlistbox {
  height: 45rem;
}
</style>
