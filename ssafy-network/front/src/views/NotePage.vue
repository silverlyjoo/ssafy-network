<template>
  <div class="about">
    <h1>This is an note page</h1>
    <Note></Note>
  </div>
</template>


<script>
import Note from '@/components/note/Note.vue';

export default {
  name:'NotePage',
  components: {
    Note
    }
}
</script>