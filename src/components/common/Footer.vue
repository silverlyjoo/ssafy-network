<template>
  <v-footer style="height:50px" fixed>
    <v-spacer></v-spacer>
    <v-layout>
      <div>
        <p>&copy; {{ new Date().getFullYear() }}</p>
      </div>
      <!-- <div>
        <button type="button" @click="searchWeather">날씨정보</button>
      </div> -->
      <!-- <div v-if='view === true'> -->
        <p v-if='view === true'>Korea, Daejeon, 온도 : {{ temp }}, 최고기온 : {{ temp_max }}, 최저기온 : {{ temp_min }}, 습도 : {{ humidity }}% / 100%</p>
      <!-- </div> -->
    </v-layout>
  </v-footer>
</template>


<script>
export default {
  name: "Footer",
  data() {
    return {
      view: false,
      temp: '',
      humidity: '',
      temp_min: '',
      temp_max: ''
    }
  },
  computed: {
    hasResult: function() {
      return this.posts.length > 0
    }
  },
  methods: {
    searchWeather() {
      const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?id=1835224&APPID=34ff1ba374461a14a1cc51a86cf24b36"
      axios.get (`${BASE_URL}`)
      .then( (result) => {
        console.log(result)
        this.temp = result.data.main.temp - 273.15
        this.humidity = result.data.main.humidity
        this.temp_min = result.data.main.temp_min
        this.temp_max = result.data.main.temp_max
        this.view = true
      })
    }
  }
};
</script>

