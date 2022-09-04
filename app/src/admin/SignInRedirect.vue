<script setup lang="ts">
import { userIsSignedIn } from '../firebase';
import { useRoute } from 'vue-router'
import { router } from '../router';
import { useStorage } from '@vueuse/core'

const route = useRoute()
const redirectTo = useStorage<string>('redirect-to', null)
if(route.redirectedFrom?.path){
  redirectTo.value = route.redirectedFrom.path
}

const isSignedIn = await userIsSignedIn()
if(isSignedIn){
  router.push(redirectTo.value ?? '/my-games')
}
</script>

<template>
  <slot></slot>
</template>
