<script setup lang="ts">
import { getUser } from '../firebase'
import { signUserOut } from './firebaseAuth'
const user = getUser()
</script>

<template>
  <Teleport to="#topright">
    <router-link to="/my-games" class="my-games fancy">My Games</router-link>
    <span>{{ user.displayName ?? user.email }}</span>
    <button @click="signUserOut" class="secondary">Sign out</button>
  </Teleport>
  <slot></slot>
</template>
