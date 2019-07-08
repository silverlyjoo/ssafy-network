<template>
  <div>
    <TestComponent></TestComponent>
    <PortfolioList></PortfolioList>
  </div>
</template>

<script>
import TestComponent from "@/components/TestComponent.vue";
import PortfolioList from "@/components/Portfolio/PortfolioList.vue";

export default {
  name: "Home",
  components: {
    TestComponent,
    PortfolioList,
  }
};
</script>
