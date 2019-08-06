<template>

  <v-container justify-center xs10 sm8 class="my-5">
    
    <v-timeline>
      <v-timeline-item color="red lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/joo.png')" style="width:30%"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">박성주</v-card-title>
          <v-card-text>Python으로 개발에 입문해서 지금은 Front-end 에 관심을 갖고 Vue.js 를 공부하고 있습니다. Django로 REST-api 를 구현할 수 있으며, 계속 공부하면서 발전하는 개발자가 되고 싶습니다. 현재 맡은 역할은 놀고먹고잠자기 입니다.</v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="orange lighten-2" large>
        <template v-slot:opposite>
          <v-img :src="require('@/views/Home/min.png')" style="width:30%; margin-left:67%;"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">박성민</v-card-title>
          <v-card-text>WM에서 Front-End 를 담당하고 있습니다. 현재 JavaScript, Vue.js 를 공부중이며, 적용하고 있습니다. 모르는 것이 있으면, 인정하고 고치려고 하는 개발자입니다. 잘 부탁드립니다.</v-card-text>
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
          <v-card-text>Back 담당, 팀 내 깐족거림 담당 , 이광수만큼 말이 많음... ,  </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="blue lighten-2" large >
        <template v-slot:opposite  >
          <v-img :src="require('@/views/Home/in.png')" style="width:28%"> </v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">문혜인</v-card-title>
          <v-card-text>삼일 회계 법인에서 맛있는 커피를 무료로 마시는게 너무 행복합니다. 다만 회사 내부에 맛집이 많아서 점심시간에 환장하겠습니다. 뭘 먹어야 할지 모르겠거든요. </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
 