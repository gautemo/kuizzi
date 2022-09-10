<script setup lang="ts">
import HeaderComponent from './shared/HeaderComponent.vue'
let bgcolor = 1
setInterval(() => {
  bgcolor++
  if (bgcolor > 5) bgcolor = 1
  document.documentElement.style.setProperty('--bg', `var(--pastel${bgcolor})`)
}, 15 * 1000)
</script>

<template>
  <HeaderComponent />
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto+Flex&display=swap');

:root {
  --pastel1: #caffd0;
  --pastel2: #c9e4e7;
  --pastel3: #b4a0e5;
  --pastel4: #faa4bd;
  --pastel5: #c6d2ed;
  --bg: var(--pastel1);

  --red: #f4303c;
  --blue: #0a65d3;
  --yellow: #df9900;
  --green: #227e0a;

  --primary: rgb(127, 176, 235);
  --primary-focus: rgb(107, 164, 234);
  --danger: rgb(247, 138, 138);
  --warning: rgb(224, 219, 125);
  --success: rgb(129, 229, 113);
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
  background-color: var(--primary);
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled),
button:focus:not(:disabled) {
  background-color: var(--primary-focus);
}

button.secondary {
  background-color: rgb(214, 214, 214);
}

button.secondary:hover:not(:disabled),
button.secondary:focus:not(:disabled) {
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

main {
  margin: 20px;
}
</style>
