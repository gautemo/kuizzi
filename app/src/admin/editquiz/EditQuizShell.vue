<script setup lang="ts">
import EditQuiz from './EditQuiz.vue'
import AdminView from '../AdminView.vue'
import SuspenseLoader from '../../shared/SuspenseLoader.vue'
</script>

<template>
  <AdminView>
    <SuspenseLoader>
      <EditQuiz />
    </SuspenseLoader>
  </AdminView>
</template>
