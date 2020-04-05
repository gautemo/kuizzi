<template>
    <div>
        <Join v-if="!joined"/>
        <section v-else>game</section>
    </div>
</template>

<script>
import { game, me } from '@/utils/game'
import Join from '@/components/Join'
import { computed } from 'vue';

export default {
    setup(){
        const joined = computed(() => me.name && me.icon && me.color && game.value.players.find(p => p.uid === me.uid))

        return { joined }
    },
    components: { Join }
}
</script>