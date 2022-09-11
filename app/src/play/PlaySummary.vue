<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue';
import { Player } from '../shared/types';

const suffixes = {
  'zero': '',
  'one': 'st',
  'two': 'nd',
  'few': 'rd',
  'other': 'th',
  'many': ''
}

const pr = new Intl.PluralRules('en-US', {
    type: 'ordinal'
})

const players = inject('players') as ComputedRef<Player[]>
const player = inject('player') as ComputedRef<Player>

const place = computed(() => {
  const position = players.value.filter(p => p.score < player.value.score).length +1
  return `${position}${suffixes[pr.select(position)]}`
})
</script>

<template>
  <section>
      <p>{{place}} of {{players.length}} players with a total of {{player.score}} points</p>
  </section>
</template>

<style scoped>
section{
  position: absolute;
  bottom: 20px;
  padding: 0 15px;
  background: white;
  border-radius: 5px;
  margin: 0 50px;
  left: 0;
  right: 0;
}

@media only screen and (max-width: 600px) {
  p{
    margin: 5px 0;
  }
}
</style>