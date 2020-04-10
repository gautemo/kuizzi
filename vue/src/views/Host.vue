<template>
    <div v-if="isReady">
        <section>
            <Lobby v-if="game.state === 'notstarted'" >
              <h2 class="fancyfont">Go to TBD to join!</h2>
            </Lobby>
            <Question v-else-if="game.state === 'question'" :nr="game.question" v-on:done="next" :host="true"/>
            <VoteView v-else-if="game.state === 'reveal'" />
            <Score v-else-if="game.state === 'score'" :asPlayer="false"/>
            <EndHost v-else-if="game.state === 'ended'"/>

            <div class="topright">
              <button v-if="game.state !== 'ended' && game.state !== 'question'" @click="next">Next</button>
              <div v-if="game.state === 'score' || game.state === 'reveal'" class="progress">{{game.question}} of {{questions.length}}</div>
            </div>
        </section>
    </div>
</template>

<script>
import { goToGame, game, updateState } from '@/utils/game'
import { questions } from '@/utils/questions'
import Join from '@/components/Join'
import Lobby from '@/components/Lobby'
import Score from '@/components/Score'
import Question from '@/components/questions/Question'
import VoteView from '@/components/VoteView'
import EndHost from '@/components/EndHost'
import { computed } from 'vue';

export default {
    setup(){
        goToGame('vWedmfs0m7zNaAdi4Yib');
        const isReady = computed(() => !!game.value.quizid);

        const next = () => {
          switch(game.value.state){
            case 'notstarted':
              updateState('question', 1)
              break;
            case 'question':
              updateState('reveal')
              break;
            case 'reveal':
              if(game.value.question === questions.value.length){
                updateState('ended')
              }else{
                updateState('score')
              }
              break;
            case 'score':
              updateState('question', game.value.question + 1)
              break;
          }
        }

        return { isReady, game, questions, next }
    },
    components: { Join, Lobby, Score, Question, VoteView, EndHost }
}
</script>

<style scoped>
.topright{
    position: absolute;
    top: 25px;
    right: 25px;
    display: grid;
    align-items: center;
    gap: 20px;
    grid-auto-flow: column;
}

button{
  background: none;
  border: 2px solid black;
  padding: 3px 15px;
  cursor: pointer;
  border-radius: 3px;
  font-family: inherit;
}
</style>