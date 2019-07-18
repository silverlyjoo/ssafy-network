<template>
  <v-layout justify-center xs10 sm8>
    <v-card style="width:60%">
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field label="ID" v-model="id" ref="id"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
              v-model="pwd"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="PASSWORD"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-card-actions>
          <v-btn flat color="primary" @click="login">로그인</v-btn>
          <v-btn flat color="primary">돌아가기</v-btn>
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
            this.$session.set("user" , this.id);
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
