<template>
  <div v-if="img" :style="{padding: `${pad}px`}">
    <img :src="img" alt="image alternative">
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/db'
import { ref } from 'vue'

export default {
  props: ['alternative', 'pad'],
  setup({alternative}){
    const img = ref('')

    if(alternative.startsWith('[image]')){
      const path = alternative.replace('[image]','');
      getImgUrl(path).then(url => img.value = url);
    }
  
    return { img }
  }
}
</script>

<style scoped>
div{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

img{
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: contain;
}
</style>