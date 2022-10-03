<script setup lang="ts">
import { router } from '../../router'
import { createGame, createQuiz, getQuizzes } from '../firebaseGames'

async function createQuizAndGoToPage() {
  const id = await createQuiz()
  router.push(`/my-games/${id}`)
}

async function createGameAndGoToPage(quizId: string) {
  const id = await createGame(quizId)
  router.push(`/host/${id}`)
}

const quizzes = await getQuizzes()
</script>

<template>
  <main>
    <button @click="createQuizAndGoToPage">Create New Game</button>
    <ul>
      <li v-for="quiz of quizzes" :key="quiz.id">
        <span>{{ quiz.name }}</span>
        <button @click="router.push(`/my-games/${quiz.id}`)">Edit</button>
        <button @click="createGameAndGoToPage(quiz.id)" :disabled="quiz.questions.length === 0">Play</button>
      </li>
    </ul>
  </main>
  <footer>
    <i>Created by Gaute Meek Olsen</i>
    <a href="https://twitter.com/GauteMeekOlsen" target="_blank" rel="noopener">
      <div class="i-logos-twitter" title="Twitter"></div>
    </a>
    <a href="https://gaute.dev" target="_blank" rel="noopener">
      <div class="i-ic-baseline-link icon" title="https://gaute.dev"></div>
    </a>
    <a href="mailto:gautedevelopment@gmail.com">
      <div class="i-ic-baseline-email icon" title="gautedevelopment@gmail.com"></div>
    </a>
  </footer>
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

footer {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding: 5px;
  font-size: 0.85rem;
}

footer a {
  font-size: 1.2rem;
}

.icon {
  background-color: #333;
}
</style>
