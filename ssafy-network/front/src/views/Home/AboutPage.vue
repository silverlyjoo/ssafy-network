<template>

  <v-container justify-center xs10 sm8 class="my-5">
    
    <v-timeline>
      <v-timeline-item color="red lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/joo.png')" style="width:30%"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">박성주</v-card-title>
          <v-card-text>Front 담당</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="orange lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/min.png')" style="width:30%; margin-left:67%;"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">박성민</v-card-title>
          <v-card-text>Front 담당</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="yellow lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/woo.png')" style="width:30%"> </v-img>
        </template>
        <v-card class="elevation-2" >
          <v-card-title class="headline">한명우</v-card-title>
          <v-card-text>Front 개발자 입니다... 열심히 공부해서 잘 할 수있는 개발자가 되도록 노력하겟습니다....<br/> Front와 Back 을 잘 연결되게 조정 하는 역할도 하고있습니다. <br/> 맡은 역할은 빵(먹을거)셔틀입니다.</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="green lighten-2" large>
        <template v-slot:opposite >
          <v-img :src="require('@/views/Home/tae.png')" style="width:35%; margin-left:63%;" > </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">김경태</v-card-title>
          <v-card-text>Back 담당</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="blue lighten-2" large >
        <template v-slot:opposite  >
          <v-img :src="require('@/views/Home/in.png')" style="width:28%"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">문혜인</v-card-title>
          <v-card-text>Front 담당</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
 