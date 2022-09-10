<script setup lang="ts">
import { computed, inject, Ref } from 'vue'
import { ImageUtil } from '../../shared/imageUtil';
import { Quiz } from '../types'
import ImageComponent from '../../shared/ImageComponent.vue';

const props = defineProps<{
  option: 'a' | 'b' | 'c' | 'd'
  questionIndex: number
}>()

const quiz = inject('quiz') as Quiz
const question = computed(() => quiz.questions[props.questionIndex])

const images = inject('images') as Ref<File[]>

function addImage(input: HTMLInputElement) {
  const file = input.files![0]
  images.value.push(file)
  return ImageUtil.fileToString(file)
}

function toggleCorrect(checked: boolean) {
  if (checked) {
    question.value.correct.push(props.option)
  } else {
    question.value.correct = question.value.correct.filter(o => o !== props.option)
  }
}
</script>

<template>
  <div class="option">
    <label :class="{ 'has-img': ImageUtil.hasImage(question[props.option]) }">
      <span :class="props.option">{{ props.option.toUpperCase() }}:</span>
      <input type="text" v-model="question[props.option]" />
    </label>
    <div class="img-container" v-if="ImageUtil.hasImage(question[props.option])">
      <ImageComponent :value="question[props.option]" :alt="`Option ${props.option} image`"/>
      <button @click="question[props.option] = ''">Remove</button>
    </div>
    <label v-else>
      <span class="i-ic-baseline-image" />
      <input type="file" accept="image/*" @input="event => question[props.option] = addImage(event.target as HTMLInputElement)" />
    </label>
    <label>
      <span>Correct</span>
      <input
        type="checkbox"
        :checked="question.correct.includes(props.option)"
        @change="event => toggleCorrect((event.target as HTMLInputElement).checked)"
      />
    </label>
  </div>
</template>

<style scoped>
.a,
.b,
.c,
.d {
  padding: 5px;
  font-weight: bold;
  border-radius: 2px;
  box-sizing: border-box;
}

.a {
  background: var(--red);
}

.b {
  background: var(--blue);
}

.c {
  background: var(--yellow);
}

.d {
  background: var(--green);
}

.option {
  display: flex;
  gap: 5px;
  align-items: flex-end;
}

.option > label:first-child {
  flex: 1;
}

.option > label:first-child > input {
  flex: 1;
}

.option > label:last-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.option > label:last-child > span {
  min-width: auto;
}

.option input[type='file'] {
  display: none;
}

.option > label:nth-child(2) > span {
  font-size: 2rem;
  min-width: auto;
}

.option > label.has-img {
  flex: none;
}

.has-img input {
  display: none;
}

.img-container {
  flex: 1;
}
</style>
