<template>
  <main>
    <div v-for="i in 64" :key="i" :style="{background: randomColors[i-1]}" :class="{hide: reveal.includes(i)}"></div>
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
    const randomColors = [];
    for(let i = 0; i<64; i++){
      randomColors.push(`rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`);
    }

    const count = ref(0);
    const reveal = computed(() => revealOrder.slice(0, count.value))

    onMounted(() => {
      interval = setInterval(() => count.value++, 400);
    })

    onUnmounted(() => clearInterval(interval))

    return { randomColors, reveal }
  }
}
</script>

<style scoped>
main{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

div{
  transition: opacity 1s ease-in-out;
}

.hide{
  opacity: 0;
}
</style>