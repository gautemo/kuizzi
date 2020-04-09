<template>
  <div>
    {{now}}
  </div>
</template>

<script>
import { computed, onUnmounted, ref } from 'vue';

export default {
  props: {
    from: Number,
  },
  setup({from}, {emit}){
    const now = ref(from)
  
    const interval = setInterval(() => {
      now.value--;
      if(now.value === 0){
        emit('done');
      }
    }, 1000);

    onUnmounted(() => clearInterval(interval))

    return { now }
  }
}
</script>

<style scoped>
div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>