<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{
  type: 'error' | 'warning' | 'success',
  message: string,
  autofocus?: boolean
}>(), { autofocus: false })

const element = ref<Element>()
onMounted(() => {
  if(props.autofocus){
    element.value?.scrollIntoView({behavior: 'smooth'})
  }
})
</script>

<template>
  <p :class="props.type" ref="element" tabindex="0">
    <span v-if="props.type === 'success'" class="i-ic-baseline-check-circle" />
    <span v-else-if="props.type === 'warning'" class="i-ic-baseline-warning" />
    <span v-else class="i-ic-baseline-error" />
    {{ props.message }}
  </p>
</template>

<style scoped>
p {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
}

.error {
  background-color: var(--danger);
}

.success {
  background-color: var(--success);
}

.warning {
  background-color: var(--warning);
}
</style>