<template>
    <div v-if="isReady">
        <Join v-if="!playerJoined"/>
        <section v-else>
            <Lobby v-if="game.state === 'notstarted'" />
            <Score v-else-if="game.state === 'score'" />
            <Question v-else-if="game.state === 'question'" nr="1"/>
        </section>
    </div>
</template>

<script>
import { goToGame, game, me } from '@/utils/game'
import Join from '@/components/Join'
import Lobby from '@/components/Lobby'
import Score from '@/components/Score'
import Question from '@/components/questions/Question'
import { computed } from 'vue';

export default {
    setup(){
        goToGame('vWedmfs0m7zNaAdi4Yib');
        const playerJoined = computed(() => me.name && me.icon && me.color && game.value.players.find(p => p.uid === me.uid))
        const isReady = computed(() => !!game.value.quizid);

        return { playerJoined, isReady, game }
    },
    components: { Join, Lobby, Score, Question }
}
</script>