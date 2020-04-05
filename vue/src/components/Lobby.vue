<template>
    <div class="lobby">
        <h2 class="fancyfont">Waiting for the host to start the Kuizzi</h2>
        <h3>Players</h3>
        <div class="players">
            <span class="player" v-for="player in game.players" :key="player.uid" :style="{background: player.color}">{{player.icon}}</span>
        </div>
    </div>
</template>

<script>
import { game } from '@/utils/game'

export default {
    setup(){
        return { game };
    }
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

.player{
  font-size: 2.7em;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
