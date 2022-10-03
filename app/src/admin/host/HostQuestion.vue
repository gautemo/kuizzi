<script setup lang="ts">
import { computed, ComputedRef, inject, ref, watchEffect } from 'vue'
import CountDown from '../../shared/CountDown.vue'
import { Game, Player } from '../../shared/types'
import RevealBlocks from '../../shared/RevealBlocks.vue'
import ImageComponent from '../../shared/ImageComponent.vue'
import { ImageUtil } from '../../shared/imageUtil'

const emit = defineEmits<{
  (e: 'next'): void
}>()

const game = inject('game') as ComputedRef<Game>
const players = inject('players') as ComputedRef<Player[]>

const started = ref(false)
watchEffect(() => {
  const done = players.value.every(p => Object.hasOwn(p, game.value.question))
  if (done) setTimeout(() => emit('next'), 3000)
})

const question = computed(() => game.value.quiz.questions[game.value.question - 1])
</script>

<template>
  <section v-if="!started" class="splash fancy">
    <div>
      <p>Get Ready!</p>
      <CountDown @done="started = true" :from="3" />
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
        <CountDown :from="question.time" @done="emit('next')" />
      </div>
    </div>
    <div class="alternatives">
      <div class="a" v-if="question.a">
        <ImageComponent v-if="ImageUtil.hasImage(question.a)" :value="question.a" alt="Alternative A" />
        <p v-else>{{ question.a }}</p>
      </div>
      <div class="b" v-if="question.b">
        <ImageComponent v-if="ImageUtil.hasImage(question.b)" :value="question.b" alt="Alternative B" />
        <p v-else>{{ question.b }}</p>
      </div>
      <div class="c" v-if="question.c">
        <ImageComponent v-if="ImageUtil.hasImage(question.c)" :value="question.c" alt="Alternative C" />
        <p v-else>{{ question.c }}</p>
      </div>
      <div class="d" v-if="question.d">
        <ImageComponent v-if="ImageUtil.hasImage(question.d)" :value="question.d" alt="Alternative D" />
        <p v-else>{{ question.d }}</p>
      </div>
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
  font-size: 2rem;
}

.top.three {
  gap: 10px;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: 'img question right';
}

.top.three .right {
  grid-area: right;
}

.top .right {
  display: flex;
  justify-content: flex-end;
}

h1 {
  font-size: 2rem;
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

.alternatives > div {
  border-radius: 8px;
  padding: 5px;
  display: grid;
  place-items: center;
  box-shadow: 0 2px 2px 1px #626262c7;
}

.alternatives p {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
  word-break: break-word;
  text-shadow: 1px 2px 1px #00000078;
}

.q-img {
  position: relative;
  width: fit-content;
  min-width: 300px;
}

.q-img img {
  width: 100%;
  max-height: 25vh;
}

.alternatives img {
  max-height: 30vh;
  max-width: 40vw;
}
</style>
