<template>
  <v-layout row justify-end class="mr-3 mb-3">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn fab text small class="primary" v-on="on">
          <v-icon small>add</v-icon>
        </v-btn>
      </template>
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
                      label="종료 날짜"
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
</template>

<script>

export default {
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
        startDate: "",
        endDate: ""
      }
    };
  },
  mounted() {
    this.focus = this.today;
  }
};
</script>
<style>
.events-day{
    min-height: 100px!important;
}
</style>
