<template>
  <main v-if="question">
    <h2>{{question.text}}</h2>
    <img :src="img" alt="Question image" class="question-image">
    <div>
      <p><b>Correct Answer:</b></p>
      <p v-for="answer in correctAnswers" :key="answer">
        <span v-if="!answer.startsWith('[image]')">{{answer}}</span>
        <AltImg :alternative="answer" pad="5" class="alt-img"/>
      </p>
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
import { computed, ref, watch } from 'vue'
import VoteBar from '@/components/VoteBar'
import AltImg from '@/components/AltImg'
import { getImgUrl } from '@/utils/db'

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

    const img = ref('')
    if(question.value && question.value.img){
        getImgUrl(question.value.img).then(url => img.value = url)
    }
    watch(question, async () => {
      if(question.value.img){
        img.value = await getImgUrl(question.value.img)
      }
    })

    return { question, playersA, playersB, playersC, playersD, total, correctAnswers, img }
  },
  components: { VoteBar, AltImg }
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

.alt-img{
  max-height: 100px;
  max-width: 100px;
}

.question-image{
  max-height: 150px;
  max-width: 400px;
}
</style>