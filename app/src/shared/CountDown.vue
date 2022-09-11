<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'done'): void
}>()

const props = defineProps<{
  from: number
}>()

const count = ref(props.from)

const interval = setInterval(() => {
  count.value--
  if(count.value === 0){
    emit('done')
  }
}, 1000)

onUnmounted(() => clearInterval(interval))
</script>

<template>
{{count}}
</template>

<style scoped>

</style>