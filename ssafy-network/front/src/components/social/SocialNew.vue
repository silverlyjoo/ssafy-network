<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11>
        <v-card class="my-4 chatlistbox">
        </v-card>
      </v-flex>
    </v-layout>
    <router-link to="/social/chatroom">start chat</router-link>
  </v-container>
</template>

<script>
export default {
  name: "SocialList",
  data() {
    return {};
  }
};
</script>

<style>
.chatlistbox {
  height: 45rem;
}
</style>
