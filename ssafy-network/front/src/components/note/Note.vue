<template>
  <v-container id="note" :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap column >
      <v-flex xs12 style="max-width:400px;">
        <v-text-field label="Title" box>
        </v-text-field>
      </v-flex>
      <v-flex xs12 style="max-width:700px;">
        <editor v-model="editorText" :options="editorOptions" height="600px" previewStyle="vertical" />
      </v-flex>
      <v-flex text-xs-right>
        <v-btn>저장</v-btn>
        <v-btn>취소</v-btn>
      </v-flex>
      <!-- <v-flex xs12>
        <viewer :value="editorText" />
      </v-flex>
      <v-flex xs12>
        <span>{{editorText}}</span>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Note",
  data() {
    return {
      editorText: "",
      editorOptions: {
        hideModeSwitch: true
      }
    };
  }
};
</script>
<style>
#note{
  height: 80%;
}
</style>
