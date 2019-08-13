<template>
  <v-layout row justify-end class="mr-3 mb-3">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn fab text small color="grey darken-2"
                    class="white--text" v-on="on" @click="dialog=true">
          <v-icon small>edit</v-icon>
        </v-btn>
      </template>
      <span>일정 추가</span>
      </v-tooltip>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">ToDo List 추가</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap column>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="할일 제목"
                  v-model="event.title"
                  v-validate="'required'"
                  data-vv-name="title"
                  :error-messages="errors.collect('title')"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu
                  v-model="startDatePick"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="event.startDate"
                      label="시작 날짜"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      v-validate="'required'"
                      :error-messages="errors.collect('startDate')"
                      data-vv-name="startDate"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="event.startDate"  @input="startDatePick = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu
                  v-model="endDatePick"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="event.endDate"
                      label="종료 날짜"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      v-validate="'required'"
                      :error-messages="errors.collect('endDate')"
                      data-vv-name="endDate"
                      ref ="endDate"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="event.endDate" @input="endDatePick = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-textarea
                  label="할일 내용"
                  v-model="event.desc"
                  v-validate="'required'"
                  :error-messages="errors.collect('desc')"
                  data-vv-name="desc"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  :items="colors"
                  v-model="event.cssClass"
                  label="Select"
                  single-line
                  v-validate="'required'"
                  data-vv-name="cssClass"
                  :error-messages="errors.collect('cssClass')"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2"
                    class="white--text" flat @click="close()">취소</v-btn>
          <v-btn color="grey darken-2"
                    class="white--text" flat @click="addCalendar()">추가</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "CalendarForm",
  props: {
    today: ""
  },
  data() {
    return {
      dialog: false,
      focus: "",
      startDatePick: false,
      endDatePick: false,
      event: {
        title: "",
        desc: "",
        cssClass: "",
        startDate: "",
        endDate: ""
      },
      colors: [
        { text: "red" },
        { text: "skyblue" },
        { text: "blue" },
        { text: "orange" },
        { text: "pink" },
        { text: "green" }
      ]
    };
  },
  mounted() {
    this.focus = this.today;
  },watch:{
    'event.endDate'(to,from){
      var x = new Date(this.event.startDate);
      var y = new Date(this.event.endDate);
          if(x > y){
            alert("날짜가 올바르지 않습니다.");
            this.$refs.endDate.focus();
            this.event.endDate = "";
          }
    }
  },
  methods: {
    close() {
      this.dialog = false;
      this.event.title = "";
      this.event.desc = "";
      this.event.startDate = "";
      this.event.cssClass = "";
      this.event.endDate = "";
       this.$validator.reset();
    },
    addCalendar() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        }else{
          var x = new Date(this.event.startDate);
          var y = new Date(this.event.endDate);

          if(x > y){
            alert("날짜가 올바르지 않습니다.");
            this.$refs.endDate.focus();
            this.event.endDate = "";
            return;
          }else{
          //추가 
          fetch(this.$store.state.dbserver + "/calendars",{method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.$session.get("token"),
            id:  this.$session.get("id"),
            title: this.event.title,
            start: this.event.startDate,
            end: this.event.endDate,
            cssClass: this.event.cssClass,
            desc: this.event.desc
          })
          }).then(res => res.json())
        .then(data => {
          if(data.result == true){
            this.$store.state.CalendarCheck = true;
          }else{
            alert("추가 실패...");
          }
          this.close();
        });
          }
         
        }
      });
      
    }
  }
};
</script>
<style>
.events-day {
  min-height: 100px !important;
}
</style>
