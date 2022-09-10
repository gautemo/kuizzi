<script setup lang="ts">
import AdminView from '../AdminView.vue'
import SuspenseLoader from '../../shared/SuspenseLoader.vue'
import QuizList from './QuizList.vue'
</script>

<template>
  <AdminView>
    <SuspenseLoader>
      <QuizList />
    </SuspenseLoader>
  </AdminView>
</template>
