<template>
    <Join v-if="isReady && !playerJoined"/>
    <section v-else-if="isReady">
        <Lobby v-if="game.state === 'notstarted'" >
            <h2 class="fancyfont">Waiting for the host to start the Kuizzi</h2>
        </Lobby>
        <Question v-else-if="game.state === 'question'" :nr="game.question" :host="false"/>
        <Reveal v-else-if="game.state === 'reveal'" :nr="game.question" />
        <Score v-else-if="game.state === 'score'" :asPlayer="true"/>
        <EndPlayer v-else-if="game.state === 'ended'"/>
        <div v-if="game.state === 'score' || game.state === 'reveal'" class="progress">{{game.question}} of {{questions.length}}</div>
    </section>
</template>

<script>
import { game, questions } from '@/utils/game'
import { goToGame, me } from '@/utils/player'
import Join from '@/components/Join'
import Lobby from '@/components/Lobby'
import Score from '@/components/Score'
import Question from '@/components/questions/Question'
import Reveal from '@/components/Reveal'
import EndPlayer from '@/components/EndPlayer'
import { computed } from 'vue';
import { router } from '@/router';

export default {
    setup(){
        const gamepin = router.currentRoute.value.params.pin;
        goToGame(gamepin);
        const playerJoined = computed(() => me.name && me.icon && me.color && game.value.players.find(p => p.uid === me.uid))
        const isReady = computed(() => !!game.value.state);

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

section{
    height: 100%;
}
</style>