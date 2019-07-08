<template>
    <div>
        <v-hover>
            <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                class="mx-auto"
                width="344"
            >
            <!-- 파이어베이스에 아직 이미지는 없어서 랜덤 이미지로 대체 -->
                <v-img
                :aspect-ratio="16/9"
                src="https://source.unsplash.com/random"
                ></v-img>
                <v-card-title>
                    <div>
                        <span class="headline">{{title}}</span>
                        <div class="d-flex">
                            <div class="ml-2 grey--text text--darken-2">
                                <span>{{body}}</span>
                            </div>
                        </div>
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
        title: {type: String},
		body: {type: String},
    },
    data() {
        return {
            //
        }
    }
  }
</script>