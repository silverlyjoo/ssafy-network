<template>
<div>
  <full-calendar :events="events" @eventClick="eventClick" @dateClick="dateClick"></full-calendar>
  <v-layout row justify-end class="mr-3 mb-3">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">ToDo List 추가</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap column>
              <v-flex xs12 sm6 md4>
                <v-text-field label="할일 제목" v-model="event.title" required></v-text-field>
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
                      label="시작 날짜"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="event.endDate" @input="endDatePick = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-textarea label="할일 내용" v-model="event.desc"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">취소</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">추가</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>
<script>
import FullCalendar from "vue-fullcalendar";

export default {
  name: "Calendar",
  props: ["events"],
  components: {
    FullCalendar
  },
  data(){
    return {
      dialog: false,
      startDatePick: false,
      endDatePick: false,
       event: {
        title: "",
        desc: "",
        startDate: "",
        endDate: ""
      }
    }
  },
  methods:{
    dateClick(arg){
      alert(arg.date);
    },
    eventClick(event, jsEvent, pos) {
      this.dialog = true;
      this.event.title = event.title;
      this.event.desc = event.desc;
      this.event.startDate = event.start;
      this.event.endDate = event.end;
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
