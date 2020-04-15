<template>
  <main v-if="question">
    <h2 class="question-text">{{question.text}}</h2>
    <img v-if="question.img" :src="img" alt="Question image" class="question-image">
    <div v-if="wasCorrect" class="correct">
      <h2>✔️Correct!</h2>
      <Gif type="correct" />
      <p class="gain">+{{myAnswer.score}}</p>
    </div>
    <div v-else class="wrong">
      <h2>❌Wrong</h2>
      <Gif type="wrong" />
    </div>
    <CorrectAnswers :question="question" />
    <Summary/>
  </main>
</template>

<script>
import { questions } from '@/utils/questions'
import { game } from '@/utils/game'
import { me } from '@/utils/player'
import { computed, ref, watch } from 'vue'
import Summary from '@/components/Summary'
import Gif from '@/components/Gif'
import CorrectAnswers from '@/components/CorrectAnswers'
import { getImgUrl } from '@/utils/db'

export default {
  props: {
    nr: Number,
  },
  setup(props){
    const question = computed(() => questions.value.find(q => q.id === props.nr.toString()));

    const myAnswer = computed(() => game.value[`answer${props.nr}`] ? game.value[`answer${props.nr}`].find(a => a.uid === me.uid) : null);
    const wasCorrect = computed(() => myAnswer.value && question.value.correct.includes(myAnswer.value.alt));

    const img = ref('')
    if(question.value && question.value.img){
        getImgUrl(question.value.img).then(url => img.value = url)
    }
    watch(question, async () => {
      if(question.value.img){
        img.value = await getImgUrl(question.value.img)
      }
    })

    return { wasCorrect, myAnswer, question, img }
  },
  components: { Summary, Gif, CorrectAnswers }
}
</script>

<style scoped>
main{
  padding: 25px;
  height: 100%;
  box-sizing: border-box;
}

.question-text{
  margin: 0;
}

p{
  margin: 5px 0;
}

.correct, .wrong{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gain{
  background: white;
  padding: 10px 50px;
  border-radius: 5px;
  margin: 15px 0 10px 0;
}

.alt-img{
  max-height: 60px;
  max-width: 60px;
}

.question-image{
  max-height: 70px;
  max-width: 100px;
}

</style>