<template>
    <div v-if="isReady">
        <Join v-if="!playerJoined"/>
        <section v-else>
            <Lobby v-if="game.question === 1 && !game.questionStarted" />
        </section>
    </div>
</template>

<script>
import { goToGame, game, me } from '@/utils/game'
import Join from '@/components/Join'
import Lobby from '@/components/Lobby'
import { computed } from 'vue';

export default {
    setup(){
        goToGame('vWedmfs0m7zNaAdi4Yib');
        const playerJoined = computed(() => me.name && me.icon && me.color && game.value.players.find(p => p.uid === me.uid))
        const isReady = computed(() => !!game.value.quizid);

        return { playerJoined, isReady, game }
    },
    components: { Join, Lobby }
}
</script>