<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { signInEmailLink } from './firebaseAuth'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const email = ref('')
const route = useRoute()

async function signIn() {
  if (!email.value) return
  await signInEmailLink(email.value, route.redirectedFrom?.path ?? '/my-games')
}

const { isReady, isLoading, execute, error: e } = useAsyncState(signIn, null, { immediate: false })
const error = computed(() => {
  if (!e.value) return null
  if (e.value instanceof Error) return e.value
  return new Error('unkown error')
})
</script>

<template>
  <label>
    <span>Email</span>
    <input type="email" v-model="email" @keyup.enter="execute()" />
  </label>
  <span class="loader" v-if="isLoading"></span>
  <p class="error" v-if="error">{{ error.message }}</p>
  <p class="success" v-if="isReady">We sent you an email with your login link</p>
  <section>
    <button @click="emit('close')" class="secondary">Close</button>
    <button @click="execute()" :disabled="!email">Get login link</button>
  </section>
</template>

<style scoped>
label {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
  font-size: 1rem;
}

label > span {
  min-width: 75px;
}

input {
  flex: 1;
  padding: 5px;
  font-size: 1rem;
}

section {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.success,
.error {
  width: 100%;
}
</style>
