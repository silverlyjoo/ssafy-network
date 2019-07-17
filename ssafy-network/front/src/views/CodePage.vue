<template>
  <div>
    <CodeList></CodeList>
  </div>
</template>

<script>
import Code from '@/components/code/Code.vue';
import CodeList from '@/components/code/CodeList.vue';
import CodeWriter from '@/components/code/CodeWriter.vue';

export default {
  name:'CodePage',
  component: {
    Code,
    CodeList,
    CodeWriter,
  },
}
</script>
