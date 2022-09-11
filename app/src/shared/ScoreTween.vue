<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  score: number
  addScore: number
}>()

const tweened = reactive({
  number: props.score - props.addScore,
})

onMounted(() => {
  gsap.to(tweened, { duration: 1.5, number: props.score })
})
</script>

<template>
  <span>{{ tweened.number.toFixed(0) }}</span>
</template>
