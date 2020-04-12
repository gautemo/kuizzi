<template>
  <img :src="img" alt="funny gif img">
</template>

<script>
const imgs = {
  correct: [
    'https://media.giphy.com/media/3o7abGQa0aRJUurpII/giphy.gif',
    'https://media.giphy.com/media/14bDMRUYVrzOIo/giphy.gif',
    'https://media.giphy.com/media/Rfk8xX6DGGZ2w/giphy.gif',
    'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
    'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
    'https://media.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy.gif',
    'https://media.giphy.com/media/cBQl0NCv0eZdS/giphy.gif',
    'https://media.giphy.com/media/xeHH9NdRhAx5S/giphy.gif'
  ],
  wrong: [
    'https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif',
    'https://media.giphy.com/media/YLgIOmtIMUACY/giphy.gif',
    'https://media.giphy.com/media/pU7375O9lECLm/giphy.gif',
    'https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif',
    'https://media.giphy.com/media/TU76e2JHkPchG/giphy.gif',
    'https://media.giphy.com/media/y1WDIwAZRSmru/giphy.gif',
    'https://media.giphy.com/media/3o7btNRTJ700Vzmn5e/giphy.gif',
    'https://media.giphy.com/media/10UHehEC098kAE/giphy.gif',
    'https://media.giphy.com/media/l4pLY0zySvluEvr0c/giphy.gif',
    'https://media.giphy.com/media/JnAydKs2GZRqTb4C8v/giphy.gif'
  ],
  waiting: [
    'https://media.giphy.com/media/W3a0zO282fuBpsqqyD/giphy.gif',
    'https://media.giphy.com/media/VEsfbW0pBu145PPhOi/giphy.gif',
    'https://media.giphy.com/media/W3VMLWRjkOCsg/giphy.gif',
    'https://media.giphy.com/media/ZXKZWB13D6gFO/giphy.gif',
    'https://media.giphy.com/media/hCiQVo1dzVwPu/giphy.gif',
    'https://media.giphy.com/media/oT7ATDykMidsk/giphy.gif',
    'https://media.giphy.com/media/l3V0BVDTyuMzwpS1i/giphy.gif',
    'https://media.giphy.com/media/BMtGb8JSk2Ln1cnPMA/giphy.gif',
    'https://media.giphy.com/media/ZFhhpKngh5QfcmhIDF/giphy.gif'
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
  max-width: 90vw;
  height: 230px;
  border-radius: 5px;
}
</style>