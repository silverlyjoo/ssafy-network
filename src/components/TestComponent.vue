<template>
  <div class="test">
    <h1>Test</h1>
      <h1>{{ data[0].title }}</h1>
      <h5>{{ data[0].body }}</h5>
  </div>
</template>


<script>
import FirebaseService from "../services/FirebaseService";

export default {
  name: 'TestComponent',
  data(){
    return {
      data:[]
    };
  },mounted(){
    this.getData();
  },methods:{
    async getData(){
      this.data = await FirebaseService.getData();
    }
  }
}
</script>