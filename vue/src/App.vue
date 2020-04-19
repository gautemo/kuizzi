<template>
  <Suspense>
    <template #default>
      <router-view/>
    </template>
    <template #fallback>
      ...Loading
    </template>
  </Suspense>
</template>

<script>
let bgcolor = 1;
setInterval(() => {
  bgcolor++;
  if(bgcolor > 5) bgcolor = 1;
  document.documentElement.style.setProperty('--bg', `var(--pastel${bgcolor})`);
}, 15*1000);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Oswald:wght@500&display=swap');

:root{
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

body, html, #app{
  height: 100%;
}

body{
  margin: 0;
  font-family: 'Oswald', sans-serif;
  background-color: var(--bg);
  transition: background-color 7s ease-in-out;
}

.fancyfont{
  font-family: 'Audiowide', cursive;
}

button, input{
  font-family: inherit;
}
</style>
