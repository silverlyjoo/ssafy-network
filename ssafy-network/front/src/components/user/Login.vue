<template>
  <v-container>
    <v-layout row justify-center xs10 sm8 class="text-xs-center">
      <v-flex xs3>
        <v-card height="500px">
          <v-img class="white--text" height="100%" :src="require('@/components/user/loginIMG.png')"></v-img>
        </v-card>
      </v-flex>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat class="grey lighten-4">
            <v-card-title primary-title>
              <h2>SIGN IN</h2>
            </v-card-title>
            <v-form>
              <v-text-field prepend-icon="person" name="Username" label="Username"></v-text-field>
              <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
              <v-card-actions>
                <v-btn primary large block>Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      id: "",
      pwd: ""
    };
  },
  methods: {
    login() {
      fetch(this.$store.state.dbserver + "/users/login", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.id,
          pwd: this.pwd
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            this.$store.state.login = true;
            this.$session.set("user", this.id);
            this.id = "";
            this.pwd = "";
            console.log("로그인 성공!!!");
            this.$router.push("/index");
          } else {
            alert("로그인 실패...");
            this.id = "";
            this.pwd = "";
            this.$refs.id.focus();
          }
        })
        .catch(error => console.log(error))
        .finally();
    }
  }
};
</script> 