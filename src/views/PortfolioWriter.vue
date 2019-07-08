<template>
  <v-container fluid grid-list-md>
    <form>
      <v-text-field
        v-model="name"
        v-validate="'required|max:50'"
        :counter="50"
        :error-messages="errors.collect('name')"
        label="Title"
        data-vv-name="name"
        required
      ></v-text-field>
      <br>
      <br>
    </form>

    <v-textarea name="input-7-1" box label="Content" auto-grow value></v-textarea>
    <v-btn @click="submit">글 쓰기</v-btn>
    <v-btn @click="goback">취소</v-btn>
  </v-container>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  name: "PortfolioWriter",
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    name: "",
    dictionary: {
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 50 characters"
          // custom messages
        },
      }
    }
  }),

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.name = "";
      this.$validator.reset();
    },
    goback() {
        // 
    }
  }
};
</script>