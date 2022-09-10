<script setup lang="ts">
import { getUser } from '../firebase';
import { signUserOut } from './firebaseAuth'
const user = getUser()
</script>

<template>
  <Teleport to="#topright">
    <div class="right">
      <router-link to="/my-games" class="my-games fancy">My Games</router-link>
      <span>{{ user.displayName ?? user.email }}</span>
      <button @click="signUserOut" class="secondary">Sign out</button>
    </div>
  </Teleport>
  <slot></slot>
</template>

<style scoped>
.right {
  display: flex;
  align-items: center;
  gap: 25px;
}
</style>
