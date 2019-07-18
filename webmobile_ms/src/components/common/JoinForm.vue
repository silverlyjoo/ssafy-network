<template>
  <v-layout justify-center class="ma-5">
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Full Name"
            placeholder="ssafy"
            required
          ></v-text-field>
          <v-text-field
            ref="address"
            v-model="address"
            :rules="[rules.required, rules.address]"
            label="E-mail"
            placeholder="ssafy@multicampus.com"
            counter="25"
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
          <v-text-field
            ref="passwordCheck"
            v-model="passwordCheck"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
          <span v-if="password!=passwordCheck">PassWord is not matched.</span>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat to="/">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon class="my-0" @click="resetForm">
            <v-icon>refresh</v-icon>
          </v-btn>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>




<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  data: () => ({
    errorMessages: "",
    name: null,
    address: "",
    password: null,
    passwordCheck: null,
    show1: false,
    formHasErrors: false,
    title: "Preliminary report",
    rules: {
      required: value => !!value || "Required.",
      counter: value => value.length <= 20 || "Max 20 characters",
      min: v => v.length >= 8 || "Min 8 characters",
      address: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),

  computed: {
    form() {
      return {
        name: this.name,
        address: this.address,
        password: this.password,
        passwordCheck:this.passwordCheck
      };
    }
  },

  watch: {
    name() {
      this.errorMessages = "";
    }
  },

  methods: {
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      if (this.password == this.passwordCheck) {
        this.formHasErrors = false;

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true;

          this.$refs[f].validate(true);
        });
        
        FirebaseService.addUser(this.address, this.password);
        this.$router.push('/');
      } else {
          alert("Please match your PASSWORD");
      }
      
    }
  }
};
</script>