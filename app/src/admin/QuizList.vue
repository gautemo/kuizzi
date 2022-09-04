<script setup lang="ts">
import { router } from '../router'
import { user } from './firebaseAuth'
import { createQuiz, getQuizzes } from './firebaseGames'

async function createQuizAndgoToPage() {
  const id = await createQuiz(user.value!.uid)
  router.push(`/my-games/${id}`)
}

const quizzes = await getQuizzes()
</script>

<template>
  <main>
    <button @click="createQuizAndgoToPage">Create New Game</button>
    <ul>
      <li v-for="quiz of quizzes" :key="quiz.id">
        <span>{{ quiz.name }}</span>
        <button @click="router.push(`/my-games/${quiz.id}`)">Edit</button>
        <button>Play</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  max-width: 550px;
}

li {
  margin-top: 10px;
  padding-bottom: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
}

li > span {
  flex: 1;
}

li:not(:last-child) {
  border-bottom: 1px solid #333;
}
</style>
