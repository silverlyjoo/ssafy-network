<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <!-- Portfolio -->
      <v-layout row wrap>
        <v-flex xs12>
          <div class="display-3 font-weight-bold" >Portfolio</div>
          <v-btn color="dark" to='/portfoliowriter' class="px-0">새 글 쓰기</v-btn>
          <PortfolioList :limits="6" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioList from '@/components/Portfolio/PortfolioList'
import FirebaseService from '@/services/FirebaseService';

export default {
	name: 'PortfolioPage',
	components: {
        PortfolioList,
  },
  mounted() {
		FirebaseService.SendLog("PortfolioPage");
	}
}
</script>