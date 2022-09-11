<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue';
import { Game, Player } from '../shared/types';
import ImageComponent from '../shared/ImageComponent.vue';
import FunnyGif from './FunnyGif.vue';
import CorrectAnswers from '../shared/CorrectAnswers.vue';
import PlaySummary from './PlaySummary.vue';

const game = inject('game') as ComputedRef<Game>
const player = inject('player') as ComputedRef<Player>
const question = computed(() => game.value.quiz.questions[game.value.question-1])

const isCorrect = computed(() => question.value.correct.includes(player.value[game.value.question-1]))
</script>

<template>
<h1>{{question.text}}</h1>
<ImageComponent v-if="question.img" :value="question.img" alt="Question image" />
<div class="mid">
  <template v-if="isCorrect">
    <h2>
      <span class="i-ic-baseline-check-circle correct-icon"></span>
      Correct!
    </h2>
    <FunnyGif type="correct"/>
    <p>+{{player.addedScore}}</p>
  </template>
  <template v-else>
    <h2>
      <span class="i-ic-baseline-cancel wrong-icon"></span>
      Wrong
    </h2>
    <FunnyGif type="wrong"/>
  </template>
</div>
<CorrectAnswers />
<PlaySummary />
</template>

<style scoped>
h1, h2 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

h2 {
  display: flex;
  gap: 5px;
  align-items: center;
}

.mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
}

.wrong-icon {
  color: var(--danger);
}

.success-icon {
  color: var(--success);
}

h1 + img {
  max-width: 40vw;
}
</style>