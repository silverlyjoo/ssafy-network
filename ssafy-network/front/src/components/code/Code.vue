<template>
<v-container>
  <div>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
  </v-container>
</template>

<script>
export default {
  name:"Code",
  data(){
    return {

    }
  },
  mounted(){
    alert("111");
  }
};
</script>
