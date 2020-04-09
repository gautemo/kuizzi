<template>
  <div class="lobby">
    <slot></slot>
    <h3>Players</h3>
    <div class="players">
      <div v-for="player in game.players" :key="player.uid" class="player">
        <Portrait :icon="player.icon" :color="player.color" size="80"/>
        <span class="name">{{player.name}}</span>
      </div>
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

.player{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.name{
  font-size: 1.1em;
}

@media only screen and (max-width: 700px) {
  .name{
    display: none;
  }
}
</style>
