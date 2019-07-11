<template>
  <div>
      <div></div>
  </div>
</template>

<script>

export default {
  name: "GitGraph",
  data() {
    return {
        commits :[]
    };
  },
  methods:{
    getCommits(){
        fetch("https://lab.ssafy.com/api/v4/projects/6111/repository/commits?private_token=fwjHN_fSR1p_Pk6tcCJq")
        .then(response => response.json())
        .then(success => {
          this.commits = success;
          console.log(this.commits);
        })
        .catch();
    },
    preProcessData(){
        
    }

  },
  mounted(){
      
  }
};
</script>
