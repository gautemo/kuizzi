<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue';
import { Player } from './types';
import UserIcon from './UserIcon.vue';
import ScoreTween from './ScoreTween.vue';

const players = inject('players') as ComputedRef<Player[]>
const sorted = computed(() => {
  return players.value.slice(0).sort((a,b) => b.score - a.score)
})
</script>

<template>
  <h2>Scoreboard</h2>
  <section>
    <transition-group class="leaders" name="leaders" tag="ul">
      <li :class="{row: i < 5, rest: i>=5}" v-for="(player, i) in sorted" :key="player.id">
        <span v-if="i < 5">{{i+1}}</span>
        <UserIcon :icon="player.icon" :color="player.color" :size="40"/>
        <span v-if="i < 5" class="name">{{player.name}}</span>
        <ScoreTween v-if="i < 5" :add-score="player.addedScore" :score="player.score"/>
      </li>
    </transition-group>
  </section>
  <slot></slot>
</template>

<style scoped>
section {
  margin: 10px;
  padding: 10px;
  background: white;
  border-radius: 10px;
}

ul{
  padding: 0;
  list-style: none;
}

.row{
  display: grid;
  grid-template-columns: auto 40px 1fr auto;
  gap: 15px;
  align-items: center;
  margin: 5px;
  font-size: 1.2em;
}

.rest{
  display: inline-block;
  margin: 5px;
}

.leaders-move{
  transition: transform 5s;
}
</style>