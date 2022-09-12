<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue'
import { Player } from './types'
import UserIcon from './UserIcon.vue'

const players = inject('players') as ComputedRef<Player[]>
const reverse = computed(() => players.value.slice(0).reverse())
</script>

<template>
  <section>
    <slot></slot>
    <h4>Players</h4>
    <ul>
      <li v-for="player in reverse" :key="player.id">
        <UserIcon :icon="player.icon" :color="player.color" />
        <span>{{ player.name }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  gap: 10px;
  justify-content: center;
  justify-items: center;
}

li {
  display: grid;
  place-items: center;
  font-size: 1.1rem;
}
</style>
