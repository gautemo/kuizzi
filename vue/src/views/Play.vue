<template>
    <div v-if="isReady">
        <Join v-if="!playerJoined"/>
        <section v-else>
            <Lobby v-if="game.state === 'notstarted'" >
                <h2 class="fancyfont">Waiting for the host to start the Kuizzi</h2>
            </Lobby>
            <Question v-else-if="game.state === 'question'" :nr="game.question" :host="false"/>
            <Reveal v-else-if="game.state === 'reveal'" :nr="game.question" />
            <Score v-else-if="game.state === 'score'" :asPlayer="true"/>
            <EndPlayer v-else-if="game.state === 'ended'"/>

            <div v-if="game.state === 'score' || game.state === 'reveal'" class="progress">{{game.question}} of {{questions.length}}</div>
        </section>
    </div>
</template>

<script>
import { game } from '@/utils/game'
import { goToGame, me } from '@/utils/player'
import { questions } from '@/utils/questions'
import Join from '@/components/Join'
import Lobby from '@/components/Lobby'
import Score from '@/components/Score'
import Question from '@/components/questions/Question'
import Reveal from '@/components/Reveal'
import EndPlayer from '@/components/EndPlayer'
import { computed } from 'vue';

export default {
    setup(){
        goToGame('vWedmfs0m7zNaAdi4Yib');
        const playerJoined = computed(() => me.name && me.icon && me.color && game.value.players.find(p => p.uid === me.uid))
        const isReady = computed(() => !!game.value.quizid);

        return { playerJoined, isReady, game, questions }
    },
    components: { Join, Lobby, Score, Question, Reveal, EndPlayer }
}
</script>

<style scoped>
.progress{
    position: absolute;
    top: 25px;
    right: 25px;
}
</style>