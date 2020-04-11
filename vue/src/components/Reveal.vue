<template>
  <main v-if="question">
    <h2>{{question.text}}</h2>
    <div v-if="wasCorrect">
      <h2>✔️Correct!</h2>
      <Gif type="correct" />
      <p class="gain">+{{myAnswer.score}}</p>
    </div>
    <div v-else>
      <h2>❌Wrong</h2>
      <Gif type="wrong" />
    </div>
    <p><b>Correct Answer:</b></p>
    <p v-for="answer in correctAnswers" :key="answer">
      <span v-if="!answer.startsWith('[image]')">{{answer}}</span>
      <AltImg :alternative="answer" pad="5" class="alt-img"/>
    </p>
    <Summary/>
  </main>
</template>

<script>
import { questions } from '@/utils/questions'
import { game } from '@/utils/game'
import { me } from '@/utils/player'
import { computed } from 'vue'
import Summary from '@/components/Summary'
import Gif from '@/components/Gif'
import AltImg from '@/components/AltImg'

export default {
  props: {
    nr: Number,
  },
  setup(props){
    const question = computed(() => questions.value.find(q => q.id === props.nr.toString()));

    const myAnswer = computed(() => game.value[`answer${props.nr}`] ? game.value[`answer${props.nr}`].find(a => a.uid === me.uid) : null);
    const wasCorrect = computed(() => myAnswer.value && question.value.correct.includes(myAnswer.value.alt));

    const correctAnswers = computed(() => question.value.correct.map(c => question.value[c]))

    return { wasCorrect, myAnswer, question, correctAnswers }
  },
  components: { Summary, Gif, AltImg }
}
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

.alt-img{
  max-height: 60px;
  max-width: 60px;
}

</style>