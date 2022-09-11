<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    color: string
    size?: number
  }>(),
  { size: 80 }
)
</script>

<template>
  <span :style="{ height: `${size}px`, width: `${size}px`, 'font-size': `${size * 0.5}px` }">{{ icon }}</span>
</template>

<style scoped>
span {
  border-radius: 50%;
  display: grid;
  place-items: center;
  background-color: v-bind(color);
}
</style>
