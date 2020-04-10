<template>
  <img :src="img" alt="funny gif img">
</template>

<script>
const imgs = {
  correct: [
    'https://media.giphy.com/media/3o7abGQa0aRJUurpII/giphy.gif'
  ],
  wrong: [
    'https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif',
    'https://media.giphy.com/media/YLgIOmtIMUACY/giphy.gif',
  ],
  waiting: [
    'https://media.giphy.com/media/W3a0zO282fuBpsqqyD/giphy.gif',
    'https://media.giphy.com/media/VEsfbW0pBu145PPhOi/giphy.gif',
    'https://media.giphy.com/media/W3VMLWRjkOCsg/giphy.gif',
  ],
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default {
  props: {
    type: String,
  },
  setup({type}){
    const useArray = imgs[type];
    const img = useArray[getRandomInt(useArray.length)];
    return { img }
  }
}
</script>

<style scoped>
img{
  max-width: 70vw;
  max-height: 150px;
  border-radius: 5px;
}
</style>