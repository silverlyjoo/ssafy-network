<template>
  <v-layout column>
    <v-flex text-xs-right class="ma-2">
      <v-btn primary :disabled="choiceEditor" @click="choiceEditor = !choiceEditor">코드리뷰형식</v-btn>
      <v-btn primary :disabled="!choiceEditor" @click="choiceEditor = !choiceEditor">마크다운형식</v-btn>
    </v-flex>
    <v-flex>
      <MarkdownEditor v-if="!choiceEditor" :_id="_id" :title="title"></MarkdownEditor>
      <CodeEditor v-if="choiceEditor" :_id="_id" :title="title"></CodeEditor>
    </v-flex>
  </v-layout>
</template>

<script>
import CodeEditor from "@/components/note/CodeEditor.vue";
import MarkdownEditor from "@/components/note/MarkdownEditor.vue";

export default {
  name: "NoteWriter",
  components: {
    CodeEditor,
    MarkdownEditor
  },
  props: {
    _id: { type: String },
    title: { type: String }
  },
  data() {
    return {
      choiceEditor: false
    };
  }
};
</script>
