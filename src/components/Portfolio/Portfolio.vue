<template>
    <div>
        <v-hover>
            <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                class="mx-auto"
                width="344"
            >
                <v-img
                :aspect-ratio="16/9"
                src="https://source.unsplash.com/random"
                ></v-img>
                <v-card-title>
                    <div>
                        <span class="headline">{{title}}</span>
                        <div class="d-flex">
                            <v-rating
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                            ></v-rating>
                            <div class="ml-2 grey--text text--darken-2">
                                <span>{{body}}</span>
                            </div>
                        </div>
                    </div>
                <v-spacer></v-spacer>
                <v-btn icon class="mr-0">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
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
		imgSrc: {type: String}
    },
    data() {
        return {
            //
        }
    }
  }
</script>
