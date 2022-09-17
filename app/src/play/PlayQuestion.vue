<script setup lang="ts">
import { computed, ComputedRef, inject, ref } from 'vue'
import CountDown from '../shared/CountDown.vue'
import { Game, Player } from '../shared/types'
import RevealBlocks from '../shared/RevealBlocks.vue'
import ImageComponent from '../shared/ImageComponent.vue'
import { ImageUtil } from '../shared/imageUtil'
import { addAnswer } from './firebaseGame'
import { clamp } from '../shared/utils'

const game = inject('game') as ComputedRef<Game>
const player = inject('player') as ComputedRef<Player>

const started = ref(false)

const question = computed(() => game.value.quiz.questions[game.value.question - 1])

function answer(alternative: 'a' | 'b' | 'c' | 'd') {
  let scoreGained = 0
  if (question.value.correct.includes(alternative)) {
    const questionTimeMillis = question.value.time * 1000
    const scorePerMillisecond = 500 / questionTimeMillis
    const timeSpent = Date.now() - (game.value.timeStarted + 3000)
    scoreGained = 500 + (questionTimeMillis - timeSpent) * scorePerMillisecond
    if (scoreGained > 1500) scoreGained = 500 //cheat
    scoreGained = Math.floor(clamp(500, scoreGained, 1000))
  }
  const points = player.value.points
  points[game.value.question-1] = scoreGained
  addAnswer(game.value.id, game.value.question, alternative, points)
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
    <div class="top" :class="{ three: question.img }">
      <div class="q-img" v-if="question.img">
        <ImageComponent :value="question.img" alt="Question image" />
        <RevealBlocks v-if="question.isReveal" />
      </div>
      <h1>{{ question.text }}</h1>
      <div class="right">
        <CountDown :from="question.time" />
      </div>
    </div>
    <div class="alternatives">
      <button v-if="question.a" class="a" @click="answer('a')">
        <ImageComponent v-if="ImageUtil.hasImage(question.a)" :value="question.a" alt="Alternative A" />
        <p v-else>{{ question.a }}</p>
      </button>
      <button v-if="question.b" class="b" @click="answer('b')">
        <ImageComponent v-if="ImageUtil.hasImage(question.b)" :value="question.b" alt="Alternative B" />
        <p v-else>{{ question.b }}</p>
      </button>
      <button v-if="question.c" class="c" @click="answer('c')">
        <ImageComponent v-if="ImageUtil.hasImage(question.c)" :value="question.c" alt="Alternative C" />
        <p v-else>{{ question.c }}</p>
      </button>
      <button v-if="question.d" class="d" @click="answer('d')">
        <ImageComponent v-if="ImageUtil.hasImage(question.d)" :value="question.d" alt="Alternative D" />
        <p v-else>{{ question.d }}</p>
      </button>
    </div>
  </section>
  <section></section>
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
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr auto;
  align-items: center;
  font-size: 1.2rem;
}

.top.three {
  gap: 10px;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: "img question right";
}

.top.three .right {
  grid-area: right;
}

.top .right {
  display: flex;
  justify-content: flex-end;
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
  word-break: break-word;
}

.q-img {
  position: relative;
  width: fit-content;
  min-width: 150px;
}

.q-img img {
  width: 100%;
  max-height: 25vh;
}

.alternatives img {
  max-height: 40vh;
  max-width: 40vw;
}
</style>
