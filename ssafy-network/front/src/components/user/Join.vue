<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10>
        <v-card class="elevation-12 pa-4">
          <v-card-title>
            <h3>회원가입</h3>
          </v-card-title>
          <v-form ref="form">
          <v-card-text>
            <v-text-field v-model="id" label="ID" required></v-text-field>
            <v-text-field type="password" v-model="pwd" label="Password" required></v-text-field>
            <v-text-field type="password" v-model="pwdCheck" label="PasswordCheck" required></v-text-field>
            <v-text-field v-model="name" label="Name" required></v-text-field>
            <v-text-field v-model="nickname" label="NickName" required></v-text-field>
            <v-select
              v-model="region"
              label="지역"
              :items="regions"
              :rules="[v => !!v || '지역을 선택해주세요.']"
              required
              attach="#menulist"
            ></v-select>
            <v-select
              v-model="year"
              label="기수"
              :items="years"
              :rules="[v => !!v || '기수를 선택해 주세요.']"
              required
              attach="#menulist"
            ></v-select>
          </v-card-text>
          </v-form>
          <v-flex text-xs-right>
            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      id: "",
      pwd: "",
      pwdCheck: "",
      name: "",
      nickname: "",
      region: "",
      year: {type:Number},
      regions: ["서울", "대전", "구미", "광주"],
      years: [1, 2]
    };
  },
  methods: {
    submit() {
      console.log("11")
      fetch('https://192.168.31.55:3000/users/addUser',{
        method:'POST',
        headers:new Headers(),
        body:JSON.stringify({name:this.name, id:this.id,pwd : this.pwd, nickname : this.nickname,region :this.region,year:this.year,membership:false})
      })
      .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style>
#menulist {
  left: 0 !important;
  top: 0 !important;
}
</style>
