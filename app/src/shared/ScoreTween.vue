<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  score: number
  addScore: number
  startTween: boolean
}>()

const tweened = reactive({
  number: props.score - props.addScore,
})

watchEffect(() => {
  if (props.startTween) {
    gsap.to(tweened, { duration: 3, number: props.score })
  }
})
</script>

<template>
  <span>{{ tweened.number.toFixed(0) }}</span>
</template>
