<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11>
        <v-card class="my-4 chatlistbox">
         <v-container>
            <v-form ref="form">
              <v-card-text>
                <v-flex d-inline-flex align-center>
                  <v-text-field
                    v-model="title"
                    label="방 제목"
                    v-validate="'required|min:2'"
                    data-vv-name="TITLE"
                    :error-messages="errors.collect('TITLE')"
                    ref="TITLEText"
                    required
                    class="mr-5"
                  ></v-text-field>
                </v-flex>
                <v-text-field
                  type="Number"
                  ref="max"
                  v-model="max"
                  label="최대 인원"
                  required
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  label="비밀번호"
                ></v-text-field>
              </v-card-text>
            </v-form>
            <v-flex text-xs-right>
              <v-btn @click="submit">submit</v-btn>
            </v-flex>
         </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SocialList",
  data() {
    return {
      title:"",
      max:"",
      owner:"",
      password:""
    };
  },
  methods:{
    submit() {
      this.$validator.validateAll().then(res => {
        fetch(this.$store.state.dbserver + "/rooms", {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.$session.get("token"),
            title: this.title,
            max: this.max,
            owner: this.$session.get("nickname"),
            password: this.password,
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result) {
              console.log(this.title)
              alert("방이 생성 되었습니다.");
            } else {
              alert("에러");
            }
          })
          .catch(error => console.log(error))
          .finally(
            this.$router.push({name: 'list'})
          );
      });
    }
  }
 
};
</script>

<style>
.chatlistbox {
  /* height:; */
}
</style>
