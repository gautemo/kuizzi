<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, provide } from 'vue'
import { Game, Player } from '../../shared/types'
import { useFirestore, useFirestoreList } from '../../shared/useFirebase'
import AlertMessage from '../../shared/AlertMessage.vue'
import { getGamePlayersQuery, getGameRef } from '../../firebase'
import { updateGameState } from '../firebaseGames'
import HostQuestion from './HostQuestion.vue'
import HostVoteView from './HostVoteView.vue'
import HostEnd from './HostEnd.vue'
import LobbyPlayers from '../../shared/LobbyPlayers.vue'
import ScoreBoard from '../../shared/ScoreBoard.vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const route = useRoute()
if (typeof route.params.id !== 'string') throw new Error('unknown id')
const { isLoading, error, data: game } = useFirestore<Game>(getGameRef(route.params.id))
const { isLoading: playersLoading, error: playersError, data: players } = useFirestoreList<Player>(getGamePlayersQuery(route.params.id))
provide('game', game)
provide('players', players)

function next() {
  switch (game.value?.state) {
    case 'notstarted':
      updateGameState(game.value.id, 'question', 1)
      break
    case 'question':
      updateGameState(game.value.id, 'reveal')
      break
    case 'reveal':
      if (game.value.question === game.value.quiz.questions.length) {
        updateGameState(game.value.id, 'ended')
      } else {
        updateGameState(game.value.id, 'score')
      }
      break
    case 'score':
      updateGameState(game.value.id, 'question', game.value.question + 1)
      break
  }
}

const url = computed(() => `https://kuizzi.app/${game.value?.id}`)
const qrcode = useQRCode(url)
</script>

<template>
  <Teleport to="#topright" v-if="game">
    <p v-if="game.state === 'score' || game.state === 'reveal'">{{ game.question }} of {{ game.quiz.questions.length }}</p>
    <button v-if="game.state !== 'ended' && game.state !== 'question'" @click="next">Next</button>
  </Teleport>
  <main>
    <span class="loader" v-if="isLoading || playersLoading"></span>
    <AlertMessage type="error" v-else-if="error || playersError" :message="error?.message || playersError!.message" />
    <template v-else>
      <LobbyPlayers v-if="game!.state === 'notstarted'">
        <div class="columns">
          <h1>{{ game!.quiz.name }}</h1>
          <div>
            <h2>Go to kuizzi.app or use QR code to join!</h2>
            <h3>
              Game PIN: <span>{{ route.params.id }}</span>
            </h3>
            <img :src="qrcode" alt="QR code to join" />
          </div>
        </div>
      </LobbyPlayers>
      <HostQuestion v-else-if="game!.state === 'question'" @next="next" />
      <HostVoteView v-else-if="game!.state === 'reveal'" />
      <ScoreBoard v-else-if="game!.state === 'score'" />
      <HostEnd v-else />
    </template>
  </main>
</template>

<style scoped>
.columns {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

h1 {
  font-size: 2rem;
}

h1,
h2,
h3 {
  margin: 0.5rem 0;
}
</style>
