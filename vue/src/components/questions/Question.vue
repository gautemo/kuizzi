<template>
  <div v-if="!started" class="mid">
    <p>Get Ready</p>
    <CountDown :from="3" v-on:done="started = true"/>
  </div>
  <div v-else-if="!answered" class="question">
    <div class="header">
      <div class="question-img" v-if="question.img">
        <RevealBlocks v-if="question.isReveal" />
        <img :src="img" alt="Question image">
      </div>
      <h2>{{question.text}}</h2>
      <CountDown v-if="question" :from="question.time" class="countdown" v-on:done="$emit('done')"/>
    </div>
    <div class="alternatives" :class="{'two-rows': question.c}">
      <QButton :alternative="question.a" @click="answer('a')" nr="one"/>
      <QButton :alternative="question.b" @click="answer('b')" nr="two"/>
      <QButton :alternative="question.c" @click="answer('c')" nr="three"/>
      <QButton :alternative="question.d" @click="answer('d')" nr="four"/>
    </div>
  </div>
  <div v-else class="mid">
    Was that correct?
    <Gif type="waiting" />
  </div>
</template>

<script>
import { questions, addAnswer } from '@/utils/questions'
import { game } from '@/utils/game'
import { watchEffect, ref, computed, onMounted, watch, onUnmounted } from 'vue';
import QButton from './QButton'
import CountDown from './CountDown'
import Gif from '@/components/Gif'
import RevealBlocks from '@/components/RevealBlocks'
import { getImgUrl } from '@/utils/db'

let scoreIntervalId;

export default {
  props: {
    nr: Number,
    host: Boolean,
  },
  setup(props, {emit}){
    const started = ref(false);
    const answered = ref(false);
    const score = ref(1000);
    const question = computed(() => questions.value.find(q => q.id === props.nr.toString()));

    watch(started, () => {
      if(started.value){
        scoreIntervalId = setInterval(() => {
          if(score.value > 500) score.value--;
        }, 50);
      }
    });

    onUnmounted(() => clearInterval(scoreIntervalId));

    const answer = alt => {
      if(props.host) return;

      clearInterval(scoreIntervalId)
      let gotScore = 0;
      if(question.value.correct.includes(alt)){
        gotScore = score.value;
      }
      addAnswer(props.nr, alt, gotScore);
      answered.value = true;
    }

    watchEffect(() => {
      if(props.host){
        const answers = game.value[`answer${game.value.question}`];
        if(answers && answers.length === game.value.players.length){
          setTimeout(() => emit('done'), 1500)
        }
      }
    })

    const img = ref('')
    if(question.value && question.value.img){
        getImgUrl(question.value.img).then(url => img.value = url)
    }
    watch(question, async () => {
      if(question.value.img){
        img.value = await getImgUrl(question.value.img)
      }
    })

    return { question, started, answer, answered, img }
  },
  components: { QButton, CountDown, Gif, RevealBlocks }
}
</script>

<style scoped>
.alternatives{
  margin: 5px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
}

.alternatives.two-rows{
  grid-template-rows: 1fr 1fr;
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

.mid{
  height: 100vh;
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

img{
  max-height: 40vh;
  max-width: 50vw;
}

@media only screen and (max-width: 600px) {
  img{
    max-height: 25vh;
    max-width: 30vw;
  }
}
</style>