<script setup lang="ts">
import { ComputedRef, inject } from 'vue';
import { Player } from './types';
import UserIcon from './UserIcon.vue';

const players = inject('players') as ComputedRef<Player[]>
</script>

<template>
  <section>
    <slot></slot>
    <h4>Players</h4>
    <ul>
      <li v-for="player in players" :key="player.id">
        <UserIcon :icon="player.icon" :color="player.color" />
        <span>{{player.name}}</span>
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