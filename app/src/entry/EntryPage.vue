<script setup lang="ts">
import { ref } from 'vue'
import { router } from '../router'

const gamePin = ref('')
function enter() {
  if (gamePin.value) {
    router.push(`/play/${gamePin.value}`)
  }
}
</script>

<template>
  <Teleport to="#topright">
    <router-link to="/my-games" class="my-games fancyfont">My Games</router-link>
  </Teleport>
  <main>
    <h1>A quiz game for your friends!</h1>
    <label class="fancy">
      <input type="text" v-model="gamePin" maxlength="25" @keyup.enter="enter" autofocus />
      <span :class="{ active: gamePin }">Game PIN</span>
    </label>
    <button class="fancy" @click="enter" :disabled="!gamePin">Enter</button>
  </main>
</template>

<style scoped>
main {
  text-align: center;
}

input,
button {
  width: 200px;
  text-align: center;
}
</style>
