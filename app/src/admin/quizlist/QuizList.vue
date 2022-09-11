<script setup lang="ts">
import { router } from '../../router'
import { createGame, createQuiz, getQuizzes } from '../firebaseGames'

async function createQuizAndGoToPage() {
  const id = await createQuiz()
  router.push(`/my-games/${id}`)
}

async function createGameAndGoToPage(quizId: string){
  const id = await createGame(quizId)
  router.push(`/host/${id}`)
}

const quizzes = await getQuizzes()
</script>

<template>
  <main>
    <button class="primary" @click="createQuizAndGoToPage">Create New Game</button>
    <ul>
      <li v-for="quiz of quizzes" :key="quiz.id">
        <span>{{ quiz.name }}</span>
        <button class="primary" @click="router.push(`/my-games/${quiz.id}`)">Edit</button>
        <button class="primary" @click="createGameAndGoToPage(quiz.id)">Play</button>
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
  max-width: 600px;
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
  font-size: 1.15rem;
  font-weight: bold;
}

li:not(:last-child) {
  border-bottom: 1px solid #333;
}
</style>
