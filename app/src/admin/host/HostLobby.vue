<script setup lang="ts">
import { ComputedRef, inject } from 'vue';
import { Game } from '../types';
import UserIcon from '../../shared/UserIcon.vue';

const game = inject('game') as ComputedRef<Game>
</script>

<template>
  <section>
    <slot></slot>
    <h4>Players</h4>
    <ul>
      <li v-for="player in game.players" :key="player.uid">
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
}
</style>