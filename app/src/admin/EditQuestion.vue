<script setup lang="ts">
import { inject } from 'vue'
import { Quiz } from './types'

const props = defineProps<{
  index: number
  expanded: boolean
}>()

const quiz = inject('quiz') as Quiz
</script>

<template>
  <div class="container">
    <label class="question">
      <span>Question:</span>
      <input type="text" v-model="quiz.questions[props.index].text" />
    </label>
    <div v-if="expanded">
      <label>
        <span>Time:</span>
        <input type="number" v-model="quiz.questions[props.index].time" />
      </label>
      <label>
        <span>Image:</span>
        TODO
      </label>
      <label>
        <span>A:</span>
        <input type="text" v-model="quiz.questions[props.index].a" />
      </label>
      <label>
        <span>B:</span>
        <input type="text" v-model="quiz.questions[props.index].b" />
      </label>
      <label>
        <span>C:</span>
        <input type="text" v-model="quiz.questions[props.index].c" />
      </label>
      <label>
        <span>D:</span>
        <input type="text" v-model="quiz.questions[props.index].d" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.container {
  flex: 1;
}

.question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
}

input {
  flex: 1;
}
</style>
