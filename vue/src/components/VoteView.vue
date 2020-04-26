<template>
  <main v-if="currentQuestion">
    <h2>{{currentQuestion.text}}</h2>
    <img v-if="currentQuestion.img" :src="img" alt="Question image" class="question-image">
    <CorrectAnswers :question="currentQuestion" />
    <div class="bars">
      <VoteBar class="red" :alt="currentQuestion.a" :players="playersA" :total="total"/>
      <VoteBar class="blue" :alt="currentQuestion.b" :players="playersB" :total="total"/>
      <VoteBar class="yellow" :alt="currentQuestion.c" :players="playersC" :total="total"/>
      <VoteBar class="green" :alt="currentQuestion.d" :players="playersD" :total="total"/>
    </div>
  </main>
</template>

<script>
import { game, me, currentQuestion } from '@/utils/game'
import { computed, ref, watch } from 'vue'
import VoteBar from '@/components/VoteBar'
import { getImgUrl } from '@/utils/db'
import CorrectAnswers from '@/components/CorrectAnswers'

export default {
  setup(){
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

    const img = ref('')
    if(currentQuestion.value && currentQuestion.value.img){
        getImgUrl(currentQuestion.value.img).then(url => img.value = url)
    }
    watch(currentQuestion, async () => {
      if(currentQuestion.value && currentQuestion.value.img){
        img.value = await getImgUrl(currentQuestion.value.img)
      }
    })

    return { currentQuestion, playersA, playersB, playersC, playersD, total, img }
  },
  components: { VoteBar, CorrectAnswers }
}
</script>

<style scoped>
h2{
  margin: 0;
}

p{
  margin: 5px 0;
}

main{
  padding: 25px;
  height: 100%;
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

.question-image{
  max-height: 150px;
  max-width: 400px;
}
</style>