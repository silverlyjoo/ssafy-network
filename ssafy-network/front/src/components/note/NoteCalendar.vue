<template>
  <v-layout column>
    <!-- <v-flex align-self-center class="mt-4" row wrap d-flex style="width:80%;">
        <v-flex align-self-center>
          <h2 style="color:blue;">{{this.focusYear}}년</h2>
        </v-flex>
        <v-flex align-self-center class="pa-2">
          <v-btn fab text small @click="prevMonth">
            &nbsp;
            <v-icon small>arrow_back_ios</v-icon>
          </v-btn>
        </v-flex>
        <v-flex align-self-center class="pa-2">
          <h1>{{this.focusMonth}}월</h1>
        </v-flex>
        <v-flex align-self-center class="pa-2">
          <v-btn fab text small @click="nextMonth">
            <v-icon small>arrow_forward_ios</v-icon>
          </v-btn>
        </v-flex>
    </v-flex>-->
    <v-flex align-center class="ma-3">
      <Calendar :events="events" @eventClick="eventClick">
      </Calendar>
    </v-flex>
    <v-flex align-center width="100%">
      <CalendarForm :today="today"></CalendarForm>
    </v-flex>
  </v-layout>
</template>

<script>
import Calendar from "@/components/note/Calendar.vue";
import CalendarForm from "@/components/note/CalendarForm.vue";

export default {
  name: "NoteCalendar",
  components: {
    Calendar,
    CalendarForm
  },
  data() {
    return {
      today: "",
      month: "",
      focus: "",
      focusMonth: "",
      focusYear: "",
      events: [
        {
          title: "event1",
          start: "2019-07-09",
          cssClass: "blue"
        },
        {
          title: "event2",
          start: "2019-07-08",
          end: "2019-07-13",
          cssClass: "red"
        }
      ]
    };
  },
  methods: {
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    open(event) {
      alert(event.title);
    },
    getDay() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      this.focusYear = yyyy;
      this.month = mm;
      this.focusMonth = this.month;
      if (mm < 10) {
        mm = "0" + mm;
      }
      this.today = yyyy + "-" + mm + "-" + dd;
      this.focus = this.today;
    },
    prevMonth() {
      this.$refs.calendar.prev();
    },
    nextMonth() {
      this.$refs.calendar.next();
    }
  },
  mounted() {
    this.getDay();
  },
  watch: {
    focus(to, from) {
      var day = new Date(this.focus);
      this.focusMonth = day.getMonth() + 1;
      this.focusYear = day.getFullYear();
    }
  }
};
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
