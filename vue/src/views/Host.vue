<template>
    <section v-if="isReady">
      <Lobby v-if="game.state === 'notstarted'" >
        <h1 class="fancyfont">{{game.quiz.name}}</h1>
        <h2 class="fancyfont">Go to kuizzi.web.app to join!</h2>
        <h3>Game PIN: <span class="pin">{{pin}}</span></h3>
      </Lobby>
      <Question v-else-if="game.state === 'question'" :nr="game.question" v-on:done="() => next('question')" :host="true"/>
      <VoteView v-else-if="game.state === 'reveal'" />
      <Score v-else-if="game.state === 'score'" :asPlayer="false"/>
      <EndHost v-else-if="game.state === 'ended'"/>

      <div class="topright">
        <button v-if="game.state !== 'ended' && game.state !== 'question'" @click="() => next(game.state)">Next</button>
        <div v-if="game.state === 'score' || game.state === 'reveal'" class="progress">{{game.question}} of {{questions.length}}</div>
      </div>
    </section>
</template>

<script>
import { router } from '@/router';
import { goToGame, game, updateState, questions } from '@/utils/game'
import { getUid } from '@/utils/db'
import Join from '@/components/Join'
import Lobby from '@/components/Lobby'
import Score from '@/components/Score'
import Question from '@/components/questions/Question'
import VoteView from '@/components/VoteView'
import EndHost from '@/components/EndHost'
import { computed, watchEffect } from 'vue';

export default {
    setup(){
      const pin = router.currentRoute.value.params.pin;
      goToGame(pin);
      const isReady = computed(() => !!game.value.state);

      watchEffect(async () => {
        if(game.value.quiz.owner && game.value.quiz.owner !== await getUid()){
          router.push('/');
        }
      })

      const next = from => {
        switch(from){
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

      return { isReady, game, questions, next, pin }
    },
    components: { Join, Lobby, Score, Question, VoteView, EndHost }
}
</script>

<style scoped>
h1{
  font-size: 2.5rem;
}

.pin{
  font-size: 2.5rem;
  margin-left: 5px;
}

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

section{
  height: 100%;
}
</style>