<template>
  <header>
    <router-link to="/" class="fancyfont">Kuizzi</router-link>
    <div id="topright"></div>
  </header>
</template>

<style scoped>
header {
  padding: 10px 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
}

a {
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
}

#topright {
  grid-column: -1;
}
</style>
