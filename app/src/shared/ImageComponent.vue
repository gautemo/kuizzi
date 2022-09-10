<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { getImageUrl } from '../firebase';
import { ImageUtil } from './imageUtil';

const props = defineProps<{
  value: string,
  alt: string
}>()

const src = ref<string>()

watchEffect(async () => {
  if(ImageUtil.isAddImage(props.value)){
    const image = ImageUtil.valueToAddImage(props.value)
    src.value = image.srcUrl
  } else {
    src.value = await getImageUrl(ImageUtil.filterImagePrefix(props.value))
  }
})

</script>

<template>
  <img :src="src" :alt="props.alt" v-if="src">
  <span v-else class="loader"></span>
</template>

<style scoped>

</style>