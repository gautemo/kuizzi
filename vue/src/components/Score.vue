<template>
  <div>
    <h2>Scoreboard</h2>
    <div class="scores">
      <transition-group class="leaders" name="leaders" tag="ul">
        <li :class="{row: i < 5, rest: i>=5}" v-for="(player, i) in scores" :key="player.uid">
          <span v-if="i < 5">{{i+1}}</span>
          <Portrait :icon="player.icon" :color="player.color" size="40"/>
          <span v-if="i < 5" class="name">{{player.name}}</span>
          <span v-if="i < 5">{{player.score.toFixed(0)}}</span>
        </li>
      </transition-group>
    </div>
    <Summary v-if="asPlayer"/>
  </div>
</template>

<script>
import { game, scores } from '@/utils/game'
import { computed, onMounted, ref, watch } from 'vue'
import Portrait from '@/components/Portrait'
import Summary from '@/components/Summary'
import TWEEN from '@tweenjs/tween.js'

function animate() {
    window.requestAnimationFrame(animate);
    TWEEN.update();
}

export default {
  props: {
    asPlayer: Boolean,
  },
  setup(){
    const answers = game.value[`answer${game.value.question}`] || [];
    const newScores = ref(
      scores.value.map(p => {
        let thisRound = 0;
        const answer = answers.find(a => a.uid === p.uid);
        if(answer){
          thisRound = answer.score;
        }
        return {...p, score: p.score - thisRound}
      }));

    const showScores = computed(() => newScores.value.sort((a,b) => b.score - a.score));

    onMounted(() => {
      setTimeout(() => {
        for(const p of newScores.value){
          let thisRound = 0;
          const answer = answers.find(a => a.uid === p.uid);
          if(answer){
            thisRound = answer.score;
          }
          new TWEEN.Tween(p)
            .to({score: p.score + thisRound}, 1500)
            .start();
        }
        animate()
      }, 500)
    })

    watch(newScores, () => requestAnimationFrame)

    return { scores: showScores }
  },
  components: { Portrait, Summary }
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