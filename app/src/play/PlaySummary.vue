<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue'
import { Player } from '../shared/types'
import { sum } from '../shared/utils';

const suffixes = {
  zero: '',
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
  many: '',
}

const pr = new Intl.PluralRules('en-US', {
  type: 'ordinal',
})

const players = inject('players') as ComputedRef<Player[]>
const player = inject('player') as ComputedRef<Player>

const place = computed(() => {
  const position = players.value.filter(p => sum(p.points) > sum(player.value.points)).length + 1
  return `${position}${suffixes[pr.select(position)]}`
})
</script>

<template>
  <p>{{ place }} of {{ players.length }} players with a total of {{ sum(player.points) }} points</p>
</template>

<style scoped>
p {
  padding: 10px 15px;
  background: white;
  border-radius: 5px;
  margin: auto 50px 5px 50px;
}
</style>
