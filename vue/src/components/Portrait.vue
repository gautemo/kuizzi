<template>
  <span :style="{background: color, height: `${size}px`, width: `${size}px`, 'font-size': `${size*0.5}px`}">{{icon}}</span>
</template>

<script>
export default {
  props: ['icon', 'color', 'size']
}
</script>

<style scoped>
span{
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>