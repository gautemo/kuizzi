<script setup lang="ts">
import { computed, ComputedRef, inject, ref } from 'vue';
import CountDown from '../shared/CountDown.vue';
import { Game, Player } from '../shared/types';
import RevealBlocks from '../shared/RevealBlocks.vue';
import ImageComponent from '../shared/ImageComponent.vue';
import { ImageUtil } from '../shared/imageUtil';
import { addAnswer } from './firebaseGame';
import { clamp } from '../shared/utils';

const game = inject('game') as ComputedRef<Game>
const player = inject('player') as ComputedRef<Player>

const started = ref(false)

const question = computed(() => game.value.quiz.questions[game.value.question - 1])

function answer(alternative: 'a' | 'b' | 'c' | 'd') {
  let scoreGained = 0
  if(question.value.correct.includes(alternative)){
    const questionTimeMillis = question.value.time * 1000;
    const scorePerMillisecond = 500 / questionTimeMillis;
    const timeSpent = Date.now() - (game.value.timeStarted + 3000);
    scoreGained = 500 + (questionTimeMillis - timeSpent) * scorePerMillisecond
    if(scoreGained > 1500) scoreGained = 500 //cheat
    scoreGained = Math.floor(clamp(500, scoreGained, 1000))
  }
  addAnswer(game.value.id, game.value.question, alternative, scoreGained + player.value.score, scoreGained)
}

const countDown = clamp(0, 3000 - (Date.now() - game.value.timeStarted), 3000)
</script>
  
<template>
  <section v-if="!started" class="splash fancy">
    <div>
      <p>Get Ready!</p>
      <CountDown @done="started = true" :from="Math.floor(countDown / 1000)" :delay-milliseconds="countDown % 1000" />
    </div>
  </section>
  <section v-else class="game">
    <div class="top">
      <div class="q-img" v-if="question.img">
        <ImageComponent :value="question.img" alt="Question image" />
        <RevealBlocks v-if="question.isReveal" />
      </div>
      <h1>{{question.text}}</h1>
      <CountDown :from="question.time" />
    </div>
    <div class="alternatives">
      <button v-if="question.a" class="a" @click="answer('a')">
        <ImageComponent v-if="ImageUtil.hasImage(question.a)" :value="question.a" alt="Alternative A" />
        <p v-else>{{question.a}}</p>
      </button>
      <button v-if="question.b" class="b" @click="answer('b')">
        <ImageComponent v-if="ImageUtil.hasImage(question.b)" :value="question.b" alt="Alternative B" />
        <p v-else>{{question.b}}</p>
      </button>
      <button v-if="question.c" class="c" @click="answer('c')">
        <ImageComponent v-if="ImageUtil.hasImage(question.c)" :value="question.c" alt="Alternative C" />
        <p v-else>{{question.c}}</p>
      </button>
      <button v-if="question.d" class="d" @click="answer('d')">
        <ImageComponent v-if="ImageUtil.hasImage(question.d)" :value="question.d" alt="Alternative D" />
        <p v-else>{{question.d}}</p>
      </button>
    </div>
  </section>
  <section>

  </section>
</template>
  
<style scoped>
.splash {
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  font-size: 2rem;
}

.game {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.top {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
}

h1 {
  font-size: 1.2rem;
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

.alternatives {
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
}

button {
  border: none;
  border-radius: 8px;
  padding: 5px;
  display: grid;
  place-items: center;
  box-shadow: 0 2px 2px 1px #626262c7;
}

.alternatives p {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
}

.q-img {
  position: relative;
  max-width: 30vw;
}

.q-img img {
  width: 100%;
  max-height: 1000px;
}

.alternatives img {
  max-height: 40vh;
  max-width: 40vw;
}
</style>