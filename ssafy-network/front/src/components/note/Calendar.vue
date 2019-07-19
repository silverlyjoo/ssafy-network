<template>
  <full-calendar :events="events" @eventClick="eventClick" @dateClick="dateClick"></full-calendar>
</template>
<script>
import FullCalendar from "vue-fullcalendar";

export default {
  name: "Calendar",
  props: ["events"],
  components: {
    FullCalendar
  },
  methods:{
    dateClick(arg){
      alert(arg.date);
    },
    eventClick(event, jsEvent, pos) {
      console.log(event.start); console.log(event.end);
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
