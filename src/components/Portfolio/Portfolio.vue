<template>
  <div>
    <v-hover>
      <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
        <v-img :aspect-ratio="16/9" :src="imgSrc"></v-img>
        <v-card-title>
          <div>
            <div class="headline title">{{title}}</div>
            <!-- <div class="d-flex"> -->
            <span class="grey--text content">{{content}}</span>
              <!-- </div> -->
            <!-- </div> -->
          </div>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    id: { type: String },
    title: { type: String },
    content: { type: String },
    imgSrc: { type: String }
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
.title {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	line-height: 17px;     /* fallback */
	max-height: 70px;      /* fallback */
	-webkit-line-clamp: 1; /* number of lines to show */
	-webkit-box-orient: vertical;
}

.content {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	line-height: 17px;     /* fallback */
	max-height: 70px;      /* fallback */
	-webkit-line-clamp: 4; /* number of lines to show */
	-webkit-box-orient: vertical;
}
</style>