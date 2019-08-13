<template>
  <v-layout column>
    <v-flex text-xs-right class="ma-2">
      <v-btn color="grey darken-2"
                    class="white--text" :disabled="choiceEditor" @click="choiceEditor = !choiceEditor">코드리뷰형식</v-btn>
      <v-btn color="grey darken-2"
                    class="white--text" :disabled="!choiceEditor" @click="choiceEditor = !choiceEditor">마크다운형식</v-btn>
    </v-flex>
    <v-flex>
      <MarkdownEditor v-if="!choiceEditor" :data="data" :title="title"></MarkdownEditor>
      <CodeNoteEditor v-if="choiceEditor" :data="data" :title="title"></CodeNoteEditor>
    </v-flex>
  </v-layout>
</template>

<script>
import CodeNoteEditor from "@/components/note/CodeNoteEditor.vue";
import MarkdownEditor from "@/components/note/MarkdownEditor.vue";

export default {
  name: "NoteWriter",
  components: {
    CodeNoteEditor,
    MarkdownEditor
  },
  props: {
    data: { type: Object },
    title: { type: String }
  },
  data() {
    return {
      choiceEditor: false
    };
  }
};
</script>
