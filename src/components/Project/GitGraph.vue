<template>
  <div>
      <div id="chart">
        <apexchart width="500" type="bubble" :options="chartOptions" :series="series"></apexchart>
       </div>
  </div>
</template>

<script>

export default {
  name: "GitGraph",
  data() {
    return {
        commits :[],
        commitName :[],
        chartOptions :[],
        series :[]
    };
  },
  methods:{
    getCommits(){
        //https://lab.ssafy.com/api/v4/projects/6111/repository/commits?per_page=1000&private_token=fwjHN_fSR1p_Pk6tcCJq&all=true
        fetch("https://lab.ssafy.com/api/v4/projects/6111/repository/commits?per_page=1000&private_token=fwjHN_fSR1p_Pk6tcCJq&all=true")
        .then(response => response.json())
        .then(success => {
          this.commits = success;
          console.log(this.commits);
          this.preProcessData();
        })
        .catch();
    },
    preProcessData(){
        var commitSet = new Set();
        for(var i = 0 ; i < this.commits.length;i++){
            commitSet.add(this.commits[i].committer_email);
        }
        this.commitName = commitSet;
    }

  },
  mounted(){
      this.getCommits();
  }
};
</script>
