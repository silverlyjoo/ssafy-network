<template>
  <v-footer style="height:50px" fixed>
    <v-spacer></v-spacer>
    <v-layout>
      <div>
        <p>&copy; {{ new Date().getFullYear() }}</p>
      </div>
      <div>
        <button type="button" @click="searchWeather">날씨정보</button>
      </div>
      <div v-if='view === true'>
        <p> : {{ country }}, {{ city }}, 습도 : {{ humidity }}% / 100%</p>
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
      country: '',
      city: '',
      humidity: '',
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
        this.country = result.data.sys.country
        this.city = result.data.name
        this.humidity = result.data.main.humidity
        this.view = true
      })
    }
  }
};
</script>

