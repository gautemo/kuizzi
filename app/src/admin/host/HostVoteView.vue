<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue';
import { Game } from '../../shared/types';
import ImageComponent from '../../shared/ImageComponent.vue';
import CorrectAnswers from '../../shared/CorrectAnswers.vue';
import HostVoteBar from './HostVoteBar.vue';

const game = inject('game') as ComputedRef<Game>
const question = computed(() => game.value.quiz.questions[game.value.question-1])
</script>

<template>
<section>
  <div>
    <h2>{{question.text}}</h2>
    <ImageComponent v-if="question.img" :value="question.img" alt="Question image" />
    <CorrectAnswers />
  </div>
  <div class="bars">
    <HostVoteBar alternative="a"/>
    <HostVoteBar alternative="b"/>
    <HostVoteBar alternative="c"/>
    <HostVoteBar alternative="d"/>
  </div>
</section>
</template>

<style scoped>
section {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 5px;
  align-items: end;
}

.bars{
  height: 100%;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>