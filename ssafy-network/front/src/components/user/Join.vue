<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 md10>
        <v-card class="elevation-12 pa-4">
          <v-card-title>
            <h1>회원가입</h1>
          </v-card-title>
          <v-form ref="form">
            <v-card-text>
              <v-flex d-inline-flex align-center>
                <v-text-field
                  v-model="id"
                  label="ID"
                  v-validate="'required|min:5'"
                  data-vv-name="ID"
                  :error-messages="errors.collect('ID')"
                  ref="IDText"
                  required
                  class="mr-5"
                ></v-text-field>
                <v-btn @click="useridCheck" ref="IDCheckBtn" class="mr-5">중복체크</v-btn>
                <span v-if="IDCheck" style="color:blue;">중복체크 완료</span>
              </v-flex>
              <v-text-field
                type="password"
                ref="Password"
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
              <v-text-field
                v-model="name"
                label="Name"
                v-validate="'required|min:2'"
                :error-messages="errors.collect('Name')"
                data-vv-name="Name"
                required
              ></v-text-field>
              <v-flex d-inline-flex align-center>
                <v-text-field
                  class="mr-5"
                  ref="NickName"
                  v-model="nickname"
                  label="NickName"
                  data-vv-name="NickName"
                  v-validate="'required|min:2'"
                  :error-messages="errors.collect('NickName')"
                  required
                ></v-text-field>
                <v-btn @click="userNickNameCheck" ref="NickNameCheckBtn" class="mr-5">중복체크</v-btn>
                <span v-if="NickNameCheck" style="color:blue;">중복체크 완료</span>
              </v-flex>
              <v-select
                v-model="region"
                label="지역"
                :items="regions"
                v-validate="'required'"
                data-vv-name="region"
                :error-messages="errors.collect('region')"
                required
                attach="#menulist"
              ></v-select>
              <v-select
                v-model="year"
                label="기수"
                :items="years"
                v-validate="'required'"
                data-vv-name="Year"
                :error-messages="errors.collect('Year')"
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
      year: "",
      regions: ["서울", "대전", "구미", "광주"],
      years: [1, 2],
      IDCheck: false,
      NickNameCheck: false
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        }
        if (!this.IDCheck) {
          alert("ID중복체크를 해주세요.");
          this.$nextTick(() => this.$refs.IDCheckBtn.$el.focus());
          return;
        }
        fetch(this.$store.state.dbserver + "/users", {
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
            membership: 0
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result == true) {
              alert("회원가입 성공!!!");
              this.$refs.form.reset();
              this.$validator.reset();
              this.$router.push("/login");
            } else {
              alert("회원가입 실패...");
              this.$refs.form.reset();
              this.$validator.reset();
            }
          })
          .catch(error => console.log(error))
          .finally();
      });
    },
    clear() {
      this.$refs.form.reset();
      this.$validator.reset();
    },
    useridCheck() {
      // 서버에 보내서 id 값 체크
      if (this.id.length < 4) {
        alert("ID의 최소길이는 4입니다.");
        this.$refs.IDText.focus();
        this.IDCheck = false;
        return;
      }
      fetch(this.$store.state.dbserver + "/users/overlap/id/" + this.id, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("ID가 존재합니다.");
            this.$refs.IDText.focus();
            this.$refs.IDText.reset();
            this.IDCheck = false;
            return;
          } else {
            this.IDCheck = true;
          }
        })
        .catch(error => console.log(error))
        .finally();
    },
    userNickNameCheck() {
      if (this.nickname.length < 2) {
        alert("NickName의 최소길이는 2입니다.");
        this.$refs.NickName.focus();
        this.NickNameCheck = false;
        return;
      }
      fetch(
        this.$store.state.dbserver + "/users/overlap/nickname/" + this.nickname,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            alert("NickName이 존재합니다.");
            this.$refs.NickName.focus();
            this.$refs.NickName.reset();
            this.NickNameCheck = false;
            return;
          } else {
            this.NickNameCheck = true;
          }
        })
        .catch(error => console.log(error))
        .finally();
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
  },
  watch: {
    id(to, from) {
      this.IDCheck = false;
    },
    nickname(to, from) {
      this.NickNameCheck = false;
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
