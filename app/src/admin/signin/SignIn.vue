<script setup lang="ts">
import SignInRedirect from './SignInRedirect.vue'
import SuspenseLoader from '../../shared/SuspenseLoader.vue'
import { ref } from 'vue'
import SignInEmailPassword from './SignInEmailPassword.vue'
import SignInEmailLink from './SignInEmailLink.vue'
import { signInGoogle } from '../firebaseAuth'

const type = ref<'email_password' | 'passwordless' | undefined>()
</script>

<template>
  <SuspenseLoader>
    <SignInRedirect>
      <main>
        <h1 id="sign-in-header">
          <span v-if="type !== 'email_password'">Sign in</span>
        </h1>
        <SignInEmailPassword v-if="type === 'email_password'" @close="type = undefined" />
        <SignInEmailLink v-else-if="type === 'passwordless'" @close="type = undefined" />
        <template v-else>
          <button @click="signInGoogle">
            <div class="i-logos-google-icon" />
            with Google
          </button>
          <button @click="type = 'email_password'">
            <div class="i-ic-round-mail" />
            with email & password
          </button>
          <button @click="type = 'passwordless'">
            <div class="i-ic-baseline-key-off" />
            with passwordless email link
          </button>
        </template>
      </main>
    </SignInRedirect>
  </SuspenseLoader>
</template>

<style scoped>
main {
  height: fit-content;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: 0.5rem;
  background-color: rgb(249, 249, 249);
  padding: 2rem 1rem;
  box-shadow: 0px 2px 5px 0px #333;
  width: 350px;
}

button {
  width: 300px;
  text-align: start;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

h1 {
  margin: 0.5rem 0;
}
</style>
