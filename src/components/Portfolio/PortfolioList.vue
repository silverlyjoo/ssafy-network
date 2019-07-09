<template>
  <v-layout mt-5 wrap>
    <v-flex v-for="i in portfolios.length > limits ? limits : portfolios.length"  xs12 sm6 md4>
      <router-link :to='{ name: "portfoliodetail", params: { id : portfolios[i-1].id ,title:portfolios[i - 1].data.title,
          content:portfolios[i - 1].data.content,
          imgSrc:portfolios[i - 1].data.image }}' style="text-decoration:none!important">

        <Portfolio class="ma-3"
              :title="portfolios[i - 1].data.title"
              :content="portfolios[i - 1].data.content"
			  :imgSrc="portfolios[i - 1].data.image"
        ></Portfolio>
      </router-link>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePortfolios"><v-icon size="25" class="mr-2">fa-plus</v-icon> 더 보기</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolio from '@/components/Portfolio/Portfolio'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PortfoliosList',


	data : function() {
		return {
			portfolios: []
		}
	},
	components: {
		Portfolio,
	},
	mounted() {
		this.getPortfolios()
		window.addEventListener("resize", this.changeLimits)
	},
	methods: {
		async getPortfolios() {
			this.portfolios = await FirebaseService.getData()
		},
		loadMorePortfolios() {
			
		},
		changeLimits : function() {
			const size = screen.width
			if ( size <= 600 ) {
				this.limits = 4
			} else if ( size > 600) {
				this.limits = 3
			}
	}
	},
}
</script>
<style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
</style>
