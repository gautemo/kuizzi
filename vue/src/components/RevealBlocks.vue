<template>
  <main>
    <div v-for="i in 64" :key="i" :style="{background: `rgb(${r()},${r()},${r()})`}" :class="{hide: reveal.includes(i)}"></div>
  </main>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const revealOrder = [37, 31, 43, 9, 7, 30, 12, 33, 39, 19, 25, 27, 29, 2, 15, 63, 44, 34, 8, 46, 4, 41, 54, 36, 18, 62, 56, 17, 28, 23, 64, 57, 11, 59, 14, 52, 42, 3, 47, 48, 10, 5, 38, 6, 1, 13, 49, 21, 50, 51, 16, 40, 45, 20, 22, 58, 24, 55, 61, 32, 35, 53, 26, 60];

let interval;

export default {
  setup(){
    const r = () => getRandomInt(255);

    const count = ref(0);
    const reveal = computed(() => revealOrder.slice(0, count.value))

    onMounted(() => {
      interval = setInterval(() => count.value++, 400);
    })

    onUnmounted(() => clearInterval(interval))

    return { r, reveal }
  }
}
</script>

<style scoped>
main{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: absolute;
  height: 100%;
  width: 100%;
}

div{
  background: red;
}

.hide{
  opacity: 0;
}
</style>