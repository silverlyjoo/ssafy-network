<template>

  <v-container  xs10 sm8 class="my-5">
    
    <v-timeline>
      <v-timeline-item color="red lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/joo.png')" style="width:30%"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">Park Seong-joo</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="orange lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/min.png')" style="width:30%; margin-left:67%;"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">Park Seong-min</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="yellow lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/woo.png')" style="width:30%"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">Han Myeong-woo</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="green lighten-2" large>
        <template v-slot:opposite >
          <v-img :src="require('@/views/Home/tae.png')" style="width:35%; margin-left:63%;" > </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">Kim Kyung-tae</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="blue lighten-2" large >
        <template v-slot:opposite  >
          <v-img :src="require('@/views/Home/in.png')" style="width:28%"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">Moon Hye-in</v-card-title>
          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
 