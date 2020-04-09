<template>
  <main v-if="question">
    <h2>{{question.text}}</h2>
    <div v-if="wasCorrect">
      <h2>✔️Correct!</h2>
      <img src="https://media.giphy.com/media/3o7abGQa0aRJUurpII/giphy.gif" alt="correct img">
      <p class="gain">+{{myAnswer.score}}</p>
    </div>
    <div v-else>
      <h2>❌Wrong</h2>
      <img src="https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif" alt="wrong img">
    </div>
    <p><b>Correct Answer:</b> {{question[question.correct]}}</p>
    <section>
      <p>{{rank}}</p>
    </section>
  </main>
</template>

<script>
import { questions } from '@/utils/questions'
import { game, me, scores } from '@/utils/game'
import { computed } from 'vue'

export default {
  props: {
    nr: Number,
  },
  setup(props){
    const question = computed(() => questions.value.find(q => q.id === props.nr.toString()));

    const myAnswer = computed(() => game.value[`answer${props.nr}`] ? game.value[`answer${props.nr}`].find(a => a.uid === me.uid) : null);
    const wasCorrect = computed(() => myAnswer.value && myAnswer.value.alt === question.value.correct);

    const rank = computed(() => {
      const meIndex = scores.value.findIndex(p => p.uid === me.uid);
      return `${format(meIndex+1)} of ${scores.value.length} players with a total of ${scores.value[meIndex].score} points`
    })

    return { wasCorrect, myAnswer, question, rank }
  }
}

const suffixes = {
  'one': 'st',
  'two': 'nd',
  'few': 'rd',
  'other': 'th'
}

const pr = new Intl.PluralRules('en-US', {
    type: 'ordinal'
})
const format = (number) => `${number}${suffixes[pr.select(number)]}`
</script>

<style scoped>
main{
  padding: 25px;
  height: 100vh;
}

.correct{
  background: #227e0a;
}

.failed{
  background: #f4303c;
}

img{
  max-width: 70vw;
  max-height: 150px;
  border-radius: 5px;
}

div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gain{
  background: white;
  padding: 10px 50px;
  border-radius: 5px;
}

section{
  position: absolute;
  bottom: 20px;
  padding: 0 15px;
  background: white;
  border-radius: 5px;
  width: 80vw;
}
</style>