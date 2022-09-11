<script setup lang="ts">
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import { getGamePlayersQuery, getGameRef, getUser } from '../firebase'
import { Game, Player } from '../shared/types'
import { useFirestore, useFirestoreList } from '../shared/useFirebase'
import AlertMessage from '../shared/AlertMessage.vue'
import CreateUser from './CreateUser.vue'
import LobbyPlayers from '../shared/LobbyPlayers.vue'
import PlayQuestion from './PlayQuestion.vue'
import FunnyGif from './FunnyGif.vue'
import QuestionReveal from './QuestionReveal.vue'
import ScoreBoard from '../shared/ScoreBoard.vue'
import PlaySummary from './PlaySummary.vue'
import PlayEnd from './PlayEnd.vue'

const route = useRoute()
if (typeof route.params.id !== 'string') throw new Error('unknown id')
const { isLoading, error, data: game } = useFirestore<Game>(getGameRef(route.params.id))
const { isLoading: playersLoading, error: playersError, data: players } = useFirestoreList<Player>(getGamePlayersQuery(route.params.id))
const player = computed(() => players.value?.find(p => p.id === getUser().uid))
provide('game', game)
provide('players', players)
provide('player', player)
</script>

<template>
  <main>
    <span class="loader" v-if="isLoading || playersLoading"></span>
    <AlertMessage type="error" v-else-if="error || playersError" :message="error?.message || playersError!.message" />
    <template v-else>
      <CreateUser v-if="!player" />
      <template v-else>
        <LobbyPlayers v-if="game!.state === 'notstarted'">
          <h1>Waiting for the host to start the Kuizzi</h1>
        </LobbyPlayers>
        <div v-else-if="game!.state === 'question' && player[game!.question]" class="mid">
          <p>Was that correct?</p>
          <FunnyGif type="waiting" />
        </div>
        <PlayQuestion v-else-if="game!.state === 'question'" />
        <QuestionReveal v-else-if="game!.state === 'reveal'" />
        <ScoreBoard v-else-if="game!.state === 'score'">
          <PlaySummary />
        </ScoreBoard>
        <PlayEnd v-else />
      </template>
    </template>
  </main>
</template>

<style scoped>
.mid {
  display: grid;
  place-items: center;
}
</style>
