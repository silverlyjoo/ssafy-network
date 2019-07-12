<template>
  <div>
    <div >
      <apexchart id="chart" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>

export default {
  name: "GitGraph",
  props:{
      repoId:{type:String}
  },
  data() {
    return {
      commits: [],
      chartOptions: {
          plotOptions: {
    bar: {
        distributed: true
    }
  },
        xaxis: {
        categories: []
      }
      },
      series: [{
          name:'commit 수',
          data :[]
      }]
    };
  },
  methods: {
    getCommits() {
      //https://lab.ssafy.com/api/v4/projects/6067/repository/commits?per_page=1000&private_token=fwjHN_fSR1p_Pk6tcCJq&all=true
      fetch(
        "https://lab.ssafy.com/api/v4/projects/"+this.repoId+"/repository/commits?private_token="+this.$store.state.private_token+"&all=true&per_page=1000&"
      )
        .then(response => response.json())
        .then(success => {
          this.commits = success;
          this.preProcessData();
        })
        .catch();
    },
    preProcessData() {
      var commitdata = {};
      for (var i = 0; i < this.commits.length; i++) {
        var commitName = this.commits[i].committer_email;
        var date = this.commits[i].created_at;
        if (!commitdata.hasOwnProperty(commitName)) {
          commitdata[commitName] = [date];
        } else {
          commitdata[commitName].push(date);
        }
      }
      var keys = Object.keys(commitdata);
      for (var j in keys) {
        this.series[0]["data"].push(commitdata[keys[j]].length);
        this.chartOptions.xaxis.categories.push(keys[j]);
      }
    }
  },
  mounted() {
    this.getCommits();
  }
};
</script>
<style>
#chart{
    margin: 10px auto;
}
</style>
