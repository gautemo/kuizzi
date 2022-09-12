<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue'
import { Player } from '../shared/types'
import FireWorks from '../shared/FireWorks.vue'
import PlaySummary from './PlaySummary.vue'
import FunnyGif from './FunnyGif.vue'
import { sum } from '../shared/utils'

const players = inject('players') as ComputedRef<Player[]>
const player = inject('player') as ComputedRef<Player>

const place = computed(() => {
  return players.value.filter(p => sum(p.points) < sum(player.value.points)).length
})
const gifType: { [key: number]: 'won' | 'close' } = {
  0: 'won',
  1: 'close',
  2: 'close',
}
</script>

<template>
  <h2>Thank you for playing!</h2>
  <div class="gif">
    <FunnyGif :type="gifType[place] ?? 'lost'" />
  </div>
  <PlaySummary />
  <FireWorks v-if="place === 0" size="10px" />
</template>

<style scoped>
h2 {
  text-align: center;
}

.gif {
  display: flex;
  justify-content: center;
  opacity: 0;
  animation: show 2s ease-in-out 3s forwards;
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
