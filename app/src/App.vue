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
@import url('https://fonts.bunny.net/css2?family=Audiowide&family=Oswald:wght@500&display=swap');

:root {
  --pastel1: #caffd0;
  --pastel2: #c9e4e7;
  --pastel3: #b4a0e5;
  --pastel4: #faa4bd;
  --pastel5: #c6d2ed;
  --bg: var(--pastel1);

  --red: #ba020b;
  --blue: #1328c2;
  --yellow: #c49500;
  --green: #00ad2b;

  --primary: #7fb0eb;
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
  font-family: 'Oswald', sans-serif;
  background-color: var(--bg);
  transition: background-color 7s ease-in-out;
}

#app {
  display: grid;
  grid-template-rows: auto 1fr;
}

main {
  padding: 20px;
}

@media (max-width: 750px) {
  main {
    padding: 5px;
  }
}

.fancy {
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
  background: none;
  border: 2px solid #000;
  padding: 3px 15px;
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled, .fancy, .a, .b, .c, .d),
button:focus:not(:disabled, .fancy, .a, .b, .c, .d) {
  background-color: var(--primary);
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

label.fancy {
  position: relative;
}

label.fancy input {
  font-size: 1.3em;
  margin-top: 50px;
  padding: 5px;
  box-sizing: border-box;
  font-family: inherit;
}

label.fancy input + span {
  font-size: 1.3em;
  position: absolute;
  top: 0;
  left: 5px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  cursor: text;
}

label.fancy input:focus + span,
label.fancy input + span.active {
  opacity: 1;
  transform: translate(-5px, calc(-1.3em - 15px));
}

button.fancy {
  display: block;
  font-size: 1.5em;
  margin: 15px auto;
  background: #333;
  color: white;
  box-shadow: inset 0px 45px 0px -30px #666666ce;
  padding: 10px;
  border: 1px solid rgb(161, 161, 161);
}

button.fancy:disabled {
  opacity: 0.7;
}
</style>
