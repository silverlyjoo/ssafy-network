<template>
  <div>
    <v-container>
        <div>
            <h2 align-center>Portfolio</h2>
            <v-btn color="info" to='/portfoliowriter'>새 글 쓰기</v-btn>
        </div>
      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="6" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioList from '@/components/Portfolio/PortfolioList'

export default {
	name: 'PortfolioPage',
	components: {
        PortfolioList,
	},
}
</script>