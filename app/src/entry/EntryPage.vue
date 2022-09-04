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
    <label>
      <input type="text" v-model="gamePin" maxlength="25" @keyup.enter="enter" />
      <span :class="{ active: gamePin }" class="fancyfont">Game PIN</span>
    </label>
    <button class="fancyfont" @click="enter" :disabled="!gamePin">Enter</button>
  </main>
</template>

<style scoped>
main {
  text-align: center;
}

label {
  position: relative;
}

input + span {
  font-size: 1.3em;
  position: absolute;
  top: 0;
  left: 5px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  cursor: text;
}

input:focus + span,
input + span.active {
  opacity: 1;
  transform: translate(-5px, calc(-1.3em - 15px));
}

input {
  font-size: 1.3em;
  margin-top: 50px;
  padding: 5px;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
}

button {
  display: block;
  font-size: 1.5em;
  margin: 15px auto;
  background: #333;
  color: white;
  box-shadow: inset 0px 45px 0px -30px #666666ce;
  padding: 10px;
  border: 1px solid rgb(161, 161, 161);
}

input,
button {
  width: 200px;
}

button:disabled {
  opacity: 0.7;
}
</style>
