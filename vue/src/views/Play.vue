<template>
    <div v-if="isReady">
        <Join v-if="!playerJoined"/>
        <section v-else>game</section>
    </div>
</template>

<script>
import { goToGame, game, me } from '@/utils/game'
import Join from '@/components/Join'
import { computed } from 'vue';

export default {
    setup(){
        goToGame('vWedmfs0m7zNaAdi4Yib');
        const playerJoined = computed(() => me.name && me.icon && me.color && game.value.players.find(p => p.uid === me.uid))
        const isReady = computed(() => !!game.value.quizid);

        return { playerJoined, isReady }
    },
    components: { Join }
}
</script>