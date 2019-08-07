<template>
  <v-container>
    <v-card>
      <v-container>
        <h1>User Data Edit</h1>
        <br />
        <hr />
        <br />
        <v-layout align-center>
          <v-flex xs5 class="px-3">
            <v-text-field disabled v-model="userDataModel.id" label="id"></v-text-field>
          </v-flex>
          <v-flex xs2>
            <p>ID는 수정할 수 없습니다</p>
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex xs5 class="px-3">
            <v-select
              v-model="userDataModel.department"
              label="부서"
              :items="departments"
              required
              style="max-width:20vh;"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex xs5 class="px-3">
            <v-text-field v-model="userDataModel.nickname" label="nickname"></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-btn @click="nicknameCheck">중복체크</v-btn>
            <span v-if="nicknamecheckflag">중복체크 완료</span>
            <span v-else style="color: red">중복체크 필요</span>
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex xs5 class="px-3">
            <v-text-field
              :type="'password'"
              v-model="postPassword"
              label="현재 비밀번호"
              v-validate="'required'"
              data-vv-name="postPassword"
              :error-messages="errors.collect('postPassword')"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex xs5 class="px-3">
            <v-text-field
              :type="'password'"
              data-vv-name="pwd"
              label="변경할 비밀번호"
              v-model="newPassword"
              name="pwd"
              ref="pwd"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex xs5 class="px-3">
            <v-text-field
              :type="'password'"
              data-vv-name="passwordconfirm"
              data-vv-as="pwd"
              v-validate="newPassword ? 'required|confirmed:pwd': ''"
              :error-messages="errors.collect('passwordconfirm')"
              label="비밀번호 확인"
              v-model="passwordConfirm"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn @click="submit">Submit</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import caxios from "@/plugins/createaxios.js";
export default {
  data() {
    return {
      dbserver: this.$store.state.dbserver,
      token: this.$session.get("token"),
      id: this.$session.get("id"),
      userData: null,
      postPassword: null,
      newPassword: null,
      passwordConfirm: null,
      departments: ["인사", "영업", "개발", "기획"],
      nicknamecheckflag: false,
      postNickname: null,
      userDataModel: {
        token: "",
        name: "",
        id: "",
        pwd: "",
        nickname: "",
        department: "",
        position: "",
        membership: ""
      }
    };
  },
  methods: {
    nicknameCheck() {
      if (this.postNickname === this.userDataModel.nickname) {
        this.nicknamecheckflag = true;
      } else {
        let url = this.dbserver;
        caxios(url)
          .request({
            baseURL: url,
            method: "GET",
            url: `/users/overlap/nickname/${this.userDataModel.nickname}`
          })
          .then(res => {
            if (res.data.result) {
              alert("닉네임 중복입니다.");
            }
            this.nicknamecheckflag = !res.data.result;
          });
      }
    },
    getUserData() {
      let url = this.dbserver;
      caxios(url)
        .request({
          baseURL: url,
          method: "GET",
          url: `/users/${this.id}/${this.token}`
        })
        .then(res => {
          this.postNickname = res.data.nickname;
          this.userDataModel = res.data;
          this.userDataModel["token"] = this.token;
        });
    },
    editUserData() {
      let url = this.dbserver;
      let changedata = this.userDataModel;
      if (this.newPassword) {
        changedata.pwd = this.newPassword;
      }
      caxios(url).request({
        baseURL: url,
        method: "PUT",
        url: `/users`,
        data: changedata
      });
    },
    submit() {
      this.$validator.validate().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        } else if (!this.nicknamecheckflag) {
          alert("닉네임 중복체크를 해주세요");
        } else if (this.userDataModel.pwd !== this.postPassword.toString()) {
          console.log(this.userDataModel);
          alert("패스워드를 올바르게 입력해주세요.");
          return;
        } else {
          this.editUserData();
          this.$router.push({ path: "/user" });
        }
      });
    }
  },
  mounted() {
    this.getUserData();
    // console.log(this.userDataModel);
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
    userDataModel: {
      handler: function(val, old) {
        this.nicknamecheckflag = false;
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
