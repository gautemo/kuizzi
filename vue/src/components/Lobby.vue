<template>
  <div class="lobby">
    <h2 class="fancyfont">Waiting for the host to start the Kuizzi</h2>
    <h3>Players</h3>
    <div class="players">
      <Portrait v-for="player in game.players" :key="player.uid" :icon="player.icon" :color="player.color" size="80"/>
    </div>
  </div>
</template>

<script>
import { game } from '@/utils/game'
import Portrait from '@/components/Portrait'

export default {
    setup(){
        return { game };
    },
    components: { Portrait }
}
</script>

<style scoped>
.lobby{
  margin: 20px;
}

.players{
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  gap: 10px;
  justify-content: center;
  justify-items: center;
}
</style>
