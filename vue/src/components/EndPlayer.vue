<template>
  <h2>Thank you for playing!</h2>
  <Summary />
  <Fireworks v-if="rank === 0" size="10px" />
</template>

<script>
import Summary from '@/components/Summary'
import { computed } from 'vue';
import { scores } from '@/utils/game'
import { me } from '@/utils/player'
import Fireworks from '@/components/Fireworks'

export default {
  setup(){
    const rank = computed(() =>  scores.value.findIndex(p => p.uid === me.uid))
    return { rank };
  },
  components: { Summary, Fireworks }
}
</script>

<style scoped>
h2{
  text-align: center;
}
</style>