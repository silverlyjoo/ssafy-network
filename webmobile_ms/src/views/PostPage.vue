<template>
  <div id="Post">
    <v-container>
      <v-layout>
        <v-flex xs12>
          <PostList :limits="6" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PostList from '../components/Post/PostList'
import FirebaseService from '@/services/FirebaseService';

export default {
    name: 'Post',
    components: {
        PostList
    },
    mounted() {
		FirebaseService.SendLog("PostPage");
	}
}
</script>
