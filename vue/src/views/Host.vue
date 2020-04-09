<template>
    <div v-if="isReady">
        <section>
            <Lobby v-if="game.state === 'notstarted'" >
              <h2 class="fancyfont">Go to TBD to join!</h2>
            </Lobby>
            <Question v-else-if="game.state === 'question'" :nr="game.question" v-on:done="next"/>
            <VoteView v-else-if="game.state === 'reveal'" />
            <Score v-else-if="game.state === 'score'" />

            <div v-if="game.state === 'score' || game.state === 'reveal'" class="progress">{{game.question}} of {{questions.length}}</div>
            <button @click="next">Next</button>
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
import { computed } from 'vue';

export default {
    setup(){
        goToGame('vWedmfs0m7zNaAdi4Yib');
        const isReady = computed(() => !!game.value.quizid);

        const next = () => {
          console.log('nexty')
          switch(game.value.state){
            case 'notstarted':
              updateState('question', 1)
              break;
            case 'question':
              updateState('reveal', 1)
              break;
          }
        }

        return { isReady, game, questions, next }
    },
    components: { Join, Lobby, Score, Question, VoteView }
}
</script>

<style scoped>
.progress{
    position: absolute;
    top: 25px;
    right: 25px;
}
</style>