<script setup lang="ts">
import { computed, inject } from 'vue'
import { Quiz } from './types'
import RevealBlocks from '../shared/RevealBlocks.vue'
import EditQuestionOption from './EditQuestionOption.vue'

const props = defineProps<{
  index: number
  expanded: boolean
}>()

const quiz = inject('quiz') as Quiz
const question = computed(() => quiz.questions[props.index])

function getImgSrc(input: HTMLInputElement) {
  return URL.createObjectURL(input.files![0])
}
</script>

<template>
  <div class="container">
    <label class="question">
      <span>Question:</span>
      <input type="text" v-model="question.text" maxlength="70" />
    </label>
    <div v-if="expanded" class="details">
      <label>
        <span>Time:</span>
        <input type="number" v-model="question.time" />
      </label>
      <label v-if="!question.img">
        <span>Image:</span>
        <input type="file" accept="image/*" @input="event => question.img = getImgSrc(event.target as HTMLInputElement)" />
      </label>
      <label @click.prevent v-else>
        <span>Image:</span>
        <div class="img-container">
          <div class="q-img">
            <img :src="question.img" alt="Question image" />
            <RevealBlocks v-if="question.isReveal" />
          </div>
          <button @click="question.img = null">Remove</button>
        </div>
      </label>
      <label v-if="question.img">
        <span class="prop">Image reveal:</span>
        <input type="checkbox" v-model="question.isReveal" />
      </label>
      <EditQuestionOption option="a" :question-index="props.index" />
      <EditQuestionOption option="b" :question-index="props.index" />
      <EditQuestionOption option="c" :question-index="props.index" />
      <EditQuestionOption option="d" :question-index="props.index" />
    </div>
    <p v-if="question.correct.length === 0" class="warning">No answer is selected as correct</p>
  </div>
</template>

<style scoped>
.container {
  flex: 1;
}

.question {
  width: 100%;
}

.question span {
  text-decoration: underline;
}

.question input {
  flex: 1;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
}

:deep(label) {
  display: flex;
  align-items: center;
  gap: 5px;
}

:deep(label > span) {
  min-width: 100px;
}

input[type='number'] {
  width: 50px;
  flex: none;
}

:deep(input[type='checkbox']) {
  min-width: 26px;
  min-height: 26px;
}

:deep(.img-container) {
  display: flex;
  gap: 5px;
}

:deep(img) {
  max-width: 200px;
  display: block;
}

.q-img {
  position: relative;
}
</style>
