<template>
  <div v-if="!started" class="mid">
    <p>Get Ready!</p>
    <CountDown :from="3" v-on:done="started = true"/>
  </div>
  <div v-else-if="!answered" class="question">
    <div class="header">
      <div class="question-img" v-if="currentQuestion.img">
        <RevealBlocks v-if="currentQuestion.isReveal" />
        <img :src="img" alt="Question image">
      </div>
      <h2>{{currentQuestion.text}}</h2>
      <CountDown v-if="currentQuestion" :from="currentQuestion.time" class="countdown" v-on:done="$emit('done')"/>
    </div>
    <div class="alternatives" :class="{'two-rows': currentQuestion.c}">
      <QButton :alternative="currentQuestion.a" @click="answer('a')" nr="one"/>
      <QButton :alternative="currentQuestion.b" @click="answer('b')" nr="two"/>
      <QButton :alternative="currentQuestion.c" @click="answer('c')" nr="three"/>
      <QButton :alternative="currentQuestion.d" @click="answer('d')" nr="four"/>
    </div>
  </div>
  <div v-else class="mid">
    <p>Was that correct?</p>
    <Gif type="waiting" />
  </div>
</template>

<script>
import { game, currentQuestion, addAnswer } from '@/utils/game'
import { watchEffect, ref, computed, onMounted, watch, onUnmounted } from 'vue';
import QButton from './QButton'
import CountDown from './CountDown'
import Gif from '@/components/Gif'
import RevealBlocks from '@/components/questions/RevealBlocks'
import { getImgUrl } from '@/utils/db'

export default {
  props: {
    host: Boolean,
  },
  setup(props, {emit}){
    const started = ref(false);
    const answered = ref(false);

    const answer = alt => {
      if(props.host) return;

      let gotScore = 0;
      if(currentQuestion.value.correct.includes(alt)){
        const questionTimeMillis = currentQuestion.value.time * 1000;
        const scorePerMillisecond = 500 / questionTimeMillis;
        const timeSpent = Date.now() - (game.value.timeStarted + 3000);
        let score = 500 + (questionTimeMillis - timeSpent) * scorePerMillisecond;

        if(score > 2000){
          score = 500; //cheat
        }

        gotScore = Math.min(1000, Math.max(score | 0, 500));
      }
      addAnswer(alt, gotScore);
      answered.value = true;
    }

    watchEffect(() => {
      if(props.host){
        const answers = game.value[`answer${game.value.question}`];
        if(answers && answers.length === game.value.players.length){
          setTimeout(() => emit('done'), 3000)
        }
      }
    })

    const img = ref('')
    if(currentQuestion.value && currentQuestion.value.img){
        getImgUrl(currentQuestion.value.img).then(url => img.value = url)
    }
    watch(currentQuestion, async () => {
      if(currentQuestion.value.img){
        img.value = await getImgUrl(currentQuestion.value.img)
      }
    })

    return { currentQuestion, started, answer, answered, img }
  },
  components: { QButton, CountDown, Gif, RevealBlocks }
}
</script>

<style scoped>
.alternatives{
  flex: 1;
  margin: 5px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

.alternatives.two-rows{
  grid-template-rows: 1fr 1fr;
}

.question{
  display: flex;
  flex-direction: column;
  height: 100%;
}

h2{
  text-align: center;
  flex: 1;
  margin: 0 50px;
}

.header{
  display: flex;
  align-items: center;
  position: relative;
  min-height: 150px;
}

.countdown{
  margin: 15px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}

.mid{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}

.question-img{
  margin: 20px;
  position: relative;
}

.question-img img{
  max-height: 40vh;
  max-width: 50vw;
}

@media only screen and (max-width: 600px) {
  .question-img img{
    max-height: 25vh;
    max-width: 30vw;
  }

  .question{
    grid-template-rows: auto 1fr;
  }
}
</style>