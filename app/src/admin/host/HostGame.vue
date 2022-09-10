<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getGameRef } from '../firebaseGames';
import { provide } from 'vue';
import HostLobby from './HostLobby.vue';
import { Game } from '../types';
import { useFirestore } from '../../shared/useFirebase'
import AlertMessage from '../../shared/AlertMessage.vue';

const route = useRoute()
if (typeof route.params.id !== 'string') throw new Error('unknown id')
const { isLoading, error, data: game } = await useFirestore<Game>(getGameRef(route.params.id))
provide('game', game)
</script>

<template>
  <main>
    <span class="loader" v-if="isLoading"></span>
    <AlertMessage type="error" v-else-if="error" :message="error.message"/>
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