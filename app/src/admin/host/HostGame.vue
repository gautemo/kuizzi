<script setup lang="ts">
import { useRoute } from 'vue-router';
import { provide } from 'vue';
import HostLobby from './HostLobby.vue';
import { Game, Player } from '../../shared/types';
import { useFirestore, useFirestoreList } from '../../shared/useFirebase'
import AlertMessage from '../../shared/AlertMessage.vue';
import { getGamePlayersQuery, getGameRef } from '../../firebase';

const route = useRoute()
if (typeof route.params.id !== 'string') throw new Error('unknown id')
const { isLoading, error, data: game } = useFirestore<Game>(getGameRef(route.params.id))
const { isLoading: playersLoading, error: playersError, data: players } = useFirestoreList<Player>(getGamePlayersQuery(route.params.id))
provide('game', game)
provide('players', players)
</script>

<template>
  <main>
    <span class="loader" v-if="isLoading || playersLoading"></span>
    <AlertMessage type="error" v-else-if="error || playersError" :message="error?.message || playersError!.message"/>
    <template v-else>
      <HostLobby>
        <h1>{{game!.quiz.name}}</h1>
        <h2>Go to kuizzi.app to join!</h2>
        <h3>Game PIN: <span>{{route.params.id}}</span></h3>
      </HostLobby>
    </template>
  </main>
</template>

<style scoped>

</style>