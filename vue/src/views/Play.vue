<template>
    <div v-if="isReady">
        <Join v-if="!playerJoined"/>
        <section v-else>
            <Lobby v-if="game.state === 'notstarted'" />
            <Question v-else-if="game.state === 'question'" :nr="game.question"/>
            <Reveal v-else-if="game.state === 'reveal'" :nr="game.question" />
            <Score v-else-if="game.state === 'score'" />
        </section>
    </div>
</template>

<script>
import { goToGame, game, me } from '@/utils/game'
import Join from '@/components/Join'
import Lobby from '@/components/Lobby'
import Score from '@/components/Score'
import Question from '@/components/questions/Question'
import Reveal from '@/components/Reveal'
import { computed } from 'vue';

export default {
    setup(){
        goToGame('vWedmfs0m7zNaAdi4Yib');
        const playerJoined = computed(() => me.name && me.icon && me.color && game.value.players.find(p => p.uid === me.uid))
        const isReady = computed(() => !!game.value.quizid);

        return { playerJoined, isReady, game }
    },
    components: { Join, Lobby, Score, Question, Reveal }
}
</script>