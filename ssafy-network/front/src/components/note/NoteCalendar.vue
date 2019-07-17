<template>
    <v-layout column>
      <v-flex align-self-center class="ma-5" row wrap d-flex style="width:80%;">
        <v-flex align-self-center>
          <h2 style="color:blue;">{{this.focusYear}}년</h2>
        </v-flex>
        <v-flex align-self-center class="pa-2">
          <v-btn fab text small @click="prevMonth">
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
      </v-flex>
      <v-flex align-center >
        <v-sheet height="500px">
          <v-calendar v-model="focus" :value="today" color="primary" ref="calendar">
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      :key="event.title"
                      v-on="on"
                      v-html="event.title"
                    ></div>
                  </template>
                  <v-card color="grey lighten-4" min-width="350px" flat>
                    <v-toolbar color="primary" dark>
                      <v-btn icon>
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="event.title"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>favorite</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.details"></span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat color="secondary">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      today: "",
      month: "",
      focus: "",
      focusMonth: "",
      focusYear: "",
      events: [
        {
          title: "Vacation",
          details: "Going to the beach!",
          date: "2019-07-15",
          open: false
        },
        {
          title: "Vacation",
          details: "Going to the beach!",
          date: "2019-07-14",
          open: false
        },
        {
          title: "Vacation",
          details: "Going to the beach!",
          date: "2019-07-13",
          open: false
        },
        {
          title: "Meeting",
          details: "Spending time on how we do not have enough time",
          date: "2019-07-12",
          open: false
        },
        {
          title: "30th Birthday",
          details: "Celebrate responsibly",
          date: "2019-07-11",
          open: false
        },
        {
          title: "New Year",
          details: "Eat chocolate until you pass out",
          date: "2019-07-10",
          open: false
        },
        {
          title: "Conference",
          details:
            "Mute myself the whole time and wonder why I am on this call",
          date: "2019-07-09",
          open: false
        },
        {
          title: "Hackathon",
          details: "Code like there is no tommorrow",
          date: "2019-07-25",
          open: false
        }
      ]
    };
  },
  computed: {
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
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
