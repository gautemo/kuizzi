<template>
  <h2>Thank you for playing!</h2>
  <div class="gif">
    <Gif v-if="rank === 0" type="won"/>
    <Gif v-else-if="rank === 1 || rank === 2" type="close"/>
    <Gif v-else type="lost"/>
  </div>
  <Summary />
  <Fireworks v-if="rank === 0" size="10px" />
</template>

<script>
import Summary from '@/components/Summary'
import { computed } from 'vue';
import { scores } from '@/utils/game'
import { me } from '@/utils/player'
import Fireworks from '@/components/Fireworks'
import Gif from '@/components/Gif'

export default {
  setup(){
    const rank = computed(() =>  scores.value.findIndex(p => p.uid === me.uid))
    return { rank };
  },
  components: { Summary, Fireworks, Gif }
}
</script>

<style scoped>
h2{
  text-align: center;
}

.gif{
  display: flex;
  justify-content: center;
  opacity: 0;
  animation: show 2s ease-in-out 1s forwards;
}

@keyframes show {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>