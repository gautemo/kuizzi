<script setup lang="ts">
import { computed, inject, Ref } from 'vue'
import { Quiz } from '../../shared/types'
import RevealBlocks from '../../shared/RevealBlocks.vue'
import EditQuestionOption from './EditQuestionOption.vue'
import AlertMessage from '../../shared/AlertMessage.vue'
import ImageComponent from '../../shared/ImageComponent.vue'
import { ImageUtil } from '../../shared/imageUtil'

const props = defineProps<{
  index: number
  expanded: boolean
}>()

const quiz = inject('quiz') as Quiz
const question = computed(() => quiz.questions[props.index])

const images = inject('images') as Ref<File[]>

function addImage(input: HTMLInputElement) {
  const file = input.files![0]
  images.value.push(file)
  return ImageUtil.fileToString(file)
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
        <input type="file" accept="image/*" @input="event => question.img = addImage(event.target as HTMLInputElement)" />
      </label>
      <label @click.prevent v-else>
        <span>Image:</span>
        <div class="img-container">
          <div class="q-img">
            <ImageComponent :value="question.img" alt="Question image" />
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
    <AlertMessage v-if="question.correct.length === 0" message="No answer is selected as correct" type="warning" />
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
