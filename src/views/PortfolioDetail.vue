<template>
  <div>
    <h2>Portfolio</h2>
    <v-container>
      <v-btn color="success" to='/portfoliowriter'>새 글 쓰기</v-btn>
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
	name: 'PortfolioDetail',
	components: {
        PortfolioList,
	},
}
</script>