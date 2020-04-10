<template>
  <main v-if="question">
    <h2>{{question.text}}</h2>
    <div>
      <p><b>Correct Answer:</b></p>
      <p v-for="answer in correctAnswers" :key="answer">{{answer}}</p>
    </div>
    <div class="bars">
      <VoteBar class="red" :alt="question.a" :players="playersA" :total="total"/>
      <VoteBar class="blue" :alt="question.b" :players="playersB" :total="total"/>
      <VoteBar class="yellow" :alt="question.c" :players="playersC" :total="total"/>
      <VoteBar class="green" :alt="question.d" :players="playersD" :total="total"/>
    </div>
  </main>
</template>

<script>
import { questions } from '@/utils/questions'
import { game, me } from '@/utils/game'
import { computed } from 'vue'
import VoteBar from '@/components/VoteBar'

export default {
  setup(){
    const question = computed(() => questions.value.find(q => q.id === game.value.question.toString()));

    const playersA = computed(() => {
      if(!game.value[`answer${game.value.question}`]) return [];
      return game.value.players.filter(p => game.value[`answer${game.value.question}`].some(a => a.uid === p.uid && a.alt === 'a'));
    })

    const playersB = computed(() => {
      if(!game.value[`answer${game.value.question}`]) return [];
      return game.value.players.filter(p => game.value[`answer${game.value.question}`].some(a => a.uid === p.uid && a.alt === 'b'));
    })

    const playersC = computed(() => {
      if(!game.value[`answer${game.value.question}`]) return [];
      return game.value.players.filter(p => game.value[`answer${game.value.question}`].some(a => a.uid === p.uid && a.alt === 'c'));
    })

    const playersD = computed(() => {
      if(!game.value[`answer${game.value.question}`]) return [];
      return game.value.players.filter(p => game.value[`answer${game.value.question}`].some(a => a.uid === p.uid && a.alt === 'd'));
    })

    const total = computed(() => game.value.players.length);

    const correctAnswers = computed(() => question.value.correct.map(c => question.value[c]))

    return { question, playersA, playersB, playersC, playersD, total, correctAnswers }
  },
  components: { VoteBar }
}
</script>

<style scoped>
main{
  padding: 25px;
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto 1fr;
}

.bars{
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: end;
  align-self: end;
}
</style>