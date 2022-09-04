<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getEmailState, signInEmailAndPassword, createAccount, resetPassword } from './firebaseAuth'

const email = ref('')
const password = ref('')

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()
async function save() {
  if (!email.value || !password.value) return
  const toPath = route.redirectedFrom?.path ?? '/my-games'
  if (emailState.value === 'has_password') {
    await signInEmailAndPassword(email.value, password.value, toPath)
  } else {
    await createAccount(email.value, password.value, toPath)
  }
}

async function next() {
  if (!email.value) return null
  return getEmailState(email.value)
}

const {
  state: emailState,
  isLoading: emailStateIsLoading,
  execute: executeEmailState,
  error: emailError,
} = useAsyncState(next, null, { immediate: false })
const { isLoading: saveIsLoading, execute: executeSave, error: saveError } = useAsyncState(save, null, { immediate: false })

const error = computed(() => {
  if (!emailError.value && !saveError.value) return null
  if (emailError.value instanceof Error) return emailError.value
  if (saveError.value instanceof Error) return saveError.value
  return new Error('unknown error')
})

const doneReset = ref(false)
async function resetEmailPassword() {
  await resetPassword(email.value)
  doneReset.value = true
}
</script>

<template>
  <Teleport v-if="emailState === 'not_user'" to="#sign-in-header">Create account</Teleport>
  <Teleport v-else-if="emailState === 'no_password'" to="#sign-in-header">Create password</Teleport>
  <Teleport v-else to="#sign-in-header">Sign in</Teleport>
  <label>
    <span>Email</span>
    <input type="email" v-model="email" @keyup.enter="executeEmailState()" :disabled="emailState !== null" />
  </label>
  <label v-if="emailState !== null">
    <span>Password</span>
    <input type="password" v-model="password" @keyup.enter="executeSave()" />
  </label>
  <span class="loader" v-if="emailStateIsLoading || saveIsLoading"></span>
  <p class="error" v-if="error">{{ error.message }}</p>
  <section>
    <div>
      <button @click="emit('close')" class="secondary">Close</button>
      <button
        v-if="emailState === 'has_password'"
        @click="resetEmailPassword"
        class="secondary"
        :class="{ donereset: doneReset }"
        :disabled="doneReset"
      >
        <span v-if="doneReset">Reset password email sent</span>
        <span v-else>Reset password</span>
      </button>
    </div>
    <button @click="executeEmailState()" :disabled="!email" v-if="emailState === null">Next</button>
    <button @click="executeSave()" :disabled="!password" v-else>Save</button>
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

.error {
  width: 100%;
}

.secondary {
  margin-right: 5px;
}

.donereset {
  background-color: rgb(129, 229, 113);
}
</style>
