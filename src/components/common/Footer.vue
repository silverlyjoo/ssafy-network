<template>
  <v-footer style="height:50px" fixed>
    <v-spacer></v-spacer>
    <v-layout>
      <div>
        <p class="my-3">&copy; {{ new Date().getFullYear() }}.07.08 ~ {{ new Date().getFullYear() }}.07.12
          &nbsp; &nbsp; &nbsp; &nbsp; Korea, Daejeon, 온도 : {{ temp }}, 최고기온 : {{ temp_max }}, 최저기온 : {{ temp_min }}, 습도 : {{ humidity }}% / 100%
          &nbsp; &nbsp; &nbsp; &nbsp; <a href="https://lab.ssafy.com/min/webmobile-sub2">Our Project</a>
        </p>
        
      </div>
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
  mounted() {
    this.searchWeather()
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
        this.temp = Math.round(result.data.main.temp - 273)
        this.humidity = result.data.main.humidity
        this.temp_min = Math.round(result.data.main.temp_min - 273)
        this.temp_max = Math.round(result.data.main.temp_max - 273)
        this.view = true
      })
    }
  }
};
</script>

