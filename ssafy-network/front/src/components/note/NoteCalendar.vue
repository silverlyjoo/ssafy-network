<template>
  <v-layout column>
    <v-flex align-center width="100%">
      <CalendarForm :today="today"></CalendarForm>
    </v-flex>
    <v-flex align-center class="">
      <Calendar :events="events" >
      </Calendar>
    </v-flex>
  </v-layout>
</template>

<script>
import Calendar from "@/components/note/Calendar.vue";
import CalendarForm from "@/components/note/CalendarForm.vue";
import {mapState} from "vuex";

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
      events: []
    };
  },
  methods: {
    
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
      this.month = mm;
      if (mm < 10) {
        mm = "0" + mm;
      }
      this.today = yyyy + "-" + mm + "-" + dd;
    },
    prevMonth() {
      this.$refs.calendar.prev();
    },
    nextMonth() {
      this.$refs.calendar.next();
    },
    getCalendar(){
      // 값 가져오기
      fetch(this.$store.state.dbserver + "/calendars/"+this.$session.get("id")+"/"+this.$session.get("token"),{
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data => {
        this.events = data;
      })
    }
  },
  mounted() {
    this.getDay();
    this.getCalendar();
  },computed: mapState(['CalendarCheck']),
  watch: {
    CalendarCheck(to,from){
      if(from == false && to == true){
        this.$store.state.CalendarCheck = false;
        this.getCalendar();
      }
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
