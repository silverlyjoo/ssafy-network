<template>
  <v-layout  justify-center xs10 sm8>
    <v-card style="width:60%">
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field label="ID"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="PASSWORD"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-card-actions>
          <v-btn flat color="grey">Submit</v-btn>
          <v-btn flat color="grey">Cancle</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-layout>
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
