<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue'
import ImageComponent from './ImageComponent.vue'
import { ImageUtil } from './imageUtil'
import { Game } from './types'

const game = inject('game') as ComputedRef<Game>
const question = computed(() => game.value.quiz.questions[game.value.question - 1])
</script>

<template>
  <p><b>Correct Answer:</b></p>
  <div class="flex">
    <p v-for="alternative in question.correct" :key="alternative" class="correct" :class="alternative">
      <ImageComponent
        v-if="ImageUtil.hasImage(question[alternative])"
        :value="question[alternative]"
        alt="Correct image alternative"
        class="alt-img"
      />
      <span v-else>{{ question[alternative] }}</span>
    </p>
  </div>
</template>

<style scoped>
p {
  margin: 3px 0;
}

.correct {
  color: white;
  font-size: 1.2em;
  display: inline-block;
  border-radius: 5px;
  padding: 3px 10px;
  min-width: 100px;
}

.correct:not(:last-child) {
  margin-right: 10px;
}

.correct.a {
  background: var(--red);
}

.correct.b {
  background: var(--blue);
}

.correct.c {
  background: var(--yellow);
}

.correct.d {
  background: var(--green);
}

.alt-img {
  max-height: 100px;
  max-width: 100px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
