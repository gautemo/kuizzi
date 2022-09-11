<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'done'): void
}>()

const props = defineProps<{
  from: number,
  delayMilliseconds?: number
}>()

console.log(props)

const count = ref(props.from)

let interval: number | undefined = undefined

setTimeout(() => {
  interval = window.setInterval(() => {
    count.value--
    if(count.value === 0){
      emit('done')
    }
  }, 1000)
}, props.delayMilliseconds)


onUnmounted(() => clearInterval(interval))
</script>

<template>
{{count}}
</template>

<style scoped>

</style>