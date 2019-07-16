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
              <v-flex d-inline-flex align-center>
                <v-text-field v-model="id" label="ID" v-validate="'required'"  required></v-text-field>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn :disabled="IDCheck" @click ="useridCheck" ref="IDCheckBtn">중복체크</v-btn>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="IDCheck" style="color:blue;">중복체크 완료</span>
              </v-flex>
              <v-text-field
                type="password"
                ref="password"
                v-validate="'required|min:6|pwdChecked'"
                data-vv-name="Password"
                :error-messages="errors.collect('Password')"
                v-model="pwd"
                label="Password"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                v-validate="'required|confirmed:Password'"
                :error-messages="errors.collect('pwdCheck')"
                data-vv-as="Password"
                data-vv-name="pwdCheck"
                v-model="pwdCheck"
                label="PasswordCheck"
                required
              ></v-text-field>
              <v-text-field v-model="name" label="Name" v-validate="'required|min:2'" :error-messages="errors.collect('Name')" data-vv-name="Name" required></v-text-field>
              <v-text-field v-model="nickname" label="NickName" data-vv-name="NickName" v-validate="'required|min:2'"  :error-messages="errors.collect('NickName')" required></v-text-field>
              <v-select
                v-model="region"
                label="지역"
                :items="regions"
                :rules="[v => !!v || '지역을 선택해주세요.']"
                required
                <!-- attach="#menulist" -->
              ></v-select>
              <v-select
                v-model="year"
                label="기수"
                :items="years"
                :rules="[v => !!v || '기수를 선택해 주세요.']"
                required
                <!-- attach="#menulist" -->
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
      year: { type: Number },
      regions: ["서울", "대전", "구미", "광주"],
      years: [1, 2],
      IDCheck: false
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((res) => {
        if(!res){
          alert("값이 유효한지 체크해주세요.")
          return;
        }
        if(!this.IDCheck){
          alert("ID중복체크를 해주세요.")
          this.$nextTick(() => this.$refs.IDCheckBtn.$el.focus())
          return;
        }
        fetch("http://192.168.31.55:3000/users/addUser", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.name,
          id: this.id,
          pwd: this.pwd,
          nickname: this.nickname,
          region: this.region,
          year: this.year,
          membership: false
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
        .finally(this.$refs.form.reset());
      });

      
    },
    clear() {
      this.$refs.form.reset();
    },
    useridCheck(){
      // 서버에 보내서 id 값 체크 
      this.IDCheck = true;
    }
  },
  created() {
    this.$validator.extend("pwdChecked", {
      getMessage: field =>
        `${field} 는 문자, 숫자, 특수기호가 반드시 포함 되어야 합니다.`,
      validate: value => {
        return /^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*#?&]).*$/.test(value);
      }
    });

  }
};
</script>
<style>
/* #menulist {
  left: 0 !important;
  top: 0 !important;
} */
</style>
