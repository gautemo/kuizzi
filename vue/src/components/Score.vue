<template>
  <div>
    <h2>Scoreboard</h2>
    <div class="scores">
      <transition-group class="leaders" name="leaders" tag="ul">
        <li :class="{row: i < 5, rest: i>=5}" v-for="(player, i) in playersSorted" :key="player.uid">
          <span v-if="i < 5">{{i+1}}</span>
          <Portrait :icon="player.icon" :color="player.color" size="40"/>
          <span v-if="i < 5" class="name">{{player.name}}</span>
          <span v-if="i < 5">{{player.score}}</span>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { game } from '@/utils/game'
import { computed } from 'vue'
import Portrait from '@/components/Portrait'

export default {
  setup(){
    const playersSorted = computed(() => game.value.players.sort((a,b) => b.score - a.score));
    return { playersSorted }
  },
  components: { Portrait }
}
</script>

<style scoped>
h2{
  margin: 20px 10px 10px 10px;
}

.scores{
  margin: 10px;
  padding: 10px;
  background: white;
  border-radius: 10px;
}

ul{
  padding: 0;
  list-style: none;
}

.row{
  display: grid;
  grid-template-columns: auto 40px 1fr auto;
  gap: 15px;
  align-items: center;
  margin: 5px;
  font-size: 1.2em;
}

.rest{
  display: inline-block;
  margin: 5px;
}

.leaders-move{
  transition: transform 5s;
}
</style>