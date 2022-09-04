<script setup lang="ts">
import HeaderComponent from './shared/HeaderComponent.vue';
let bgcolor = 1;
setInterval(() => {
  bgcolor++;
  if (bgcolor > 5) bgcolor = 1;
  document.documentElement.style.setProperty('--bg', `var(--pastel${bgcolor})`);
}, 15 * 1000);  
</script>

<template>
  <HeaderComponent />
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto+Flex&display=swap');

:root {
  --pastel1: #CAFFD0;
  --pastel2: #C9E4E7;
  --pastel3: #B4A0E5;
  --pastel4: #FAA4BD;
  --pastel5: #C6D2ED;
  --bg: var(--pastel1);

  --red: #f4303c;
  --blue: #0a65d3;
  --yellow: #df9900;
  --green: #227e0a;
}

body,
html,
#app {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'Roboto Flex', sans-serif;
  background-color: var(--bg);
  transition: background-color 7s ease-in-out;
}

.fancyfont {
  font-family: 'Audiowide', cursive;
}

button,
input {
  font-family: inherit;
  font-size: 1rem;
}

.my-games {
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
}

.my-games:hover {
  text-decoration: underline;
}

button {
  border: none;
  padding: 8px 10px;
  background-color: rgb(127, 176, 235);
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: rgb(107, 164, 234);
}

button.secondary {
  background-color: rgb(214, 214, 214);
}

button.secondary:hover:not(:disabled) {
  background-color: rgb(193, 193, 193);
}

.loader {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 18px solid var(--green);
  border-right-color: var(--blue);
  border-bottom-color: var(--yellow);
  border-left-color: var(--red);
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
