<template>
    <div>
        <v-hover>
            <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                
                
            >
                <v-img
                :aspect-ratio="16/9"
                :src="imgSrc"
                ></v-img>
                <v-card-title>
                    <div>
                        <div class="headline">{{title}}</div>
                        <div class="d-flex" >
                            <div class="ml-2 grey--text text--darken-2">
                                <span >{{content}}</span>
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
        id : {type:String},
        title: {type: String},
        content: {type: String},
        imgSrc: { type: String },
    },
    data() {
        return {
            //
        }
    }
  }
</script>

<style>
  .cardBody {
    white-space: nowrap;
    overflow: hidden!important;
    text-overflow: ellipsis!important;
    display: -webkit-box;
    line-height: 17px;     /* fallback */
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

</style>