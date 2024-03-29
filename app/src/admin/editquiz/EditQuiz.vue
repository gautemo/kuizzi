<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { computed, provide, reactive, ref } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { getQuiz, saveQuiz } from '../firebaseGames'
import EditQuestion from './EditQuestion.vue'
import AlertMessage from '../../shared/AlertMessage.vue'

const route = useRoute()
if (typeof route.params.id !== 'string') throw new Error('unknown id')
const quiz = reactive(await getQuiz(route.params.id))
provide('quiz', quiz)
const quizInDB = ref(JSON.stringify(quiz))

const images = ref<File[]>([])
provide('images', images)

const isChanged = computed(() => {
  return quizInDB.value !== JSON.stringify(quiz)
})

function addQuestion() {
  const id = Date.now()
  quiz.questions.push({
    id,
    text: 'The question?',
    img: null,
    a: '',
    b: '',
    c: '',
    d: '',
    correct: [],
    time: 20,
    isReveal: false,
  })
  expanded.value = id
}

const {
  isReady: saved,
  isLoading,
  execute: save,
  error: e,
} = useAsyncState(
  async () => {
    if (typeof route.params.id !== 'string') throw new Error('unknown id')
    await saveQuiz(route.params.id, quiz, images.value)
    quizInDB.value = JSON.stringify(quiz)
  },
  null,
  { immediate: false },
)
const error = computed(() => {
  if (!e.value) return null
  console.error(e.value)
  if (e.value instanceof Error) return e.value
  return new Error('unkown error')
})

onBeforeRouteLeave(() => {
  if (isChanged.value && !window.confirm('Leave without saving?')) {
    return false
  }
})

window.addEventListener('beforeunload', event => {
  if (isChanged.value) {
    event.preventDefault()
    event.returnValue = 'Leave without saving?'
    return 'Leave without saving?'
  }
})

const expanded = ref<number>()
function move(i: number, up: boolean) {
  quiz.questions.splice(up ? i - 1 : i + 1, 0, ...quiz.questions.splice(i, 1))
}
</script>

<template>
  <main>
    <label>
      <span>Quiz name: </span>
      <input type="text" v-model="quiz.name" maxlength="70" />
    </label>
    <ul>
      <li v-for="(question, i) in quiz.questions" :key="question.id">
        <div
          @click="expanded === question.id ? (expanded = undefined) : (expanded = question.id)"
          class="i-ic-round-play-arrow expand icon"
          :class="{ open: expanded === question.id }"
          title="expand"
        />
        <EditQuestion :index="i" :expanded="expanded === question.id" />
        <div :class="{ hide: i === 0 }" class="i-ic-round-arrow-upward icon" title="move up" @click="move(i, true)" />
        <div :class="{ hide: quiz.questions.length - 1 === i }" class="i-ic-round-arrow-downward icon" title="move down" @click="move(i, false)" />
        <button @click="quiz.questions.splice(i, 1)">Delete</button>
      </li>
    </ul>
    <section>
      <button @click="addQuestion">Add Question</button>
      <button :disabled="!isChanged" @click="save()">Save</button>
    </section>
    <span class="loader" v-if="isLoading"></span>
    <AlertMessage v-if="error" type="error" :message="error.message" :autofocus="true" />
    <AlertMessage v-if="saved && !isChanged" type="success" message="Saved" />
  </main>
</template>

<style scoped>
section {
  display: flex;
  gap: 5px;
}

.success,
.error {
  width: fit-content;
}

.loader {
  margin: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-top: 10px;
  padding-bottom: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  border: 1px solid transparent;
}

li:not(:last-child) {
  border-bottom: 1px solid #333;
}

.icon {
  font-size: 1.5rem;
}

.expand {
  transition: all 0.5s ease;
}

.expand.open {
  transform: rotate(90deg);
}

.hide {
  visibility: hidden;
}

label {
  display: flex;
  align-items: center;
  gap: 5px;
}

input {
  min-width: 300px;
}

li:has(> button:hover) {
  border: 1px var(--danger) dashed;
}
</style>
