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
    <router-link to="/my-games" class="my-games fancy">My Games</router-link>
  </Teleport>
  <main>
    <h1>A quiz game for your friends!</h1>
    <label class="fancy">
      <input type="text" v-model="gamePin" maxlength="25" @keyup.enter="enter" autofocus />
      <span :class="{ active: gamePin }">Game PIN</span>
    </label>
    <button class="fancy" @click="enter" :disabled="!gamePin">Enter</button>
  </main>
  <footer>
    <i>Created by Gaute Meek Olsen</i>
    <a href="https://twitter.com/GauteMeekOlsen" target="_blank" rel="noopener">
      <div class="i-logos-twitter" title="Twitter"></div>
    </a>
    <a href="https://gaute.dev" target="_blank" rel="noopener">
      <div class="i-ic-baseline-link icon" title="https://gaute.dev"></div>
    </a>
    <a href="mailto:gautedevelopment@gmail.com">
      <div class="i-ic-baseline-email icon" title="gautedevelopment@gmail.com"></div>
    </a>
  </footer>
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

footer {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding: 5px;
  font-size: 0.85rem;
}

footer a {
  font-size: 1.2rem;
}

.icon {
  background-color: #333;
}
</style>
