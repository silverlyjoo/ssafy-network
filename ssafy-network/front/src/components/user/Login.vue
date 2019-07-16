<template>
  <v-card>
    <v-container>
      <v-layout fill-height>
        <v-flex>
          <v-text-field label="ID" placeholder="Placeholder"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">Top 10 Australian beaches</span>
        </v-flex>
      </v-layout>

      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  }
};
</script>
