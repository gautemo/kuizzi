<template>
  <main v-if="currentQuestion">
    <h2 class="question-text">{{currentQuestion.text}}</h2>
    <img v-if="currentQuestion.img" :src="img" alt="Question image" class="question-image">
    <div v-if="wasCorrect" class="correct">
      <h2>✔️Correct!</h2>
      <Gif type="correct" />
      <p class="gain">+{{myAnswer.score}}</p>
    </div>
    <div v-else class="wrong">
      <h2>❌Wrong</h2>
      <Gif type="wrong" />
    </div>
    <CorrectAnswers :question="currentQuestion" />
    <Summary/>
  </main>
</template>

<script>
import { game, currentQuestion } from '@/utils/game'
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
    const myAnswer = computed(() => game.value[`answer${props.nr}`] ? game.value[`answer${props.nr}`].find(a => a.uid === me.uid) : null);
    const wasCorrect = computed(() => myAnswer.value && currentQuestion.value.correct.includes(myAnswer.value.alt));

    const img = ref('')
    if(currentQuestion.value && currentQuestion.value.img){
        getImgUrl(currentQuestion.value.img).then(url => img.value = url)
    }
    watch(currentQuestion, async () => {
      if(currentQuestion.value.img){
        img.value = await getImgUrl(currentQuestion.value.img)
      }
    })

    return { wasCorrect, myAnswer, currentQuestion, img }
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
  padding-right: 35px;
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

@media only screen and (max-width: 600px) {
  h2{
    font-size: 1.15em;
  }

  .gain{
    margin: 10px 0;
    padding: 5px 50px;
  }
}

</style>