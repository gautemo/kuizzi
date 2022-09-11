<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const hideNav = computed(() => route.meta.hideNav)
</script>

<template>
  <header :class="{minimal: hideNav}">
    <router-link to="/" class="fancy" v-if="!hideNav">Kuizzi</router-link>
    <div id="topright"></div>
  </header>
</template>

<style scoped>
header {
  padding: 10px 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
}

.minimal {
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
}

#topright {
  grid-column: -1;
  display: flex;
  align-items: center;
  gap: 25px;
}
</style>
