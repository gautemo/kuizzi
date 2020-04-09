<template>
  <div v-if="!started">
    <p>Get Ready</p>
    <CountDown :from="3" v-on:done="started = true"/>
  </div>
  <div v-else class="question">
    <div class="header">
      <h2>{{question.text}}</h2>
      <CountDown :from="30" class="countdown"/>
    </div>
    <div class="alternatives">
      <QButton :alternative="question.a" @click="answer('a')" nr="one"/>
      <QButton :alternative="question.b" @click="answer('b')" nr="two"/>
      <QButton :alternative="question.c" @click="answer('c')" nr="three"/>
      <QButton :alternative="question.d" @click="answer('d')" nr="four"/>
    </div>
  </div>
</template>

<script>
import { questions, addAnswer } from '@/utils/questions'
import { watchEffect, ref, computed, onMounted, watch, onUnmounted } from 'vue';
import QButton from './QButton'
import CountDown from './CountDown'

let scoreIntervalId;

export default {
  props: ['nr'],
  setup(props){
    const started = ref(false);
    const score = ref(1000);
    const question = computed(() => questions.value.find(q => q.id === props.nr));

    watch(started, () => {
      if(started.value){
        scoreIntervalId = setInterval(() => {
          if(score.value > 500) score.value--;
        }, 50);
      }
    });

    onUnmounted(() => clearInterval(scoreIntervalId));

    const answer = alt => {
      clearInterval(scoreIntervalId)
      let gotScore = 0;
      if(alt === question.correct){
        gotScore = score.value;
      }
      addAnswer(props.nr, alt, gotScore);
    }

    return { question, started, answer }
  },
  components: { QButton, CountDown }
}
</script>

<style scoped>
.alternatives{
  margin: 5px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
}

.question{
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

h2{
  text-align: center;
  flex: 1;
}

.header{
  display: flex;
}

.countdown{
  margin: 15px;
}
</style>