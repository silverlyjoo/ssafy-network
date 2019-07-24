<template>
  <div>
    <full-calendar :events="events" @eventClick="eventClick" @dateClick="dateClick"></full-calendar>
    <v-layout row justify-end class="mr-3 mb-3">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">ToDo List 수정</span>
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
                    <v-date-picker v-model="event.startDate" @input="startDatePick = false"></v-date-picker>
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
                <v-flex>
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
            <v-btn color="blue darken-1" flat @click="dialog = false">취소</v-btn>
            <v-btn color="blue darken-1" flat @click="updateCalendar()">수정</v-btn>
            <v-btn color="blue darken-1" flat @click="deleteDialog = true">삭제</v-btn>
            <v-dialog v-model="deleteDialog" max-width="290">
              <v-card>
                <v-card-title class="headline">삭제 하시겠습니까?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click="deleteDialog = false">아니오</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click="deleteCalendar()">예</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import FullCalendar from "vue-fullcalendar";

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "Calendar",
  props: ["events"],
  components: {
    FullCalendar
  },
  data() {
    return {
      deleteDialog: false,
      dialog: false,
      startDatePick: false,
      endDatePick: false,
      event: {
        _id: "",
        title: "",
        desc: "",
        startDate: "",
        cssClass: "",
        endDate: ""
      },
      colors: [
        { text: "red" },
        { text: "yellow" },
        { text: "blue" },
        { text: "orange" },
        { text: "pink" }
      ]
    };
  },
  methods: {
    dateClick(arg) {
      alert(arg.date);
    },
    eventClick(event, jsEvent, pos) {
      this.dialog = true;
      this.event._id = event._id;
      this.event.title = event.title;
      this.event.desc = event.desc;
      this.event.startDate = event.start;
      this.event.cssClass = event.cssClass;
      this.event.endDate = event.end;
    },
    deleteCalendar() {
      fetch(this.$store.state.dbserver + "/calendars", {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.event._id,
          token: this.$session.get("token")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result == true) {
            alert("삭제 성공!!!");
            this.$store.state.CalendarCheck = true;
          } else {
            alert("성공 실패...");
          }
          this.event._id = "";
          this.event.title = "";
          this.event.desc ="";
          this.event.startDate = "";
          this.event.cssClass = "";
          this.event.endDate = "";
          this.deleteDialog = false;
          this.dialog = false;
        });
    },
    updateCalendar() {
      this.$validator.validateAll().then(res => {
        if (!res) {
          alert("값이 유효한지 체크해주세요.");
          return;
        } else {
          fetch(this.$store.state.dbserver + "/calendars", {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              _id: this.event._id,
              token: this.$session.get("token"),
              id: this.$session.get("id"),
              title: this.event.title,
              start: this.event.startDate,
              end: this.event.endDate,
              cssClass: this.event.cssClass,
              desc: this.event.desc
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.result == true) {
                alert("수정 성공!!!");
                this.$store.state.CalendarCheck = true;
              } else {
                alert("수정 실패...");
              }
              this.dialog = false;
              this.$validator.reset();
            });
        }
      });
    }
  }
};
</script>
<style>
.red {
  background: rgb(235, 77, 77) !important;
  color: whitesmoke !important;
}
.blue {
  background: rgb(59, 59, 163) !important;
  color: whitesmoke !important;
}
.orange {
  background: orange !important;
  color: white !important;
}
.green {
  background: rgb(49, 155, 49) !important;
  color: white !important;
}
.blue,
.orange,
.red,
.green {
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
}
.event-item {
  padding: 2px 0 2px 4px !important;
}
</style>
