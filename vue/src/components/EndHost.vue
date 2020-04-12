<template>
  <div class="container">
    <h1 :class="{hide: !show1}" v-if="scores.length >= 1">
      <span class="icon">🏆</span>
      <Portrait :icon="scores[0].icon" :color="scores[0].color" size="80"/>
      <span class="name">{{scores[0].name}}</span> - 
      <span>{{scores[0].score}}</span>
    </h1>
    <h2 :class="{hide: !show2}" v-if="scores.length >= 2">
      <span class="icon">🥈</span>
      <Portrait :icon="scores[1].icon" :color="scores[1].color" size="70"/>
      <span class="name">{{scores[1].name}}</span> - 
      <span>{{scores[1].score}}</span>
    </h2>
    <h3 :class="{hide: !show3}" v-if="scores.length >= 3">
      <span class="icon">🥉</span>
      <Portrait :icon="scores[2].icon" :color="scores[2].color" size="60"/>
      <span class="name">{{scores[2].name}}</span> - 
      <span>{{scores[2].score}}</span>
    </h3>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { scores } from '@/utils/game'
import Portrait from '@/components/Portrait'

export default {
  setup(){
    const show1 = ref(false)
    const show2 = ref(false)
    const show3 = ref(false)

    onMounted(() => {
      setTimeout(() => show1.value = true, 5000)
      setTimeout(() => show2.value = true, 3000)
      setTimeout(() => show3.value = true, 1000)
    })

    return { show1, show2, show3, scores }
  },
  components: { Portrait }
}
</script>

<style scoped>
.hide{
  opacity: 0;
}

h1, h2, h3{
  transition: opacity 1.5s ease-in;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 20px;
  align-items: center;
}

.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
}

.icon{
  font-size: 2.5em;
}
</style>