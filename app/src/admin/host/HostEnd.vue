<script setup lang="ts">
import { computed, ComputedRef, inject, onMounted, reactive } from 'vue'
import { Player } from '../../shared/types'
import UserIcon from '../../shared/UserIcon.vue'
import FireWorks from '../../shared/FireWorks.vue'
import { sum } from '../../shared/utils'

const players = inject('players') as ComputedRef<Player[]>
const sorted = computed(() => {
  return players.value.slice(0).sort((a, b) => sum(b.points) - sum(a.points))
})

const show = reactive({
  first: false,
  second: false,
  third: false,
  fullList: false,
})
onMounted(() => {
  setTimeout(() => (show.first = true), 5000)
  setTimeout(() => (show.second = true), 2500)
  setTimeout(() => (show.third = true), 1000)
})
</script>

<template>
  <div class="container">
    <h1 :class="{ hide: !show.first }" v-if="sorted.length >= 1">
      <span class="icon">🏆</span>
      <UserIcon :icon="sorted[0].icon" :color="sorted[0].color" :size="80" />
      <span class="name">{{ sorted[0].name }}</span> -
      <span>{{ sum(sorted[0].points) }}</span>
    </h1>
    <h2 :class="{ hide: !show.second }" v-if="sorted.length >= 2">
      <span class="icon">🥈</span>
      <UserIcon :icon="sorted[1].icon" :color="sorted[1].color" :size="70" />
      <span class="name">{{ sorted[1].name }}</span> -
      <span>{{ sum(sorted[1].points) }}</span>
    </h2>
    <h3 :class="{ hide: !show.third }" v-if="sorted.length >= 3">
      <span class="icon">🥉</span>
      <UserIcon :icon="sorted[2].icon" :color="sorted[2].color" :size="60" />
      <span class="name">{{ sorted[2].name }}</span> -
      <span>{{ sum(sorted[2].points) }}</span>
    </h3>
    <FireWorks size="5px" />
    <FireWorks v-if="show.first" size="12px" />
    <section v-if="show.first" class="full-list">
      <ol v-if="show.fullList">
        <li v-for="player of sorted" :key="player.id">
          <div>
            <UserIcon :icon="player.icon" :color="player.color" :size="40" />
            <span class="name">{{ player.name }}</span> -
            <span>{{ sum(player.points) }}</span>
          </div>
        </li>
      </ol>
      <button v-if="!show.fullList" @click="show.fullList = true">Show full list</button>
      <button v-else @click="show.fullList = false">Hide full list</button>
    </section>
  </div>
</template>

<style scoped>
.hide {
  opacity: 0;
}

h1,
h2,
h3 {
  transition: opacity 1.5s ease-in;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 20px;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.icon {
  font-size: 2.5em;
}

.full-list {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.full-list button {
  min-width: 125px;
}

.full-list ol {
  min-width: 200px;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: 75vh;
  overflow: auto;
}

.full-list li:not(:last-child) {
  margin-bottom: 10px;
}

.full-list li > div {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
