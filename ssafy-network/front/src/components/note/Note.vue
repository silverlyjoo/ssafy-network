<template>
<div>
    <v-layout wrap row>
      <v-flex xs12 sm6>
        <editor v-model="editorText"/>
      </v-flex>
      <v-flex xs12 sm6>
        <viewer :value="editorText" />
      </v-flex>
      <v-flex xs12>
        <span>{{editorText}}</span>
      </v-flex>
    </v-layout>
</div>
</template>

<script>
export default {
  name: 'Note',
  data(){
    return {
      editorText:''
    }
  }
}
</script>
