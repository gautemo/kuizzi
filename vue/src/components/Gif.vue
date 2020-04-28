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
    'https://media.giphy.com/media/xeHH9NdRhAx5S/giphy.gif',
    'https://media.giphy.com/media/ZcKASxMYMKA9SQnhIl/giphy.gif',
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
    'https://media.giphy.com/media/JnAydKs2GZRqTb4C8v/giphy.gif',
    'https://media.giphy.com/media/12rTjvF0ANQJsk/giphy.gif'
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
  won: [
    'https://media.giphy.com/media/xT0GqssRweIhlz209i/giphy.gif',
    'https://media.giphy.com/media/3ohryhNgUwwZyxgktq/giphy.gif',
    'https://media.giphy.com/media/dUYddwtCVUOIpgXijq/giphy.gif',
    'https://media.giphy.com/media/3kD720zFVu22rfIA0s/giphy.gif',
    'https://media.giphy.com/media/gd0Dqg6rYhttBVCZqd/giphy.gif',
    'https://media.giphy.com/media/9wcu6Tr1ecmxa/giphy.gif',
    'https://media.giphy.com/media/amrNGnZUeWhZC/giphy.gif',
    'https://media.giphy.com/media/5fQyd7jM58m5y/giphy.gif',
  ],
  close: [
    'https://media.giphy.com/media/3PAGCj08nkQvsooWUB/giphy.gif',
    'https://media.giphy.com/media/Qaxd5XpgDWMso/giphy.gif',
    'https://media.giphy.com/media/dEPGknRiEniec/giphy.gif',
    'https://media.giphy.com/media/qLWdMYX1NYF2g/giphy.gif',
    'https://media.giphy.com/media/Jq824R93JsLwZCaiSL/giphy.gif',
    'https://media.giphy.com/media/suCJQGchI6oBW/giphy.gif',
    'https://media.giphy.com/media/oOX5qIDkzDjeo/giphy.gif'
  ],
  lost: [
    'https://media.giphy.com/media/a4pvOry0Nd4dy/giphy.gif',
    'https://media.giphy.com/media/rKj0oXtnMQNwY/giphy.gif',
    'https://media.giphy.com/media/H7kDjHfuqukEZoWhut/giphy.gif',
    'https://media.giphy.com/media/1jARfPtdz7eE0/giphy.gif',
    'https://media.giphy.com/media/suCJQGchI6oBW/giphy.gif',
    'https://media.giphy.com/media/fw8XWwT5YuSJGBwddf/giphy.gif',
    'https://media.giphy.com/media/10tIjpzIu8fe0/giphy.gif',
    'https://media.giphy.com/media/O3JyUHiKqsviE/giphy.gif',
    'https://media.giphy.com/media/12rTjvF0ANQJsk/giphy.gif',
    'https://media.giphy.com/media/7VHV66bRjGRSo/giphy.gif',
    'https://media.giphy.com/media/zFa3vjySsETPa/giphy.gif'
  ]
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